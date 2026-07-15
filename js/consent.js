/* JoyEat — Consentimento de cookies (LGPD)
   Banner leve e auto-contido. Guarda a escolha do usuário em localStorage e
   expõe window.joyConsent para liberar (futuramente) scripts de analytics/marketing
   apenas após o "Aceitar". Enquanto não houver rastreamento, ele registra a preferência
   e mantém a loja em conformidade. */
(function () {
  'use strict';
  var KEY = 'joy_consent_v1';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  window.joyConsent = { value: saved, granted: saved === 'all' };

  if (saved) return; // já respondeu

  var css = ''
    + '.joy-cc{position:fixed;left:50%;bottom:16px;transform:translateX(-50%) translateY(140%);'
    + 'width:min(680px,94vw);z-index:9999;background:#FFFFFF;color:#1A1712;border:1px solid #E7E0D2;'
    + 'border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.18);padding:1.1rem 1.25rem;'
    + 'font-family:Inter,system-ui,sans-serif;opacity:0;transition:transform .5s cubic-bezier(.2,.9,.3,1),opacity .5s}'
    + '.joy-cc.in{transform:translateX(-50%) translateY(0);opacity:1}'
    + '.joy-cc-row{display:flex;gap:1rem;align-items:center;flex-wrap:wrap}'
    + '.joy-cc-txt{flex:1 1 300px;font-size:.9rem;line-height:1.5;color:#5A544A}'
    + '.joy-cc-txt b{color:#1A1712;font-family:Outfit,Inter,sans-serif;font-weight:700}'
    + '.joy-cc-txt a{color:#EA5C25;text-decoration:underline}'
    + '.joy-cc-btns{display:flex;gap:.5rem;flex:0 0 auto}'
    + '.joy-cc-b{font-family:Outfit,Inter,sans-serif;font-weight:600;font-size:.86rem;cursor:pointer;'
    + 'border-radius:100px;padding:.6rem 1.1rem;border:1.5px solid #E7E0D2;background:#FBF8F1;color:#1A1712;transition:.2s}'
    + '.joy-cc-b:hover{border-color:#1A1712}'
    + '.joy-cc-b.primary{background:#EA5C25;border-color:#EA5C25;color:#fff}'
    + '.joy-cc-b.primary:hover{background:#d44e1c;border-color:#d44e1c}'
    + '@media(prefers-color-scheme:dark){.joy-cc{background:#1D1A16;color:#F3EEE4;border-color:#2E2A23}'
    + '.joy-cc-txt{color:#B3AA9B}.joy-cc-txt b{color:#F3EEE4}.joy-cc-b{background:#141210;color:#F3EEE4;border-color:#2E2A23}}'
    + '@media(prefers-reduced-motion:reduce){.joy-cc{transition:opacity .3s}}';

  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var el = document.createElement('div');
  el.className = 'joy-cc';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Aviso de cookies');
  el.innerHTML =
    '<div class="joy-cc-row">'
    + '<p class="joy-cc-txt"><b>A gente usa cookies.</b> Eles ajudam a melhorar sua experiência na Joy. '
    + 'Você pode aceitar todos ou manter só os essenciais. Saiba mais na nossa '
    + '<a href="#" class="joy-cc-priv">Política de Privacidade</a>.</p>'
    + '<div class="joy-cc-btns">'
    + '<button class="joy-cc-b" data-choice="essential">Só essenciais</button>'
    + '<button class="joy-cc-b primary" data-choice="all">Aceitar</button>'
    + '</div></div>';
  document.body.appendChild(el);
  requestAnimationFrame(function () { setTimeout(function () { el.classList.add('in'); }, 400); });

  function choose(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    window.joyConsent = { value: v, granted: v === 'all' };
    el.classList.remove('in');
    setTimeout(function () { el.remove(); }, 500);
  }
  el.addEventListener('click', function (e) {
    var b = e.target.closest('[data-choice]');
    if (b) { choose(b.getAttribute('data-choice')); return; }
    if (e.target.closest('.joy-cc-priv')) { e.preventDefault(); alert('A Política de Privacidade completa será publicada junto com o lançamento da loja.'); }
  });
})();
