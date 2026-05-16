'use client';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background:'var(--joy-cream-dk)', borderTop:'1.5px solid rgba(22,22,22,0.06)', padding:'72px 0 36px' }}>
      <div className="container-joy">
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'64px' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom:'14px', lineHeight:0 }}>
              <Logo size={26} />
            </div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.8, color:'var(--joy-gray)', maxWidth:'260px', marginBottom:'24px' }}>
              Fast casual saudável para a vida real.<br />Em tempo de comer bem.
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--joy-gray-lt)', marginBottom:'8px' }}>📍 Goiânia, Goiás</p>
            <div style={{ display:'flex', gap:'8px', marginTop:'16px' }}>
              {['Instagram','WhatsApp','TikTok'].map(s => (
                <button key={s} style={{ background:'transparent', border:'1.5px solid rgba(22,22,22,0.12)', borderRadius:'100px', padding:'7px 14px', color:'var(--joy-gray)', fontFamily:'var(--font-body)', fontSize:'11px', cursor:'pointer', transition:'all 0.25s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor='var(--joy-orange)'; (e.currentTarget as HTMLButtonElement).style.color='var(--joy-orange)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor='rgba(22,22,22,0.12)'; (e.currentTarget as HTMLButtonElement).style.color='var(--joy-gray)'; }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Joyeat */}
          <div>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--joy-orange)', marginBottom:'18px' }}>Joyeat</p>
            {['Manifesto','Conceito','Cardápio','Transparência','Beta Testers'].map(item => (
              <button key={item} style={{ display:'block', background:'none', border:'none', color:'var(--joy-gray)', fontFamily:'var(--font-body)', fontSize:'13px', cursor:'pointer', padding:'5px 0', textAlign:'left', transition:'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--joy-grafite)')} onMouseLeave={e => (e.currentTarget.style.color='var(--joy-gray)')}>
                {item}
              </button>
            ))}
          </div>

          {/* JOYGROUP */}
          <div>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--joy-green-dk)', marginBottom:'18px' }}>Joygroup</p>
            {['Nossa História','Fundadoras','Joybody','Joypower','Construção'].map(item => (
              <button key={item} style={{ display:'block', background:'none', border:'none', color:'var(--joy-gray)', fontFamily:'var(--font-body)', fontSize:'13px', cursor:'pointer', padding:'5px 0', textAlign:'left', transition:'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--joy-grafite)')} onMouseLeave={e => (e.currentTarget.style.color='var(--joy-gray)')}>
                {item}
              </button>
            ))}
          </div>

          {/* Contato */}
          <div>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(22,22,22,0.35)', marginBottom:'18px' }}>Contato</p>
            {['Fale Conosco','Imprensa','Parcerias','Franchising','Carreiras'].map(item => (
              <button key={item} style={{ display:'block', background:'none', border:'none', color:'var(--joy-gray)', fontFamily:'var(--font-body)', fontSize:'13px', cursor:'pointer', padding:'5px 0', textAlign:'left', transition:'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--joy-grafite)')} onMouseLeave={e => (e.currentTarget.style.color='var(--joy-gray)')}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop:'1.5px solid rgba(22,22,22,0.06)', paddingTop:'28px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'16px' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--joy-gray-lt)' }}>© {year} Joygroup. Todos os direitos reservados. Goiânia, GO.</p>
          <div style={{ display:'flex', gap:'20px' }}>
            {['Privacidade','Termos','Cookies'].map(item => (
              <button key={item} style={{ background:'none', border:'none', color:'var(--joy-gray-lt)', fontFamily:'var(--font-body)', fontSize:'12px', cursor:'pointer', padding:0, transition:'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--joy-gray)')} onMouseLeave={e => (e.currentTarget.style.color='var(--joy-gray-lt)')}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* SEO hidden */}
        <p style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }}>
          Joyeat — Fast casual saudável em Goiânia. Restaurante saudável moderno. Alimentação saudável prática para rotina corrida. Comida de verdade, rápida e saborosa. Fast food saudável sem radicalismo. Joygroup, Joybody, Joypower.
        </p>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important;}}@media(max-width:560px){.footer-grid{grid-template-columns:1fr!important;}}`}</style>
    </footer>
  );
}
