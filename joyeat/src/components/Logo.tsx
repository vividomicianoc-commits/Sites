// Logo SVG component — approximates the JoYeat brandbook logotype
// Jo = orange bold rounded | Y = custom smile glyph | eat = green lighter
// Note: brandbook uses Clab typeface (unavailable as web font); Nunito 900 is the closest substitute

export default function Logo({ size = 32, dark = false }: { size?: number; dark?: boolean }) {
  const ratio = size / 32;
  const w = 176 * ratio;
  const h = 42 * ratio;
  const orange = dark ? '#fff' : '#fd6900';
  const green = dark ? 'rgba(255,255,255,0.85)' : '#6ab802';
  const cutout = dark ? '#fd6900' : '#faf8f3';

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 176 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Joyeat"
    >
      {/* ── Jo ── bold orange */}
      <text
        x="0" y="34"
        fontFamily="'Nunito', 'Rounded Mplus 1c', sans-serif"
        fontWeight="900"
        fontSize="38"
        fill={orange}
        letterSpacing="-1"
      >Jo</text>

      {/* ── Y custom glyph ── arms + smile stem */}
      {/* Left arm */}
      <path d="M59 3 L70 20" stroke={orange} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right arm */}
      <path d="M81 3 L70 20" stroke={orange} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      {/* Smile U — outer filled */}
      <path
        d="M70 20 C70 20 63 27 63 34 C63 39.5 66.5 42 70.5 42 C74.5 42 78 39.5 78 34 C78 27 70 20 70 20 Z"
        fill={orange}
      />
      {/* Smile U — inner cutout to create hollow */}
      <path
        d="M70 24.5 C70 24.5 66.5 30 66.5 34 C66.5 38 68.5 39.5 70.5 39.5 C72.5 39.5 74.5 38 74.5 34 C74.5 30 70 24.5 70 24.5 Z"
        fill={cutout}
      />

      {/* ── eat ── lighter green */}
      <text
        x="83" y="34"
        fontFamily="'Nunito', 'Rounded Mplus 1c', sans-serif"
        fontWeight="400"
        fontSize="38"
        fill={green}
        letterSpacing="-0.5"
      >eat</text>
    </svg>
  );
}

// Vertical: Joy stacked on eat
export function LogoVertical({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 104" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="42" fontFamily="'Nunito', sans-serif" fontWeight="900" fontSize="40" fill="#fd6900" letterSpacing="-1">Joy</text>
      <text x="4" y="90" fontFamily="'Nunito', sans-serif" fontWeight="400" fontSize="40" fill="#6ab802" letterSpacing="-0.5">eat</text>
    </svg>
  );
}

// Symbol only — for favicon / app icon
export function LogoSymbol({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#fd6900" />
      {/* Y arms */}
      <path d="M15 10 L24 23" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M33 10 L24 23" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
      {/* Smile U stem */}
      <path d="M24 23 C24 23 18 30 18 36 C18 40 20.5 42 24 42 C27.5 42 30 40 30 36 C30 30 24 23 24 23 Z" fill="#fff" />
      <path d="M24 27 C24 27 21 32 21 36 C21 39 22.5 40 24 40 C25.5 40 27 39 27 36 C27 32 24 27 24 27 Z" fill="#fd6900" />
      {/* Smile arc */}
      <path d="M17 44 Q24 49 31 44" stroke="#88dd03" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
