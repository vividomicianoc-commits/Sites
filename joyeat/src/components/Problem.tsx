'use client';
import { useEffect, useRef, useState } from 'react';

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

export default function Problem() {
  const { ref, inView } = useInView(0.1);

  return (
    <section style={{ background: 'var(--joy-grafite)', padding: '140px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative */}
      <div style={{ position:'absolute', top:'-80px', left:'-80px', width:'300px', height:'300px', borderRadius:'50%', background:'var(--joy-orange)', opacity:0.06, filter:'blur(60px)', pointerEvents:'none' }} />

      <div className="container-joy" ref={ref}>
        {/* Header */}
        <div style={{ marginBottom: '80px', transition:'all 1s ease', opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(30px)' }}>
          <span className="tag tag-white" style={{ marginBottom:'20px', display:'inline-flex' }}>O problema</span>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(32px,5vw,72px)', lineHeight:1.0, color:'#fff', maxWidth:'680px' }}>
            O problema nunca foi{' '}
            <span style={{ color:'var(--joy-orange)' }}>querer comer bem.</span>
          </h2>
        </div>

        {/* Split */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px', borderRadius:'24px', overflow:'hidden' }} className="split-grid">
          {/* Caos */}
          <div style={{ background:'rgba(255,255,255,0.03)', padding:'48px 40px' }}>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'36px' }}>
              Antes
            </p>
            {['Delivery confuso e demorado','Excesso de opções que cansam','Culpa o tempo todo','Saudável sem sabor','Sem transparência nos ingredientes','Difícil de manter constância','Caro para o que entrega'].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px',
                transition:`all 0.6s ease ${0.1+i*0.06}s`, opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(-20px)' }}>
                <span style={{ color:'rgba(255,80,80,0.5)', fontSize:'13px', flexShrink:0 }}>✕</span>
                <span style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'rgba(255,255,255,0.3)', textDecoration:'line-through' }}>{item}</span>
              </div>
            ))}
          </div>
          {/* Joyeat */}
          <div style={{ background:'rgba(253,105,0,0.08)', padding:'48px 40px', border:'1px solid rgba(253,105,0,0.15)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'36px' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--joy-orange)', display:'inline-block', boxShadow:'0 0 14px rgba(253,105,0,0.6)' }} className="pulse" />
              <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--joy-orange)' }}>Com a Joyeat</p>
            </div>
            {['Pedido pronto em minutos','Cardápio curado sem dúvida','Sem culpa, com prazer','Saudável com sabor de verdade','Ingredientes que você reconhece','Constância que vira hábito','Preço justo pelo que entrega'].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px',
                transition:`all 0.6s ease ${0.1+i*0.06}s`, opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(20px)' }}>
                <span style={{ color:'var(--joy-green-dk)', fontSize:'13px', flexShrink:0, fontWeight:700 }}>✓</span>
                <span style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'rgba(255,255,255,0.85)', fontWeight:500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:640px){.split-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
