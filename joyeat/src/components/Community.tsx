'use client';
import { useState, useEffect, useRef } from 'react';

function useInView(t = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [t]);
  return { ref, inView };
}

export default function Community() {
  const { ref, inView } = useInView(0.1);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email) setSent(true); };

  const cards = [
    { icon:'💬', title:'WhatsApp VIP', desc:'Bastidores, novidades e ofertas exclusivas de lançamento.', cta:'Entrar no grupo', color:'var(--joy-green-dk)' },
    { icon:'📸', title:'Instagram', desc:'Acompanhe a construção da loja, receitas e o dia a dia das fundadoras.', cta:'@joyeat_gyn', color:'var(--joy-orange)' },
    { icon:'🎯', title:'Beta Testers', desc:'Seja um dos primeiros a provar o cardápio antes da inauguração.', cta:'Quero ser beta tester', color:'var(--joy-green-dk)' },
  ];

  return (
    <section id="comunidade" style={{ background:'var(--joy-orange)', padding:'140px 0', overflow:'hidden', position:'relative' }}>
      {/* Watermark */}
      <div style={{ position:'absolute', bottom:'-20px', left:'50%', transform:'translateX(-50%)', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(80px,14vw,220px)', color:'rgba(255,255,255,0.07)', whiteSpace:'nowrap', letterSpacing:'-0.04em', pointerEvents:'none', userSelect:'none', lineHeight:1 }}>JOYEAT</div>

      <div className="container-joy" ref={ref}>
        <div style={{ textAlign:'center', marginBottom:'72px', transition:'all 1.2s ease', opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(30px)' }}>
          <span className="tag" style={{ marginBottom:'28px', display:'inline-flex', border:'1.5px solid rgba(255,255,255,0.4)', color:'#fff' }}>Comunidade</span>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(36px,6vw,88px)', lineHeight:0.95, letterSpacing:'-0.025em', color:'#fff', marginBottom:'24px' }}>
            A Joyeat é feita<br />para você.
          </h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(15px,2vw,18px)', lineHeight:1.75, color:'rgba(255,255,255,0.75)', maxWidth:'520px', margin:'0 auto 48px' }}>
            Faça parte desde o começo. Antes da inauguração.
          </p>

          {!sent ? (
            <form onSubmit={submit} style={{ display:'flex', gap:'12px', maxWidth:'480px', margin:'0 auto', flexWrap:'wrap', justifyContent:'center' }}>
              <input type="email" required placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex:'1 1 220px', padding:'15px 24px', background:'rgba(255,255,255,0.15)', border:'1.5px solid rgba(255,255,255,0.3)', borderRadius:'100px', color:'#fff', fontFamily:'var(--font-body)', fontSize:'15px', outline:'none', backdropFilter:'blur(10px)' }}
                onFocus={e => (e.target.style.borderColor = '#fff')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.3)')} />
              <button type="submit" className="btn-outline-white">Quero acompanhar</button>
            </form>
          ) : (
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 28px', background:'rgba(255,255,255,0.15)', borderRadius:'100px', border:'1.5px solid rgba(255,255,255,0.4)' }}>
              <span style={{ color:'#fff', fontSize:'16px' }}>✓</span>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'#fff', fontSize:'14px' }}>Você está dentro! Avisaremos em breve.</span>
            </div>
          )}
        </div>

        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }} className="comm-grid">
          {cards.map((c, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.12)', borderRadius:'24px', padding:'36px 32px',
              border:'1.5px solid rgba(255,255,255,0.2)', backdropFilter:'blur(10px)',
              transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1+i*0.1}s, transform 0.3s ease`,
              opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(36px)',
              cursor:'pointer',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize:'28px', marginBottom:'18px' }}>{c.icon}</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'18px', color:'#fff', marginBottom:'10px' }}>{c.title}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.75, color:'rgba(255,255,255,0.7)', marginBottom:'22px' }}>{c.desc}</p>
              <button style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'12px', letterSpacing:'0.1em', textTransform:'uppercase', color:'#fff', padding:0, display:'flex', alignItems:'center', gap:'6px' }}>
                {c.cta} →
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.comm-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
