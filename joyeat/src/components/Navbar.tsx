'use client';
import { useState, useEffect } from 'react';

const links = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Conceito', href: '#joyeat' },
  { label: 'Transparência', href: '#transparencia' },
  { label: 'Quem somos', href: '#fundadoras' },
  { label: 'Construção', href: '#construcao' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '14px 48px' : '24px 48px',
        background: scrolled ? 'rgba(250,248,243,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(22,22,22,0.06)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900, letterSpacing: '-0.01em' }}>
            <span style={{ color: 'var(--joy-orange)' }}>Joy</span>
            <span style={{ color: 'var(--joy-grafite)' }}>Y</span>
            <span style={{ color: 'var(--joy-green-dk)' }}>eat</span>
          </span>
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hide-mobile">
          {links.map(l => (
            <button key={l.label} onClick={() => go(l.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 500,
                color: 'var(--joy-gray)', transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--joy-grafite)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--joy-gray)')}>
              {l.label}
            </button>
          ))}
          <button className="btn-orange" onClick={() => go('#comunidade')}
            style={{ fontSize: '12px', padding: '10px 22px' }}>
            Acompanhe
          </button>
        </div>

        {/* Hamburger */}
        <button className="show-mobile" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: 'var(--joy-grafite)', borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i===0 ? 'rotate(45deg) translate(4.5px,4.5px)'
                  : i===1 ? 'scaleX(0)' : 'rotate(-45deg) translate(4.5px,-4.5px)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'var(--joy-cream)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '36px',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
        opacity: menuOpen ? 1 : 0, visibility: menuOpen ? 'visible' : 'hidden',
      }}>
        {links.map((l, i) => (
          <button key={l.label} onClick={() => go(l.href)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800,
              color: 'var(--joy-grafite)',
              transition: `all 0.4s ease ${i * 0.05}s`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}>
            {l.label}
          </button>
        ))}
        <button className="btn-orange" onClick={() => go('#comunidade')} style={{ marginTop: '12px' }}>
          Acompanhe a construção
        </button>
      </div>

      <style>{`@media(max-width:768px){nav{padding:16px 24px!important}}`}</style>
    </>
  );
}
