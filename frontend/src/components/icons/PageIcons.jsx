import { C } from "../../theme";

// Messaging page icons
export function IconCompany({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2C6.5 2 2 6.5 2 12" strokeDasharray="2 3" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="2" y1="12" x2="8" y2="12" />
      <line x1="16" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export function IconSolution({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <line x1="10" y1="6.5" x2="14" y2="6.5" strokeDasharray="1.5 1.5" />
      <line x1="10" y1="17.5" x2="14" y2="17.5" strokeDasharray="1.5 1.5" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" strokeDasharray="1.5 1.5" />
      <line x1="17.5" y1="10" x2="17.5" y2="14" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

export function IconNetworking({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4" />
      <path d="M12 11L5 17" />
      <path d="M12 11l7 6" />
      <path d="M8 12a8 8 0 0 1 8 0" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconSecurity({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconCollaboration({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={C.text} xmlns="http://www.w3.org/2000/svg">
      <path d="M21.78 7.376c0.512 1.181 0.032 2.644 -1.11 3.106 -2.157 0.888 -3 -1.295 -3 -1.295 -0.236 -0.55 -0.727 -1.496 -1.335 -1.496 -0.204 0 -0.503 0 -0.94 0.844 -0.229 0.443 -0.434 1.185 -0.616 1.84l-0.09 0.32c-0.373 -1.587 -0.821 -3.454 -1.536 -4.816 -0.195 -0.38 -0.42 -0.74 -0.673 -1.08a5.135 5.135 0 0 1 1.743 -1.337 4.891 4.891 0 0 1 2.112 -0.463c1.045 0 2.765 0.338 4.227 2.227 0.167 0.206 0.317 0.424 0.448 0.654 0.278 0.441 0.52 0.904 0.726 1.383l0.043 0.113zM0.02 8.4C-0.15 7.105 0.8 5.845 1.953 5.755c1.794 -0.157 2.36 1.385 2.455 1.89l0.022 0.137c0.07 0.44 0.29 1.838 0.48 2.744 0.078 0.4 0.244 1.013 0.353 1.416l0.006 0.022 0.026 0.092c0.11 0.4 0.232 0.799 0.362 1.193 0.185 0.548 0.399 1.085 0.641 1.61 0.47 0.955 0.93 1.45 1.367 1.45 0.203 0 0.512 0 0.96 -0.878 0.283 -0.59 0.512 -1.208 0.684 -1.845 0.373 1.598 0.811 3.128 1.495 4.456 0.205 0.406 0.444 0.794 0.715 1.16a5.124 5.124 0 0 1 -1.742 1.338 4.88 4.88 0 0 1 -2.112 0.461c-1.548 0 -3.727 -0.698 -5.339 -4.005a22.407 22.407 0 0 1 -1.078 -2.824 26.848 26.848 0 0 1 -0.693 -2.656 48.56 48.56 0 0 1 -0.215 -1.114C0.191 9.603 0.074 8.872 0.02 8.4zm22.047 -2.645 -0.202 -0.022h-0.052c0.222 0.392 0.421 0.797 0.597 1.215l0.053 0.113c0.322 0.76 0.346 1.614 0.068 2.391a3.079 3.079 0 0 1 -1.552 1.749 2.93 2.93 0 0 1 -1.228 0.28 3.115 3.115 0 0 1 -0.854 -0.135c-0.299 1.182 -0.768 2.634 -1.195 3.511 -0.427 0.877 -0.93 1.451 -1.378 1.451 -0.192 0 -0.501 0 -0.95 -0.877a10.746 10.746 0 0 1 -0.683 -1.845 38.722 38.722 0 0 1 -0.396 -1.575 12.67 12.67 0 0 1 -0.136 -0.598l-0.002 -0.01c-0.406 -1.778 -0.865 -3.645 -1.655 -5.142A8.263 8.263 0 0 0 11.52 4.8a5.136 5.136 0 0 0 -1.748 -1.34A4.892 4.892 0 0 0 7.654 3C6.618 3 4.9 3.338 3.437 5.228c0.466 0.223 0.867 0.562 1.164 0.984 0.305 0.433 0.499 0.933 0.565 1.458 0.076 0.563 0.256 1.654 0.47 2.688l0.001 0.007c0.021 0.11 0.042 0.221 0.073 0.342 0.126 -0.34 0.25 -0.642 0.38 -0.955l0.112 -0.271 0.128 -0.293c0.235 -0.55 0.726 -1.496 1.324 -1.496 0.213 0 0.513 0 0.95 0.844 0.296 0.606 0.532 1.239 0.706 1.89 0.138 0.507 0.276 1.047 0.394 1.587 0.04 0.148 0.07 0.296 0.101 0.444l0.006 0.028c0.427 1.879 0.875 3.69 1.644 5.187 0.159 0.317 0.34 0.622 0.545 0.911 0.15 0.215 0.31 0.422 0.48 0.62 1.27 1.45 2.733 1.8 3.843 1.8 1.548 0 3.738 -0.698 5.35 -4.006 0.822 -1.7 1.515 -4.208 1.772 -5.48 0.256 -1.27 0.449 -2.419 0.534 -3.115 0.04 -0.307 0.023 -0.618 -0.051 -0.918 -0.075 -0.299 -0.205 -0.579 -0.382 -0.825a2.247 2.247 0 0 0 -0.653 -0.607 2.143 2.143 0 0 0 -0.826 -0.296z" />
    </svg>
  );
}

export function IconInitiative({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function IconUseCase({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

// Pillar icons — three pillars of Futureproof Workplace
export function IconAgenticOps({ size = 14, color }) {
  const c = color || C.textTertiary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M12 11v4" />
      <path d="M8 21a4 4 0 0 1 8 0" />
      <path d="M17 6l2-2" />
      <path d="M19 8h2" />
      <path d="M5 6L3 4" />
      <path d="M3 8H1" />
      <circle cx="12" cy="8" r="1" fill={c} stroke="none" />
    </svg>
  );
}

export function IconSecurityFused({ size = 14, color }) {
  const c = color || C.textTertiary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

export function IconAIDevices({ size = 14, color }) {
  const c = color || C.textTertiary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="12" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 15v6" />
      <circle cx="9" cy="9" r="1.5" fill={c} stroke="none" />
      <circle cx="15" cy="9" r="1.5" fill={c} stroke="none" />
      <path d="M9 12h6" strokeWidth="1" />
    </svg>
  );
}

export const pillarIcons = {
  "AgenticOps for Operational Simplicity": IconAgenticOps,
  "Security Fused into the Network": IconSecurityFused,
  "AI-Ready Devices": IconAIDevices,
};

export const productIcons = {
  networking: IconNetworking,
  collaboration: IconCollaboration,
};
