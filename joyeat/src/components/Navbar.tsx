'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'JOYEAT', href: '#joyeat' },
  { label: 'Ecossistema', href: '#ecossistema' },
  { label: 'Fundadoras', href: '#fundadoras' },
  { label: 'Construção', href: '#construcao' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '16px 40px' : '28px 40px',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: '#fafafa',
            textDecoration: 'none',
          }}
        >
          JOY<span style={{ color: 'var(--joy-orange)' }}>GROUP</span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(250,250,250,0.65)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fafafa')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.65)')}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#comunidade')}
            className="btn-primary"
            style={{ fontSize: '12px', padding: '10px 24px' }}
          >
            Acompanhe
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#fafafa',
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                    : i === 1 ? 'scaleX(0)'
                      : 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          transition: 'opacity 0.5s ease, visibility 0.5s ease',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
        }}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fafafa',
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: `all 0.4s ease ${i * 0.05}s`,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo('#comunidade')}
          className="btn-primary"
          style={{ marginTop: '20px' }}
        >
          Acompanhe a construção
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          nav { padding: 20px 24px !important; }
        }
      `}</style>
    </>
  );
}
