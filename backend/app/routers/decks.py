import shutil
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from ..config import UPLOAD_DIR, THUMBNAIL_DIR, STORAGE_DIR
from ..database import get_db
from ..models import Deck, Slide
from ..schemas import AssembleDeckRequest, DeckListItem, DeckResponse, slide_to_response
from ..services.extractor import extract_deck
from ..services.thumbnails import generate_thumbnails

router = APIRouter()

MAX_UPLOAD_SIZE = 100 * 1024 * 1024  # 100 MB


@router.post("/upload", response_model=DeckResponse, status_code=status.HTTP_201_CREATED)
async def upload_deck(file: UploadFile, db: Session = Depends(get_db)):
    if not file.filename or not file.filename.lower().endswith(".pptx"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only .pptx files are accepted.",
        )

    contents = await file.read()
    if len(contents) > MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File exceeds 100 MB limit.",
        )

    deck_id = str(uuid.uuid4())
    save_path = UPLOAD_DIR / f"{deck_id}.pptx"
    save_path.write_bytes(contents)

    # Extract slide metadata
    slides_info = extract_deck(save_path, deck_id)
    slide_count = len(slides_info)

    # Generate thumbnails
    thumbnail_paths = generate_thumbnails(save_path, deck_id, slide_count)

    # Relative upload path for DB storage
    upload_rel = str(save_path.relative_to(STORAGE_DIR))

    deck = Deck(
        id=deck_id,
        filename=file.filename,
        upload_path=upload_rel,
        slide_count=slide_count,
    )
    db.add(deck)

    slide_models = []
    for info, thumb_path in zip(slides_info, thumbnail_paths):
        slide_model = Slide(
            id=str(uuid.uuid4()),
            deck_id=deck_id,
            slide_index=info["slide_index"],
            title=info["title"],
            thumbnail_path=thumb_path,
            slide_data_path=upload_rel,
            width_px=info["width_px"],
            height_px=info["height_px"],
        )
        db.add(slide_model)
        slide_models.append(slide_model)

    db.commit()
    db.refresh(deck)

    return DeckResponse(
        id=deck.id,
        filename=deck.filename,
        slide_count=deck.slide_count,
        uploaded_at=deck.uploaded_at,
        slides=[slide_to_response(s) for s in slide_models],
    )


@router.get("/", response_model=list[DeckListItem])
def list_decks(db: Session = Depends(get_db)):
    decks = db.query(Deck).order_by(Deck.uploaded_at.desc()).all()
    return decks


@router.get("/{deck_id}", response_model=DeckResponse)
def get_deck(deck_id: str, db: Session = Depends(get_db)):
    deck = db.query(Deck).filter(Deck.id == deck_id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")

    return DeckResponse(
        id=deck.id,
        filename=deck.filename,
        slide_count=deck.slide_count,
        uploaded_at=deck.uploaded_at,
        slides=[slide_to_response(s) for s in deck.slides],
    )


@router.delete("/{deck_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deck(deck_id: str, db: Session = Depends(get_db)):
    deck = db.query(Deck).filter(Deck.id == deck_id).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")

    # Delete files
    upload_file = STORAGE_DIR / deck.upload_path
    if upload_file.exists():
        upload_file.unlink()

    thumb_dir = THUMBNAIL_DIR / deck_id
    if thumb_dir.exists():
        shutil.rmtree(thumb_dir)

    # Delete from DB (cascade deletes slides)
    db.delete(deck)
    db.commit()


@router.post("/assemble")
def assemble_deck(body: AssembleDeckRequest, db: Session = Depends(get_db)):
    """
    Assemble a .pptx from selected slide IDs.
    Returns: .pptx file download
    """
    slide_ids = body.slide_ids
    filename = body.filename

    if not slide_ids:
        raise HTTPException(status_code=400, detail="No slide IDs provided")

    # Look up slides in order
    slides = []
    for sid in slide_ids:
        slide = db.query(Slide).filter(Slide.id == sid).first()
        if slide:
            slides.append(slide)

    if not slides:
        raise HTTPException(status_code=404, detail="No valid slides found")

    # Verify source files exist
    for slide in slides:
        source_path = STORAGE_DIR / slide.slide_data_path
        if not source_path.exists():
            raise HTTPException(
                status_code=500,
                detail=f"Source deck file missing for slide {slide.id}"
            )

    try:
        from ..services.assembler import assemble_deck_from_slides
        output_path = assemble_deck_from_slides(slides, STORAGE_DIR)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Assembly failed: {str(e)}")

    # Sanitize filename
    if not filename.endswith(".pptx"):
        filename += ".pptx"
    safe_filename = "".join(c for c in filename if c.isalnum() or c in " .-_").strip()
    if not safe_filename:
        safe_filename = "StoryOS-Deck.pptx"

    return FileResponse(
        path=str(output_path),
        filename=safe_filename,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
    )
