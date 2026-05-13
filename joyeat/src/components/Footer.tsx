'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--joy-dark)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '80px 0 40px',
      }}
    >
      <div className="container-joy">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '60px',
            marginBottom: '80px',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#fafafa',
                marginBottom: '16px',
              }}
            >
              JOY<span style={{ color: 'var(--joy-orange)' }}>GROUP</span>
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'rgba(250,250,250,0.35)',
                marginBottom: '28px',
                maxWidth: '280px',
              }}
            >
              Ecossistema moderno de bem-estar.
              JOYEAT, JOYBODY e JOYPOWER.
              Em tempo de comer bem.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Instagram', 'TikTok', 'WhatsApp'].map((social) => (
                <button
                  key={social}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    color: 'rgba(250,250,250,0.4)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(253,105,0,0.4)';
                    e.currentTarget.style.color = 'var(--joy-orange)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(250,250,250,0.4)';
                  }}
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* JOYGROUP */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--joy-orange)',
                marginBottom: '20px',
              }}
            >
              JOYGROUP
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Manifesto', 'Nossa História', 'Fundadoras', 'Transparência', 'Carreiras'].map((item) => (
                <button
                  key={item}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(250,250,250,0.35)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fafafa')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.35)')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* JOYEAT */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--joy-green)',
                marginBottom: '20px',
              }}
            >
              JOYEAT
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Cardápio', 'Conceito', 'Localização', 'Franchising', 'Beta Testers'].map((item) => (
                <button
                  key={item}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(250,250,250,0.35)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fafafa')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.35)')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(250,250,250,0.3)',
                marginBottom: '20px',
              }}
            >
              Contato
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Fale Conosco', 'Imprensa', 'Parcerias', 'JOYBODY', 'JOYPOWER'].map((item) => (
                <button
                  key={item}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(250,250,250,0.35)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fafafa')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.35)')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(250,250,250,0.2)',
            }}
          >
            © {currentYear} JOYGROUP. Todos os direitos reservados. Goiânia, GO, Brasil.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacidade', 'Termos', 'Cookies'].map((item) => (
              <button
                key={item}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(250,250,250,0.2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,250,250,0.2)')}
              >
                {item}
              </button>
            ))}
          </div>

          {/* SEO footer text — hidden visually but good for crawlers */}
          <p
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              clip: 'rect(0,0,0,0)',
              whiteSpace: 'nowrap',
            }}
          >
            JOYEAT — Fast casual saudável em Goiânia. Restaurante saudável moderno. Alimentação saudável prática para rotina corrida. Comida de verdade, rápida e saborosa. Fast food saudável sem radicalismo. JOYGROUP, JOYBODY, JOYPOWER.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
