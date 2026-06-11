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

const milestones = [
  { date:'Nov 2024', title:'O nascimento da ideia', desc:'Quatro fundadoras, uma mesa e muita vontade de resolver um problema real.', status:'done', color:'var(--joy-orange)' },
  { date:'Dez 2024', title:'Identidade visual criada', desc:'Branding, paleta, tipografia. A Joyeat ganha identidade que a diferencia de tudo no mercado.', status:'done', color:'var(--joy-green-dk)' },
  { date:'Jan 2025', title:'Ponto comercial assegurado', desc:'Localização estratégica em Goiânia. O endereço ideal para o conceito.', status:'done', color:'var(--joy-orange)' },
  { date:'Fev — Mar 2025', title:'Obra e montagem', desc:'A loja ganha vida. Layout, equipamentos, identidade aplicada no espaço físico.', status:'current', color:'var(--joy-green-dk)' },
  { date:'Abr 2025', title:'Testes e validação', desc:'Receitas, operação, atendimento. Qualidade não é negociável.', status:'next', color:'var(--joy-orange)' },
  { date:'Em breve', title:'Inauguração oficial', desc:'Goiânia vai conhecer o fast casual saudável feito para a vida real.', status:'future', color:'var(--joy-green-dk)' },
];

const stats = [
  { val:'400+', label:'Horas de pesquisa', color:'var(--joy-orange)' },
  { val:'80+', label:'Receitas testadas', color:'var(--joy-green-dk)' },
  { val:'30+', label:'Fornecedores avaliados', color:'var(--joy-orange)' },
  { val:'60+', label:'Reuniões de alinhamento', color:'var(--joy-green-dk)' },
];

export default function BuildDiary() {
  const { ref: hr, inView: hi } = useInView(0.15);
  const { ref: sr, inView: si } = useInView(0.1);
  const { ref: tr, inView: ti } = useInView(0.05);

  return (
    <section id="construcao" style={{ background: 'var(--joy-grafite)', padding: '140px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Grid texture */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(253,105,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(253,105,0,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />

      <div className="container-joy">
        <div ref={hr} style={{ marginBottom:'80px', transition:'all 1.2s ease', opacity:hi?1:0, transform:hi?'translateY(0)':'translateY(30px)' }}>
          <span className="tag tag-white" style={{ marginBottom:'20px', display:'inline-flex' }}>Diário da Construção</span>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(32px,5vw,72px)', lineHeight:1.0, letterSpacing:'-0.025em', color:'#fff', maxWidth:'640px', marginBottom:'20px' }}>
            Construindo mais do<br />que uma <span style={{ color:'var(--joy-orange)' }}>loja.</span>
          </h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'16px', lineHeight:1.8, color:'rgba(255,255,255,0.45)', maxWidth:'480px' }}>
            Cada decisão, cada erro, cada aprendizado. Acompanhe a construção real de uma marca que quer mudar como Goiânia come.
          </p>
        </div>

        {/* Stats */}
        <div ref={sr} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', marginBottom:'80px' }} className="build-stats">
          {stats.map((s, i) => (
            <div key={i} style={{
              padding:'36px 28px', textAlign:'center',
              background:i%2===0?'rgba(255,255,255,0.03)':'rgba(255,255,255,0.02)',
              borderRadius:i===0?'16px 0 0 16px':i===3?'0 16px 16px 0':'0',
              borderRight:i<3?'1px solid rgba(255,255,255,0.04)':'none',
              transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s`,
              opacity:si?1:0, transform:si?'translateY(0)':'translateY(24px)',
            }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(28px,3.5vw,44px)', color:s.color, letterSpacing:'-0.02em' }}>{s.val}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'rgba(255,255,255,0.35)', marginTop:'6px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={tr}>
          <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:'40px', transition:'all 1s ease', opacity:ti?1:0 }}>Linha do Tempo</p>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:'110px', top:0, bottom:0, width:'1px', background:'rgba(255,255,255,0.06)' }} className="timeline-line" />
            {milestones.map((m, i) => (
              <div key={i} style={{
                display:'flex', gap:0, padding:'28px 0',
                borderBottom:i<milestones.length-1?'1px solid rgba(255,255,255,0.04)':'none',
                transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.05+i*0.07}s`,
                opacity:ti?1:0, transform:ti?'translateX(0)':'translateX(-24px)',
              }}>
                <div style={{ width:'110px', flexShrink:0, paddingRight:'28px', paddingTop:'6px' }}>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'rgba(255,255,255,0.25)', lineHeight:1.5 }}>{m.date}</span>
                </div>
                <div style={{ flexShrink:0, width:'36px', display:'flex', justifyContent:'center', paddingTop:'8px' }}>
                  <div style={{
                    width:m.status==='current'?14:8, height:m.status==='current'?14:8,
                    borderRadius:'50%',
                    background:m.status==='future'?'rgba(255,255,255,0.1)':m.color,
                    border:m.status==='future'?`1px solid ${m.color}40`:'none',
                    boxShadow:m.status==='current'?`0 0 20px ${m.color}70`:'none',
                  }} className={m.status==='current'?'pulse':''} />
                </div>
                <div style={{ paddingLeft:'20px', flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
                    <h4 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'16px', color:m.status==='future'?'rgba(255,255,255,0.25)':'#fff' }}>{m.title}</h4>
                    {m.status==='current' && (
                      <span style={{ padding:'2px 10px', background:`${m.color}20`, border:`1px solid ${m.color}40`, borderRadius:'100px', fontSize:'9px', fontFamily:'var(--font-display)', fontWeight:700, color:m.color, letterSpacing:'0.1em', textTransform:'uppercase' }}>Agora</span>
                    )}
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.75, color:'rgba(255,255,255,0.3)' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.build-stats{grid-template-columns:repeat(2,1fr)!important;}.build-stats>div{border-radius:12px!important;border-right:none!important;}.timeline-line{left:70px!important;}}
        @media(max-width:480px){.timeline-line{display:none;}}
      `}</style>
    </section>
  );
}
