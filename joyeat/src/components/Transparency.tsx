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

const items = [
  { num:'01', title:'Origem dos ingredientes', desc:'Sabemos de onde vem cada ingrediente. Fornecedores selecionados, rastreabilidade real.', icon:'🌱' },
  { num:'02', title:'Controle de qualidade', desc:'Protocolos rigorosos de armazenamento, validade e preparo. Segurança alimentar não é opcional.', icon:'🔬' },
  { num:'03', title:'Equipe treinada', desc:'Time capacitado em manipulação segura e contaminação cruzada. Protocolos visíveis.', icon:'👥' },
  { num:'04', title:'Sem ingredientes escondidos', desc:'O que está no prato é o que está no cardápio. Sem ultraprocessados disfarçados.', icon:'👁' },
  { num:'05', title:'Rastreabilidade total', desc:'Do fornecedor ao prato. Em breve, QR code para rastrear sua refeição.', icon:'🔗' },
  { num:'06', title:'Restrições atendidas', desc:'Vegano, sem glúten, sem lactose, low carb. Identificação clara. Preparo seguro.', icon:'✅' },
];

export default function Transparency() {
  const { ref: hr, inView: hi } = useInView(0.2);
  const { ref: gr, inView: gi } = useInView(0.05);

  return (
    <section id="transparencia" style={{ background: 'var(--joy-green)', padding: '140px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative circle */}
      <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'400px', height:'400px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', pointerEvents:'none' }} />

      <div className="container-joy">
        <div ref={hr} style={{
          display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'48px', marginBottom:'80px',
          transition:'all 1.2s ease', opacity:hi?1:0, transform:hi?'translateY(0)':'translateY(30px)',
        }}>
          <div>
            <span className="tag" style={{ marginBottom:'20px', display:'inline-flex', border:'1.5px solid rgba(22,22,22,0.3)', color:'var(--joy-grafite)' }}>Transparência</span>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(32px,5vw,72px)', lineHeight:1.0, letterSpacing:'-0.025em', color:'var(--joy-grafite)' }}>
              Você sabe o que<br />
              está comendo.
            </h2>
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'17px', lineHeight:1.8, color:'rgba(22,22,22,0.7)', maxWidth:'400px' }}>
            Na Joyeat, transparência não é marketing. É compromisso.
            Sem ingredientes misteriosos, sem enganação, sem promessas vazias.
          </p>
        </div>

        <div ref={gr} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }} className="trans-grid">
          {items.map((item, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.85)', borderRadius:'20px', padding:'36px 32px',
              backdropFilter:'blur(10px)',
              transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.05+i*0.07}s`,
              opacity:gi?1:0, transform:gi?'translateY(0)':'translateY(30px)',
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'11px', letterSpacing:'0.15em', color:'rgba(22,22,22,0.3)' }}>{item.num}</span>
                <span style={{ fontSize:'22px' }}>{item.icon}</span>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'16px', color:'var(--joy-grafite)', marginBottom:'10px' }}>{item.title}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.7, color:'var(--joy-gray)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.trans-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:640px){.trans-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}
