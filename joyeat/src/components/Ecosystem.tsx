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

export default function Ecosystem() {
  const { ref: hr, inView: hi } = useInView(0.15);
  const { ref: cr, inView: ci } = useInView(0.05);

  const brands = [
    {
      name:'JOYEAT', icon:'🍽', status:'Em construção',
      headline:'Fast casual saudável para a vida real.',
      desc:'Comida de verdade, rápida e saborosa. Para quem é fitness, para quem quer manter a rotina e para quem tem restrições alimentares.',
      features:['Bowls & Wraps','Joy Burgers','Drive-thru moderno','Cardápio curado','Transparência total'],
      accent:'var(--joy-orange)', bg:'rgba(253,105,0,0.05)', border:'rgba(253,105,0,0.15)', size:'large',
    },
    {
      name:'JOYBODY', icon:'💚', status:'Em breve',
      headline:'Comunidade de bem-estar.',
      desc:'Nutricionistas, personal trainers, desafios, eventos e pertencimento. Saúde coletiva de verdade.',
      features:['Comunidade ativa','Nutricionistas','Desafios mensais','Eventos','Parceiros'],
      accent:'var(--joy-green-dk)', bg:'rgba(136,221,3,0.06)', border:'rgba(136,221,3,0.2)', size:'small',
    },
    {
      name:'JOYPOWER', icon:'⚡', status:'Em breve',
      headline:'Suplementos honestos.',
      desc:'Linha clean label, funcional e moderna. Sem exagero. Só o que funciona para a rotina real.',
      features:['Suplementos naturais','Clean label','Performance real','Ciência aplicada','Lifestyle fit'],
      accent:'var(--joy-orange)', bg:'rgba(253,105,0,0.04)', border:'rgba(253,105,0,0.1)', size:'small',
    },
  ];

  const large = brands.filter(b => b.size === 'large');
  const small = brands.filter(b => b.size === 'small');

  return (
    <section id="ecossistema" style={{ background: 'var(--joy-cream)', padding: '140px 0', overflow: 'hidden' }}>
      <div className="container-joy">
        <div ref={hr} style={{
          display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'48px', marginBottom:'80px',
          transition:'all 1.2s ease', opacity:hi?1:0, transform:hi?'translateY(0)':'translateY(30px)',
        }}>
          <div>
            <span className="tag tag-orange" style={{ marginBottom:'20px', display:'inline-flex' }}>JOYGROUP</span>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(32px,5.5vw,76px)', lineHeight:1.0, letterSpacing:'-0.025em', color:'var(--joy-grafite)' }}>
              Isso é só<br />
              <span style={{ color:'var(--joy-green-dk)' }}>o começo.</span>
            </h2>
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'16px', lineHeight:1.8, color:'var(--joy-gray)', maxWidth:'400px' }}>
            A Joygroup é um ecossistema de bem-estar moderno. Três marcas conectadas por um propósito: tornar a vida saudável acessível, prática e prazerosa.
          </p>
        </div>

        <div ref={cr}>
          {/* Large — Joyeat */}
          {large.map((b, i) => (
            <div key={i} style={{
              background:b.bg, border:`1.5px solid ${b.border}`, borderRadius:'28px',
              padding:'56px 56px', marginBottom:'14px',
              display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center',
              transition:`all 1s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`,
              opacity:ci?1:0, transform:ci?'translateY(0)':'translateY(40px)',
            }} className="eco-large">
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'28px' }}>
                  <span style={{ fontSize:'28px' }}>{b.icon}</span>
                  <div>
                    <p style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'12px', letterSpacing:'0.2em', textTransform:'uppercase', color:b.accent }}>{b.name}</p>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'var(--joy-gray-lt)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{b.status}</span>
                  </div>
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(26px,3.5vw,48px)', lineHeight:1.1, color:'var(--joy-grafite)', letterSpacing:'-0.02em', marginBottom:'20px' }}>{b.headline}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', lineHeight:1.8, color:'var(--joy-gray)' }}>{b.desc}</p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {b.features.map((f, j) => (
                  <div key={j} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'14px 18px', background:'rgba(255,255,255,0.8)', borderRadius:'12px', border:'1px solid rgba(22,22,22,0.05)' }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:b.accent, flexShrink:0 }} />
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--joy-grafite)', fontWeight:500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Small grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }} className="eco-small">
            {small.map((b, i) => (
              <div key={i} style={{
                background:b.bg, border:`1.5px solid ${b.border}`, borderRadius:'24px', padding:'44px 40px',
                transition:`all 1s cubic-bezier(0.16,1,0.3,1) ${0.15+i*0.1}s`,
                opacity:ci?1:0, transform:ci?'translateY(0)':'translateY(40px)',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
                  <span style={{ fontSize:'24px' }}>{b.icon}</span>
                  <div>
                    <p style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'12px', letterSpacing:'0.2em', textTransform:'uppercase', color:b.accent }}>{b.name}</p>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', color:'var(--joy-gray-lt)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{b.status}</span>
                  </div>
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(20px,2.5vw,32px)', color:'var(--joy-grafite)', lineHeight:1.1, marginBottom:'14px' }}>{b.headline}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.75, color:'var(--joy-gray)', marginBottom:'24px' }}>{b.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {b.features.map((f, j) => (
                    <span key={j} style={{ padding:'5px 12px', borderRadius:'100px', background:`${b.accent}15`, border:`1px solid ${b.accent}25`, fontFamily:'var(--font-body)', fontSize:'11px', color:b.accent, fontWeight:600 }}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.eco-large{grid-template-columns:1fr!important;gap:32px!important;padding:36px 28px!important;}.eco-small{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}
