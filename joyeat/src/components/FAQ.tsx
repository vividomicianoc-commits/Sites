'use client';

import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const faqs = [
  {
    q: 'O que é a JOYEAT?',
    a: 'A JOYEAT é um fast casual saudável criado para a vida real. Comida de verdade, rápida, saborosa e com total transparência sobre ingredientes e preparo. Não é restaurante fitness. Não é marmitaria. É o meio-termo que o mercado precisava.',
  },
  {
    q: 'A JOYEAT é restaurante fitness?',
    a: 'Não. A JOYEAT não é restaurante fitness. É fast casual saudável para quem tem rotina real. Sem cara de academia, sem peso de culpa, sem radicalismo. Com sabor de verdade e praticidade de sempre.',
  },
  {
    q: 'O que significa "Em tempo de comer bem"?',
    a: 'É o manifesto da JOYEAT. Significa que, mesmo com toda a correria da vida moderna, ainda dá tempo de comer bem. A marca nasceu para provar — e tornar real — que saúde e praticidade podem andar juntas.',
  },
  {
    q: 'Quanto tempo demora para receber o pedido?',
    a: 'Rápido. Esse é o ponto central do nosso modelo. Nada de esperar 40 minutos. A JOYEAT foi projetada para ser eficiente: pedido feito, refeição pronta em minutos. Sem sacrificar qualidade.',
  },
  {
    q: 'Vocês possuem opções para restrições alimentares?',
    a: 'Sim. O cardápio da JOYEAT terá opções veganas, sem glúten, sem lactose e low carb claramente identificadas. Cada restrição é levada a sério — com preparo seguro e informações transparentes.',
  },
  {
    q: 'Vai ter aplicativo?',
    a: 'Sim. O app da JOYGROUP está no roadmap. Ele vai centralizar pedidos, controle nutricional, personalização e acesso à comunidade JOYBODY. Por enquanto, fique de olho na nossa construção.',
  },
  {
    q: 'O que é a JOYBODY?',
    a: 'JOYBODY é a plataforma de comunidade e bem-estar do ecossistema JOYGROUP. Nutricionistas, personal trainers, desafios, eventos e uma comunidade de pessoas que querem viver melhor na vida real — sem extremismo.',
  },
  {
    q: 'O que é a JOYPOWER?',
    a: 'JOYPOWER é a linha de suplementos honestos do ecossistema JOYGROUP. Produtos funcionais, clean label, sem ingredientes desnecessários. Performance real para quem tem rotina real.',
  },
];

function FAQItem({ faq, index, inView }: { faq: { q: string; a: string }; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="faq-item"
      style={{
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + index * 0.04}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '28px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          gap: '24px',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            fontWeight: 600,
            color: open ? '#fafafa' : 'rgba(250,250,250,0.7)',
            lineHeight: 1.4,
            transition: 'color 0.3s ease',
          }}
        >
          {faq.q}
        </span>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: open ? 'var(--joy-orange)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${open ? 'var(--joy-orange)' : 'rgba(255,255,255,0.08)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s ease',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transition: 'transform 0.3s ease',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            <path d="M6 1v10M1 6h10" stroke={open ? '#000' : '#fafafa'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </button>
      <div
        style={{
          height: open ? 'auto' : '0',
          overflow: 'hidden',
          maxHeight: open ? '400px' : '0',
          transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'rgba(250,250,250,0.45)',
            paddingBottom: '28px',
            maxWidth: '680px',
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: faqRef, inView: faqInView } = useInView(0.05);

  return (
    <section
      style={{
        padding: '160px 0',
        background: 'var(--joy-dark)',
        position: 'relative',
      }}
    >
      <div className="container-joy">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '100px',
            alignItems: 'start',
          }}
          className="faq-layout"
        >
          {/* Left */}
          <div
            ref={headerRef}
            style={{
              position: 'sticky',
              top: '120px',
              transition: 'all 1.2s ease',
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <span className="tag" style={{ marginBottom: '28px', display: 'inline-flex' }}>FAQ</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#fafafa',
                marginBottom: '24px',
              }}
            >
              Perguntas
              <br />
              <span className="gradient-text-orange">frequentes.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'rgba(250,250,250,0.35)',
              }}
            >
              Tem mais dúvidas?
              Fale com a gente nas redes sociais ou entre na nossa comunidade.
            </p>
          </div>

          {/* Right — FAQ items */}
          <div ref={faqRef}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} inView={faqInView} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
          .faq-layout > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
