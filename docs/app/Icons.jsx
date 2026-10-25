// Ícones SVG inline da docs: um vocabulário só, herda cor via currentColor
// e escala pela font-size do elemento pai (width/height = 1em).

const Ic = (d) => (p = {}) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
    style={{ display: 'block', ...(p.style || {}) }}
  >
    {d}
  </svg>
);

export const person = Ic(
  <>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.5 19.5c1.3-3.2 3.6-4.8 6.5-4.8s5.2 1.6 6.5 4.8" />
  </>
);

export const internet = Ic(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5S14.6 18.1 12 20.5c-2.6-2.4-3.9-5.2-3.9-8.5S9.4 5.9 12 3.5Z" />
  </>
);

export const location = Ic(
  <>
    <path d="M12 21c3.5-4 7-7.6 7-11.2A7 7 0 0 0 5 9.8C5 13.4 8.5 17 12 21Z" />
    <circle cx="12" cy="9.8" r="2.4" />
  </>
);

export const phone = Ic(
  <path d="M7.5 3.5h9a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Zm3.2 13.6h2.6" />
);

export const date = Ic(
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.8h17M8 2.8v4M16 2.8v4" />
  </>
);

export const number = Ic(
  <path d="M8.5 4 7 20M16.8 4l-1.6 16M4 8.8h16M3.6 15.2h16" />
);

export const string = Ic(
  <>
    <path d="M4.5 6.5V5h15v1.5" />
    <path d="M12 5v14M8.7 19h6.6" />
  </>
);

export const lorem = Ic(
  <path d="M4 6h16M4 10.5h12M4 15h16M4 19.5h9" />
);

export const br = Ic(
  <>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <rect x="6.3" y="9" width="4.4" height="4" rx="0.9" />
    <path d="M6.3 15.6h4.4M14 9.5h4M14 12.5h4M14 15.5h2" />
  </>
);

export const commerce = Ic(
  <>
    <path d="M3.5 4h2.2l2.1 11.3a1.6 1.6 0 0 0 1.6 1.3h7.8a1.6 1.6 0 0 0 1.6-1.3L20 7.5H6.4" />
    <circle cx="9.7" cy="20" r="1.2" />
    <circle cx="16.6" cy="20" r="1.2" />
  </>
);

export const finance = Ic(
  <>
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="2.5" />
    <path d="M2.8 10h18.4M6.3 15h4" />
  </>
);

export const color = Ic(
  <>
    <path d="M12 20.5a8.5 8.5 0 1 1 8.5-8.5c0 2.2-1.6 3.4-3.4 3.4h-1.7a2 2 0 0 0-1.5 3.3c.5.7.2 1.8-.1 1.8Z" />
    <circle cx="8" cy="9.4" r="0.4" fill="currentColor" />
    <circle cx="12" cy="7.6" r="0.4" fill="currentColor" />
    <circle cx="15.9" cy="9.6" r="0.4" fill="currentColor" />
    <circle cx="7.9" cy="14" r="0.4" fill="currentColor" />
  </>
);

export const image = Ic(
  <>
    <rect x="3.2" y="4.5" width="17.6" height="15" rx="2.5" />
    <circle cx="9" cy="10" r="1.7" />
    <path d="M4.2 17.6l4.6-4.2a1.8 1.8 0 0 1 2.5 0l1.6 1.5 2.6-2.3a1.8 1.8 0 0 1 2.5 0l2.1 1.9" />
  </>
);

export const company = Ic(
  <>
    <path d="M5 21V5.8A1.8 1.8 0 0 1 6.8 4h7.4A1.8 1.8 0 0 1 16 5.8V21M16 10.5h2.6a1.4 1.4 0 0 1 1.4 1.4V21M3 21h18" />
    <path d="M8.2 8h1.6M11.6 8h1.6M8.2 11.5h1.6M11.6 11.5h1.6M8.2 15h1.6M11.6 15h1.6" />
  </>
);

export const system = Ic(
  <>
    <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
    <path d="m7 9.5 3 2.5-3 2.5M12.5 15h4.5" />
  </>
);

export const pkg = Ic(
  <>
    <path d="M12 3 20 7.3v9.4L12 21l-8-4.3V7.3L12 3Z" />
    <path d="M4 7.3 12 12l8-4.7M12 12v9" />
    <path d="M8 5.2l8 4.3" />
  </>
);

export const target = Ic(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.6" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </>
);

export const languages = Ic(
  <>
    <path d="M4 5.5h9M8.5 3.4v2.1M10.8 5.5c-.7 4.6-3.3 7-6.8 8.9M6 9.5c1.4 2.9 3.9 4.6 7 5.2" />
    <path d="m12.5 20.5 3.6-8.5 3.6 8.5M13.9 17.5h4.4" />
  </>
);

export const sun = Ic(
  <>
    <circle cx="12" cy="12" r="4.1" />
    <path d="M12 2.5v2M12 19.5v2M3.9 3.9l1.5 1.5M18.6 18.6l1.5 1.5M2.5 12h2M19.5 12h2M3.9 20.1l1.5-1.5M18.6 5.4l1.5-1.5" />
  </>
);

export const moon = Ic(
  <path d="M20.6 13.2A8.6 8.6 0 1 1 10.8 3.4 6.8 6.8 0 0 0 20.6 13.2Z" />
);

// Dado do logotipo (rosto com 5 marcas), usado grande no hero e na 404
export const dice = Ic(
  <>
    <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.4" />
    <circle cx="8.4" cy="8.4" r="1.15" fill="currentColor" stroke="none" />
    <circle cx="15.6" cy="8.4" r="1.15" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
    <circle cx="8.4" cy="15.6" r="1.15" fill="currentColor" stroke="none" />
    <circle cx="15.6" cy="15.6" r="1.15" fill="currentColor" stroke="none" />
  </>
);
