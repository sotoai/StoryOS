from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class SlideTags(BaseModel):
    product: Optional[str] = None
    initiative: Optional[str] = None
    vertical: Optional[str] = None
    type: Optional[str] = None


class SlideResponse(BaseModel):
    id: str
    deck_id: str
    slide_index: int
    title: Optional[str] = None
    thumbnail_url: str
    width_px: int
    height_px: int
    tags: SlideTags

    model_config = {"from_attributes": True}


class SlideTagsUpdate(BaseModel):
    product: Optional[str] = None
    initiative: Optional[str] = None
    vertical: Optional[str] = None
    type: Optional[str] = None


class DeckResponse(BaseModel):
    id: str
    filename: str
    slide_count: int
    uploaded_at: datetime
    slides: list[SlideResponse]


class DeckListItem(BaseModel):
    id: str
    filename: str
    slide_count: int
    uploaded_at: datetime

    model_config = {"from_attributes": True}


class AssembleDeckRequest(BaseModel):
    slide_ids: list[str]
    filename: str = "StoryOS-Deck.pptx"


def slide_to_response(slide) -> SlideResponse:
    """Convert a Slide ORM model to a SlideResponse schema."""
    return SlideResponse(
        id=slide.id,
        deck_id=slide.deck_id,
        slide_index=slide.slide_index,
        title=slide.title,
        thumbnail_url=f"/static/storage/{slide.thumbnail_path}",
        width_px=slide.width_px,
        height_px=slide.height_px,
        tags=SlideTags(
            product=slide.tags_product,
            initiative=slide.tags_initiative,
            vertical=slide.tags_vertical,
            type=slide.tags_type,
        ),
    )
