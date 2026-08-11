/* JoyEat — Sistema de promoções (barra de anúncio + popup de 1ª compra)
   Referências (pasta Drive "Ecommerce"):
   - Barra "SÓ HOJE / FRETE GRÁTIS" + contador  → Insider Store (img 15.59.25 (2))
   - Popup "DESBLOQUEIE 15% OFF na 1ª compra"    → Insider Store (img 15.59.25)
   - "sua primeira compra tem 20% OFF"           → Sallve (img 15.56.39)
   Config central abaixo — ajuste valores/cupom conforme a Shopify. */
(function () {
  'use strict';
  window.JOY_PROMO = {
    freeShippingThreshold: 99,      // R$ para frete grátis
    giftThreshold: 149,             // R$ para brinde
    firstCoupon: 'JOY15',           // cupom de 1ª compra (criar igual na Shopify)
    firstPercent: 15,               // % do cupom
    whatsapp: '556292456199'        // WhatsApp oficial da Joy (+55 62 9245-6199)
  };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ---------- estilos ---------- */
  var css = ''
  + ':root{--promobar:40px}'
  + '.has-promobar .nav{top:var(--promobar)}'
  + '.has-promobar .shop-bar{top:calc(64px + var(--promobar))}'
  + '.joy-bar{position:fixed;top:0;left:0;right:0;height:var(--promobar);z-index:70;display:flex;align-items:center;justify-content:center;'
  + 'background:linear-gradient(90deg,var(--laranja,#EA5C25),var(--vermelho,#E53323));color:#fff;overflow:hidden}'
  + '.joy-bar-track{display:flex;align-items:center;gap:.6rem;font-family:Outfit,system-ui,sans-serif;font-weight:600;font-size:.82rem;'
  + 'letter-spacing:.01em;white-space:nowrap;padding:0 1rem;text-align:center;transition:opacity .4s}'
  + '.joy-bar-track b{font-weight:800}'
  + '.joy-bar .cd{font-variant-numeric:tabular-nums;background:rgba(0,0,0,.16);padding:.1rem .45rem;border-radius:6px;font-weight:800}'
  + '@media(max-width:600px){.joy-bar-track{font-size:.72rem}}'
  /* popup */
  + '.joy-pop-scrim{position:fixed;inset:0;background:rgba(20,18,14,.55);z-index:9998;opacity:0;transition:opacity .4s}'
  + '.joy-pop-scrim.in{opacity:1}'
  + '.joy-pop{position:fixed;z-index:9999;left:50%;top:50%;transform:translate(-50%,-46%) scale(.96);opacity:0;'
  + 'width:min(430px,92vw);background:var(--paper,#FBF8F1);border-radius:20px;overflow:hidden;'
  + 'box-shadow:0 30px 70px rgba(0,0,0,.3);transition:transform .5s cubic-bezier(.2,.9,.3,1),opacity .5s;font-family:Inter,system-ui,sans-serif}'
  + '.joy-pop.in{transform:translate(-50%,-50%) scale(1);opacity:1}'
  + '.joy-pop-head{background:linear-gradient(135deg,var(--laranja,#EA5C25),var(--amarelo,#FAB900));padding:1.6rem 1.5rem 1.4rem;color:#fff;position:relative;overflow:hidden}'
  + '.joy-pop-head .off{font-family:Outfit,sans-serif;font-weight:900;font-size:2.6rem;line-height:1;letter-spacing:-.03em}'
  + '.joy-pop-head p{margin:.3rem 0 0;font-weight:600;font-size:1rem}'
  + '.joy-pop-body{padding:1.4rem 1.5rem 1.6rem}'
  + '.joy-pop-body label{display:block;font-size:.82rem;color:var(--soft,#5A544A);margin-bottom:.4rem;font-weight:500}'
  + '.joy-pop input{width:100%;padding:.8rem .9rem;border:1.5px solid var(--line,#E7E0D2);border-radius:12px;font-size:.95rem;background:#fff;color:#1A1712;margin-bottom:.7rem}'
  + '.joy-pop input:focus{outline:none;border-color:var(--laranja,#EA5C25)}'
  + '.joy-pop .cta{width:100%;border:none;cursor:pointer;font-family:Outfit,sans-serif;font-weight:700;font-size:1rem;color:#fff;'
  + 'background:var(--laranja,#EA5C25);border-radius:100px;padding:.85rem;transition:.2s}'
  + '.joy-pop .cta:hover{background:#d44e1c}'
  + '.joy-pop .fine{font-size:.72rem;color:var(--muted,#8A8172);margin-top:.7rem;text-align:center}'
  + '.joy-pop .skip{display:block;width:100%;background:none;border:none;color:var(--muted,#8A8172);font-size:.8rem;cursor:pointer;margin-top:.5rem;text-decoration:underline}'
  + '.joy-pop-x{position:absolute;top:.7rem;right:.7rem;z-index:2;width:30px;height:30px;border-radius:50%;border:none;'
  + 'background:rgba(255,255,255,.25);color:#fff;font-size:1rem;cursor:pointer}'
  + '.joy-pop .reveal{text-align:center}'
  + '.joy-pop .code{font-family:Outfit,sans-serif;font-weight:800;font-size:1.6rem;letter-spacing:.12em;color:var(--laranja,#EA5C25);'
  + 'border:2px dashed var(--laranja,#EA5C25);border-radius:12px;padding:.7rem;margin:.4rem 0 .8rem;cursor:copy}'
  + '@media(prefers-color-scheme:dark){.joy-pop{background:#1D1A16}.joy-pop input{background:#141210;color:#F3EEE4;border-color:#2E2A23}}'
  + '@media(prefers-reduced-motion:reduce){.joy-bar-track,.joy-pop,.joy-pop-scrim{transition:opacity .2s}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- barra de anúncio ---------- */
  var P = window.JOY_PROMO;
  document.documentElement.classList.add('has-promobar');
  var bar = document.createElement('div');
  bar.className = 'joy-bar';
  bar.innerHTML = '<div class="joy-bar-track" id="joyBarTrack"></div>';
  document.body.insertBefore(bar, document.body.firstChild);
  var track = $('#joyBarTrack');

  /* ---------- botão flutuante de WhatsApp (todas as páginas) ---------- */
  (function () {
    var wcss = '.joy-wa{position:fixed;left:20px;bottom:20px;z-index:80;width:56px;height:56px;border-radius:50%;'
      + 'background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 26px rgba(0,0,0,.28);'
      + 'transition:transform .25s var(--ease,ease),box-shadow .25s}'
      + '.joy-wa:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 14px 32px rgba(37,211,102,.45)}'
      + '.joy-wa svg{width:30px;height:30px;fill:#fff}'
      + '@media(max-width:600px){.joy-wa{width:52px;height:52px;left:16px;bottom:16px}}';
    var ws = document.createElement('style'); ws.textContent = wcss; document.head.appendChild(ws);
    var a = document.createElement('a');
    a.className = 'joy-wa'; a.setAttribute('aria-label', 'Falar no WhatsApp'); a.target = '_blank'; a.rel = 'noopener';
    a.href = 'https://wa.me/' + P.whatsapp + '?text=' + encodeURIComponent('Olá! Vim pelo site da Joy e quero fazer um pedido.');
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-1.9-.9-.3-.1-.5-.2-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>';
    document.body.appendChild(a);
  })();

  function fmtCd() {
    var now = new Date(), end = new Date(); end.setHours(23, 59, 59, 999);
    var s = Math.max(0, Math.floor((end - now) / 1000));
    var h = String(Math.floor(s / 3600)).padStart(2, '0');
    var m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    var ss = String(s % 60).padStart(2, '0');
    return h + ':' + m + ':' + ss;
  }
  var msgs = [
    function () { return '<b>FRETE GRÁTIS</b> nas compras acima de R$ ' + P.freeShippingThreshold; },
    function () { return '<b>SÓ HOJE</b> · ' + P.firstPercent + '% OFF na 1ª compra com o cupom <b>' + P.firstCoupon + '</b> · termina em <span class="cd">' + fmtCd() + '</span>'; },
    function () { return 'Adoçado com mel · Sem conservantes · Produção fresca'; }
  ];
  var mi = 0;
  function paint() { track.innerHTML = msgs[mi](); }
  paint();
  if (!reduce) {
    setInterval(function () { track.style.opacity = 0; setTimeout(function () { mi = (mi + 1) % msgs.length; paint(); track.style.opacity = 1; }, 400); }, 4200);
    setInterval(function () { if (mi === 1) { var cd = $('.cd', track); if (cd) cd.textContent = fmtCd(); } }, 1000);
  }

  /* ---------- popup de 1ª compra ---------- */
  var POP_KEY = 'joy_firstpop_v1';
  var seen = null; try { seen = localStorage.getItem(POP_KEY); } catch (e) {}
  if (seen) return;

  function buildPopup() {
    if (document.getElementById('joyPop')) return;
    var scrim = document.createElement('div'); scrim.className = 'joy-pop-scrim'; scrim.id = 'joyPopScrim';
    var pop = document.createElement('div'); pop.className = 'joy-pop'; pop.id = 'joyPop';
    pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Desconto de primeira compra');
    pop.innerHTML =
      '<button class="joy-pop-x" aria-label="Fechar">✕</button>'
      + '<div class="joy-pop-head"><div class="off">' + P.firstPercent + '% OFF</div><p>na sua primeira compra na Joy</p></div>'
      + '<div class="joy-pop-body" id="joyPopBody">'
      + '<label>Deixe seu e-mail e receba seu cupom:</label>'
      + '<input type="email" id="joyPopMail" placeholder="seu@email.com" autocomplete="email">'
      + '<button class="cta" id="joyPopCta">QUERO MEU DESCONTO</button>'
      + '<p class="fine">Válido acima de R$ ' + P.freeShippingThreshold + '. Você também recebe novidades e promoções.</p>'
      + '<button class="skip" id="joyPopSkip">Agora não</button>'
      + '</div>';
    document.body.appendChild(scrim); document.body.appendChild(pop);
    requestAnimationFrame(function () { scrim.classList.add('in'); pop.classList.add('in'); });

    function close() { try { localStorage.setItem(POP_KEY, '1'); } catch (e) {} scrim.classList.remove('in'); pop.classList.remove('in'); setTimeout(function () { scrim.remove(); pop.remove(); }, 500); }
    function reveal() {
      try { localStorage.setItem(POP_KEY, 'converted'); localStorage.setItem('joy_coupon', P.firstCoupon); } catch (e) {}
      $('#joyPopBody', pop).innerHTML =
        '<div class="reveal"><p style="font-weight:600;margin-bottom:.2rem">Prontinho! Use o cupom:</p>'
        + '<div class="code" id="joyCode" title="clique para copiar">' + P.firstCoupon + '</div>'
        + '<p class="fine">Aplique no carrinho para ganhar ' + P.firstPercent + '% OFF (acima de R$ ' + P.freeShippingThreshold + ').</p>'
        + '<button class="cta" id="joyGoShop">Ir às compras</button></div>';
      var code = $('#joyCode', pop);
      if (code) code.addEventListener('click', function () { try { navigator.clipboard.writeText(P.firstCoupon); code.textContent = 'copiado!'; setTimeout(function () { code.textContent = P.firstCoupon; }, 1200); } catch (e) {} });
      var go = $('#joyGoShop', pop); if (go) go.addEventListener('click', function () { close(); if (!/loja\.html/.test(location.pathname)) location.href = 'loja.html'; });
    }
    pop.querySelector('.joy-pop-x').addEventListener('click', close);
    $('#joyPopSkip', pop).addEventListener('click', close);
    scrim.addEventListener('click', close);
    $('#joyPopCta', pop).addEventListener('click', function () {
      var mail = $('#joyPopMail', pop); if (!mail.value || mail.value.indexOf('@') < 0) { mail.style.borderColor = 'var(--vermelho,#E53323)'; mail.focus(); return; }
      // TODO: enviar o e-mail para a ferramenta de marketing/Shopify quando integrada.
      reveal();
    });
  }
  // aparece após o usuário responder o aviso de cookies (evita 2 overlays juntos)
  function maybeShow() {
    var consent = null; try { consent = localStorage.getItem('joy_consent_v1'); } catch (e) {}
    if (consent) buildPopup(); else setTimeout(maybeShow, 2500);
  }
  setTimeout(maybeShow, reduce ? 1200 : 6000);
})();
