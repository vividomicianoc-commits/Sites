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

const founders = [
  { initial:'V', name:'Vitória', theme:'Transparência', quote:'"Saúde não é radicalismo."', story:'Sempre sentiu que o mercado saudável estava distante da vida real. Muito marketing, pouca verdade nutricional. A Joyeat nasceu do cansaço com isso.', tags:['Marketing vs Verdade','Rótulo fit','Autenticidade'], accent:'var(--joy-orange)' },
  { initial:'I', name:'Isabela', theme:'Agilidade', quote:'"A rotina acelerada fazia comer bem parecer inviável."', story:'Não faltava vontade. Faltava estrutura. A Joyeat foi construída para preencher esse vazio da vida corrida.', tags:['Tempo curto','Praticidade','Rotina real'], accent:'var(--joy-green-dk)' },
  { initial:'M', name:'Maria Eduarda', theme:'Próxima Geração', quote:'"Nossa geração quer saúde e praticidade."', story:'Segurança alimentar e qualidade real são direitos, não privilégios. A próxima geração merece confiar no que come.', tags:['Segurança alimentar','Qualidade real','Confiança'], accent:'var(--joy-orange)' },
  { initial:'N', name:'Nathalia', theme:'Sabor', quote:'"Se não for gostoso, não vira hábito."', story:'Cansada de comida saudável sem graça. Prazer não é opcional — é estratégico. Sem sabor não há constância.', tags:['Sabor de verdade','Prazer','Constância'], accent:'var(--joy-green-dk)' },
];

export default function Founders() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="fundadoras" style={{ background: 'var(--joy-white)', padding: '140px 0', overflow: 'hidden' }}>
      <div className="container-joy">
        <div ref={ref} style={{
          display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'32px',
          marginBottom:'80px',
          transition:'all 1.2s ease', opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(30px)',
        }}>
          <div>
            <span className="tag tag-orange" style={{ marginBottom:'20px', display:'inline-flex' }}>Fundadoras</span>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(32px,5vw,68px)', lineHeight:1.0, letterSpacing:'-0.025em', color:'var(--joy-grafite)', maxWidth:'600px' }}>
              Quatro dores.<br />
              <span style={{ color:'var(--joy-orange)' }}>Uma solução.</span>
            </h2>
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'16px', lineHeight:1.8, color:'var(--joy-gray)', maxWidth:'360px' }}>
            A Joyeat nasceu da experiência real de quatro mulheres que sentiram na pele a dificuldade de manter uma alimentação saudável na vida corrida.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'16px' }} className="founders-grid">
          {founders.map((f, i) => {
            const { ref: fr, inView: fi } = useInView(0.1);
            return (
              <div key={i} ref={fr} style={{
                background:'var(--joy-cream)', borderRadius:'24px', padding:'44px 40px',
                border:'1.5px solid rgba(22,22,22,0.06)',
                transition:`all 0.9s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`,
                opacity:fi?1:0, transform:fi?'translateY(0)':'translateY(40px)',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'18px', marginBottom:'28px' }}>
                  <div style={{
                    width:'56px', height:'56px', borderRadius:'50%',
                    background:`linear-gradient(135deg, ${f.accent}, ${f.accent}80)`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--font-display)', fontWeight:900, fontSize:'22px', color:'#fff', flexShrink:0,
                  }}>{f.initial}</div>
                  <div>
                    <p style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'17px', color:'var(--joy-grafite)' }}>{f.name}</p>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:f.accent }}>{f.theme}</span>
                  </div>
                </div>
                <p style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(16px,2vw,20px)', color:f.accent, lineHeight:1.3, marginBottom:'16px', fontStyle:'italic' }}>{f.quote}</p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.75, color:'var(--joy-gray)', marginBottom:'24px' }}>{f.story}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {f.tags.map((tag, j) => (
                    <span key={j} style={{
                      padding:'5px 12px', borderRadius:'100px',
                      background:`${f.accent}15`, border:`1px solid ${f.accent}30`,
                      fontFamily:'var(--font-body)', fontSize:'11px', color:f.accent, fontWeight:600,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:768px){.founders-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
