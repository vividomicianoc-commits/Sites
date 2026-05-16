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

const pillars = [
  { icon: '⚡', title: 'Rapidez', desc: 'Pedido feito. Refeição pronta. Sem fila mental.', color: 'var(--joy-orange)' },
  { icon: '🌿', title: 'Comida Real', desc: 'Ingredientes que você reconhece. Sem ultraprocessados.', color: 'var(--joy-green-dk)' },
  { icon: '👁', title: 'Transparência', desc: 'Você sabe o que come. Origem, preparo, ingredientes.', color: 'var(--joy-orange)' },
  { icon: '🔥', title: 'Sabor', desc: 'Se não for gostoso, não vira hábito. Ponto.', color: 'var(--joy-green-dk)' },
  { icon: '🧠', title: 'Zero Esforço', desc: 'Cardápio curado. Decisão em segundos.', color: 'var(--joy-orange)' },
  { icon: '🔄', title: 'Constância', desc: 'Não somos pra uma dieta. Somos pra toda a vida.', color: 'var(--joy-green-dk)' },
];

const menu = [
  { name: 'Power Bowl', desc: 'Base de grãos, proteína grelhada, vegetais frescos', tag: 'Favorito', accent: 'var(--joy-orange)' },
  { name: 'Fresh Wrap', desc: 'Folha crocante, recheio curado, muito sabor', tag: 'Novo', accent: 'var(--joy-green)' },
  { name: 'Joy Burger', desc: 'Blend especial, ingredientes honestos, sabor real', tag: 'Top', accent: 'var(--joy-orange)' },
  { name: 'Green Bowl', desc: 'Leveza máxima, energia garantida para a tarde', tag: 'Leve', accent: 'var(--joy-green)' },
];

export default function JoyeatSection() {
  const { ref: h, inView: hi } = useInView(0.15);
  const { ref: p, inView: pi } = useInView(0.05);
  const { ref: m, inView: mi } = useInView(0.05);

  return (
    <section id="joyeat" style={{ background: 'var(--joy-cream)', padding: '140px 0', overflow: 'hidden' }}>
      <div className="container-joy">
        {/* Header */}
        <div ref={h} style={{
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'end', marginBottom:'100px',
          transition:'all 1.2s ease', opacity:hi?1:0, transform:hi?'translateY(0)':'translateY(30px)',
        }} className="joyeat-head">
          <div>
            <span className="tag tag-orange" style={{ marginBottom:'24px', display:'inline-flex' }}>Joyeat</span>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(36px,5.5vw,80px)', lineHeight:0.95, letterSpacing:'-0.025em', color:'var(--joy-grafite)' }}>
              Fast food<br />
              <span style={{ color:'var(--joy-orange)' }}>de comida</span><br />
              de verdade.
            </h2>
          </div>
          <div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'17px', lineHeight:1.8, color:'var(--joy-gray)', marginBottom:'28px' }}>
              A Joyeat prova que comida saudável pode ser fitness, pode ser natural
              e pode, sim, ter muito sabor — acompanhando o ritmo de cada um.
            </p>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'14px', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--joy-orange)' }}>
              Inaugurando em Goiânia →
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div ref={p} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'100px' }} className="pillars-grid">
          {pillars.map((pl, i) => (
            <div key={i} style={{
              background:'#fff', borderRadius:'20px', padding:'36px 32px',
              border:'1.5px solid transparent',
              transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.05+i*0.07}s, border-color 0.3s ease`,
              opacity:pi?1:0, transform:pi?'translateY(0)':'translateY(30px)',
              cursor:'default',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = pl.color; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize:'28px', marginBottom:'16px' }}>{pl.icon}</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'17px', color:pl.color, marginBottom:'8px' }}>{pl.title}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.7, color:'var(--joy-gray)' }}>{pl.desc}</p>
            </div>
          ))}
        </div>

        {/* Menu preview */}
        <div ref={m}>
          <div style={{
            display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'40px', flexWrap:'wrap', gap:'20px',
            transition:'all 1s ease', opacity:mi?1:0, transform:mi?'translateY(0)':'translateY(20px)',
          }}>
            <div>
              <span className="tag tag-dark" style={{ marginBottom:'14px', display:'inline-flex' }}>Em breve</span>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(22px,3.5vw,42px)', color:'var(--joy-grafite)', letterSpacing:'-0.02em' }}>
                Saudável com cara de real.
              </h3>
            </div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'var(--joy-gray-lt)', maxWidth:'180px', textAlign:'right', lineHeight:1.6 }}>
              Cardápio completo em breve
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px' }} className="menu-grid">
            {menu.map((item, i) => (
              <div key={i} style={{
                background:'#fff', borderRadius:'20px', overflow:'hidden',
                border:'1.5px solid rgba(22,22,22,0.06)',
                transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.05+i*0.08}s`,
                opacity:mi?1:0, transform:mi?'translateY(0)':'translateY(40px)',
                cursor:'default',
              }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = item.accent; d.style.transform = 'translateY(-6px)'; d.style.boxShadow = `0 20px 50px rgba(22,22,22,0.1)`; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = 'rgba(22,22,22,0.06)'; d.style.transform = 'translateY(0)'; d.style.boxShadow = 'none'; }}
              >
                {/* Visual */}
                <div style={{
                  height:'160px', position:'relative',
                  background:`linear-gradient(135deg, ${item.accent}22 0%, ${item.accent}0a 100%)`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <div className="float" style={{ width:'80px', height:'80px', borderRadius:'50%', background:`${item.accent}30`, border:`2px solid ${item.accent}40` }} />
                  <div style={{
                    position:'absolute', top:'12px', right:'12px',
                    background:item.accent, color:item.accent === 'var(--joy-orange)' ? '#fff' : 'var(--joy-grafite)',
                    fontFamily:'var(--font-display)', fontWeight:800, fontSize:'9px',
                    letterSpacing:'0.12em', textTransform:'uppercase', padding:'4px 10px', borderRadius:'100px',
                  }}>{item.tag}</div>
                </div>
                <div style={{ padding:'20px 22px' }}>
                  <h4 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'16px', color:'var(--joy-grafite)', marginBottom:'6px' }}>{item.name}</h4>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', lineHeight:1.6, color:'var(--joy-gray-lt)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){.pillars-grid{grid-template-columns:repeat(2,1fr)!important;}.menu-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:768px){.joyeat-head{grid-template-columns:1fr!important;gap:32px!important;}.pillars-grid{grid-template-columns:1fr!important;}.menu-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}
