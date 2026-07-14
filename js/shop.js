/* JoyEat — Loja conectada à Shopify (headless em site estático)
   -------------------------------------------------------------------------
   COMO FUNCIONA A CONEXÃO
   O catálogo abaixo (JOY_SHOP.products) é sincronizado com a loja Shopify
   "JOY EAT FAST CASUAL LTDA" (xssy2x-ts.myshopify.com). Cada item guarda o
   ID da variante real da Shopify. O botão "Finalizar compra" monta um
   permalink de carrinho da Shopify:
       https://<domínio>/cart/<variantId>:<qtd>,<variantId>:<qtd>
   e leva o cliente ao CHECKOUT SEGURO da Shopify (pagamento, frete, pedido
   e estoque ficam 100% na Shopify).

   PARA ATIVAR AS COMPRAS DE VERDADE:
   1) Defina os preços reais e publique os produtos (status ACTIVE) na Shopify;
   2) Garanta que estão no canal "Loja virtual" (Online Store);
   3) (Opcional) troque `domain` pelo seu domínio próprio quando conectado.
   Enquanto os produtos estiverem em RASCUNHO, o checkout ainda não abre —
   a vitrine funciona normalmente para visualização.

   PARA ATUALIZAR PREÇOS/FOTOS: edite os campos `price` e `img` de cada
   produto aqui (ou peça uma re-sincronização com a Shopify).
   ------------------------------------------------------------------------- */
(function () {
  'use strict';

  var JOY_SHOP = {
    domain: 'xssy2x-ts.myshopify.com',
    currency: 'BRL',
    products: [
      { id: 'shot-imunidade', title: 'Shot de Imunidade', cat: 'Shots', variant: '55599727608100',
        price: 9.00, color: '--amarelo', img: null,
        tagline: 'Gengibre, cúrcuma e limão',
        desc: 'Um reforço para a sua rotina. Gengibre, cúrcuma, limão e hortelã numa bebida fresca e cheia de sabor, adoçada com mel.',
        ingredients: ['Laranja', 'Gengibre', 'Cúrcuma', 'Limão', 'Hortelã', 'Casca de abacaxi', 'Canela', 'Mel'],
        badges: ['Imunidade', 'Fresco'] },

      { id: 'shot-pre-treino', title: 'Shot de Pré-Treino', cat: 'Shots', variant: '55735962796324',
        price: 9.00, color: '--vermelho', img: null,
        tagline: 'Energia natural antes do treino',
        desc: 'Aquele gás natural antes do treino. Laranja, beterraba e gengibre — sem estimulantes pesados, adoçado com mel.',
        ingredients: ['Suco de laranja', 'Beterraba', 'Gengibre', 'Mel'],
        badges: ['Energia', 'Pré-treino'] },

      { id: 'suco-detox', title: 'Suco Detox', cat: 'Sucos', variant: '55735963025700',
        price: 9.00, color: '--verde', img: null,
        tagline: 'Aquele verde que refresca',
        desc: 'Leveza de verdade. Pepino, couve e hortelã com abacaxi e limão, adoçado com mel. Refresca e limpa.',
        ingredients: ['Suco de limão', 'Pepino', 'Abacaxi', 'Couve', 'Hortelã', 'Mel'],
        badges: ['Detox', 'Leve'] },

      { id: 'pink-limonade', title: 'Pink Limonade', cat: 'Sucos', variant: '55735962927396',
        price: 9.00, color: '--teal', img: null,
        tagline: 'Refrescância rosa e tropical',
        desc: 'Limão e água de coco com pitaya, morango e manjericão. Leve, hidratante e adoçado com mel.',
        ingredients: ['Suco de limão', 'Água de coco', 'Pitaya', 'Morango', 'Manjericão', 'Mel'],
        badges: ['Refrescante', 'Hidratante'] },

      { id: 'pink-tropical', title: 'Pink Tropical', cat: 'Sucos', variant: '55735962992932',
        price: 9.00, color: '--petroleo', img: null,
        tagline: 'O tropical em estado puro',
        desc: 'Maracujá e água de coco com pitaya e morango. Doçura equilibrada, adoçado com mel e cheio de refrescância.',
        ingredients: ['Maracujá', 'Água de coco', 'Pitaya', 'Morango', 'Mel'],
        badges: ['Tropical', 'Refrescante'] },

      { id: 'pure-abacaxi', title: 'Base de Abacaxi', cat: 'Bases', variant: '55735961223460',
        price: 9.00, color: '--laranja', img: null,
        tagline: 'Base para drinks e sobremesas',
        desc: 'Abacaxi no ponto certo, adoçado com mel e sem conservantes. Base para drinks, mocktails, sobremesas ou para adoçar do seu jeito.',
        ingredients: ['Abacaxi', 'Mel', 'Água'],
        badges: ['Base para drinks', 'Sem conservantes'] },

      { id: 'pure-frutas-vermelhas', title: 'Base de Frutas Vermelhas', cat: 'Bases', variant: '55735962075428',
        price: 9.00, color: '--vermelho', img: null,
        tagline: 'Base para drinks e sobremesas',
        desc: 'O equilíbrio das frutas vermelhas, adoçado só com mel. Base para drinks, mocktails e sobremesas com sabor de verdade.',
        ingredients: ['Frutas vermelhas', 'Mel'],
        badges: ['Base para drinks', 'Sem conservantes'] },

      { id: 'pure-maracuja', title: 'Base de Maracujá', cat: 'Bases', variant: '55735962763556',
        price: 9.00, color: '--amarelo', img: null,
        tagline: 'Base para drinks e sobremesas',
        desc: 'A intensidade tropical do maracujá, adoçada com mel e sem conservantes. Base para drinks, mocktails e sobremesas.',
        ingredients: ['Maracujá', 'Mel'],
        badges: ['Base para drinks', 'Sem conservantes'] }
    ]
  };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return 'R$ ' + n.toFixed(2).replace('.', ','); };
  var byId = {}; JOY_SHOP.products.forEach(function (p) { byId[p.id] = p; });

  /* ---------- estado ---------- */
  var state = { cat: 'all', q: '', sort: 'rel' };
  var CART_KEY = 'joy_cart_v1';
  function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { return {}; } }
  function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); }
  var cart = loadCart();

  /* ---------- grafismo do produto (mock enquanto não há foto) ---------- */
  function productVisual(p) {
    if (p.img) return '<img class="pc-photo" src="' + p.img + '" alt="' + p.title + '">';
    var jar = p.cat === 'Bases';
    return '<div class="pc-mock ' + (jar ? 'is-jar' : 'is-bottle') + '" style="--c:var(' + p.color + ')">' +
             '<span class="pcm-cap"></span><span class="pcm-body"><i class="pcm-face">' +
             '<img src="assets/rostinho_' + (jar ? 'green' : 'orange') + '.png" alt=""></i></span>' +
           '</div>';
  }

  /* ---------- render grid ---------- */
  var grid = $('#shopGrid'), empty = $('#shopEmpty');
  function filtered() {
    var list = JOY_SHOP.products.filter(function (p) {
      if (state.cat !== 'all' && p.cat !== state.cat) return false;
      if (state.q) {
        var hay = (p.title + ' ' + p.tagline + ' ' + p.ingredients.join(' ')).toLowerCase();
        if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
      }
      return true;
    });
    if (state.sort === 'az') list.sort(function (a, b) { return a.title.localeCompare(b.title); });
    if (state.sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    return list;
  }
  function renderGrid() {
    var list = filtered();
    empty.hidden = list.length > 0;
    grid.innerHTML = list.map(function (p, i) {
      return '<article class="pcard" data-id="' + p.id + '" style="--c:var(' + p.color + ');--d:' + (i * 0.05).toFixed(2) + 's">' +
        '<button class="pc-visual" data-open="' + p.id + '" aria-label="Ver ' + p.title + '">' +
          productVisual(p) +
          '<span class="pc-cat">' + p.cat + '</span>' +
        '</button>' +
        '<div class="pc-info">' +
          '<h3 class="pc-title">' + p.title + '</h3>' +
          '<p class="pc-tag">' + p.tagline + '</p>' +
          '<div class="pc-foot">' +
            '<span class="pc-price">' + fmt(p.price) + '</span>' +
            '<button class="pc-add mag" data-add="' + p.id + '" aria-label="Adicionar ' + p.title + ' ao carrinho">+ Adicionar</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    // anima entrada
    requestAnimationFrame(function () { $$('.pcard', grid).forEach(function (c) { c.classList.add('in'); }); });
    bindMag();
  }

  /* ---------- painel de produto ---------- */
  var pd = $('#pd'), pdScrim = $('#pdScrim'), pdBody = $('#pdBody');
  function openPD(id) {
    var p = byId[id]; if (!p) return;
    var qty = cart[p.variant] || 0;
    pdBody.innerHTML =
      '<div class="pd-visual" style="--c:var(' + p.color + ')">' + productVisual(p) + '</div>' +
      '<div class="pd-cat">' + p.cat + '</div>' +
      '<h2 class="pd-title">' + p.title + '</h2>' +
      '<p class="pd-tag">' + p.tagline + '</p>' +
      '<p class="pd-price">' + fmt(p.price) + '</p>' +
      '<p class="pd-desc">' + p.desc + '</p>' +
      '<div class="pd-ing"><span class="pd-lbl">Ingredientes</span><div class="pd-chips">' +
        p.ingredients.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div></div>' +
      '<div class="pd-actions">' +
        '<div class="qty" data-variant="' + p.variant + '">' +
          '<button class="qminus" aria-label="Menos">−</button>' +
          '<span class="qval">' + (qty || 1) + '</span>' +
          '<button class="qplus" aria-label="Mais">+</button>' +
        '</div>' +
        '<button class="btn btn-primary mag" data-add-n="' + p.id + '">Adicionar ao carrinho</button>' +
      '</div>' +
      '<p class="pd-meta">Adoçado com mel · Sem conservantes · Produção fresca · Rendimento e conservação informados no rótulo.</p>';
    pd.classList.add('open'); pd.setAttribute('aria-hidden', 'false');
    pdScrim.hidden = false; requestAnimationFrame(function () { pdScrim.classList.add('show'); });
    document.body.classList.add('drawer-lock');
    bindMag();
  }
  function closePD() {
    pd.classList.remove('open'); pd.setAttribute('aria-hidden', 'true');
    pdScrim.classList.remove('show'); setTimeout(function () { pdScrim.hidden = true; }, 300);
    if (!cartOpenState) document.body.classList.remove('drawer-lock');
  }

  /* ---------- carrinho ---------- */
  var cartEl = $('#cart'), cartScrim = $('#cartScrim'), cartItems = $('#cartItems');
  var cartEmpty = $('#cartEmpty'), cartFoot = $('#cartFoot'), cartOpenState = false;
  function cartCount() { var n = 0; for (var k in cart) n += cart[k]; return n; }
  function cartSubtotal() {
    var s = 0; JOY_SHOP.products.forEach(function (p) { if (cart[p.variant]) s += cart[p.variant] * p.price; }); return s;
  }
  function syncCounts() {
    var n = cartCount();
    $$('.cart-count').forEach(function (e) { e.textContent = n; });
    var fab = $('#cartFab'); if (fab) fab.hidden = n === 0;
    $$('.cart-count').forEach(function (e) { e.classList.toggle('has', n > 0); });
  }
  function renderCart() {
    var entries = JOY_SHOP.products.filter(function (p) { return cart[p.variant]; });
    cartEmpty.style.display = entries.length ? 'none' : '';
    cartFoot.hidden = entries.length === 0;
    cartItems.innerHTML = entries.map(function (p) {
      var q = cart[p.variant];
      return '<div class="ci" data-variant="' + p.variant + '">' +
        '<div class="ci-visual" style="--c:var(' + p.color + ')">' + productVisual(p) + '</div>' +
        '<div class="ci-mid"><b>' + p.title + '</b><span>' + p.cat + '</span>' +
          '<div class="qty small" data-variant="' + p.variant + '"><button class="qminus">−</button><span class="qval">' + q + '</span><button class="qplus">+</button></div>' +
        '</div>' +
        '<div class="ci-right"><span class="ci-price">' + fmt(p.price * q) + '</span>' +
          '<button class="ci-del" data-del="' + p.variant + '" aria-label="Remover">Remover</button></div>' +
      '</div>';
    }).join('');
    $('#cartSubtotal').textContent = fmt(cartSubtotal());
    syncCounts();
    bindMag();
  }
  function openCart() {
    cartOpenState = true; renderCart();
    cartEl.classList.add('open'); cartEl.setAttribute('aria-hidden', 'false');
    cartScrim.hidden = false; requestAnimationFrame(function () { cartScrim.classList.add('show'); });
    document.body.classList.add('drawer-lock');
  }
  function closeCart() {
    cartOpenState = false;
    cartEl.classList.remove('open'); cartEl.setAttribute('aria-hidden', 'true');
    cartScrim.classList.remove('show'); setTimeout(function () { cartScrim.hidden = true; }, 300);
    if (!pd.classList.contains('open')) document.body.classList.remove('drawer-lock');
  }
  function setQty(variant, q) {
    if (q <= 0) delete cart[variant]; else cart[variant] = q;
    saveCart(cart); renderCart();
  }
  function addToCart(id, n) {
    var p = byId[id]; if (!p) return;
    cart[p.variant] = (cart[p.variant] || 0) + (n || 1);
    saveCart(cart); syncCounts(); pulse(); toast(p.title + ' adicionado ao carrinho');
  }

  /* ---------- checkout Shopify (permalink de carrinho) ---------- */
  function checkoutURL() {
    var pairs = [];
    for (var v in cart) if (cart[v] > 0) pairs.push(v + ':' + cart[v]);
    if (!pairs.length) return null;
    return 'https://' + JOY_SHOP.domain + '/cart/' + pairs.join(',') + '?locale=pt-BR';
  }

  /* ---------- microinterações ---------- */
  function pulse() {
    $$('.cart-count').forEach(function (e) { e.classList.remove('pulse'); void e.offsetWidth; e.classList.add('pulse'); });
  }
  var toastEl = $('#toast'), toastT = null;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.hidden = false; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); setTimeout(function () { toastEl.hidden = true; }, 300); }, 2200);
  }
  function bindMag() {
    if (reduce || !window.matchMedia('(hover:hover)').matches) return;
    $$('.mag').forEach(function (m) {
      if (m._mag) return; m._mag = 1;
      m.addEventListener('pointermove', function (e) {
        var r = m.getBoundingClientRect();
        m.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.2).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px)';
      });
      m.addEventListener('pointerleave', function () { m.style.transform = ''; });
    });
  }

  /* ---------- eventos ---------- */
  // categorias
  $('#shopCats').addEventListener('click', function (e) {
    var b = e.target.closest('.scat'); if (!b) return;
    $$('.scat').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on');
    state.cat = b.getAttribute('data-cat'); renderGrid();
  });
  // busca + ordenação
  var st;
  $('#shopSearch').addEventListener('input', function (e) { clearTimeout(st); var v = e.target.value; st = setTimeout(function () { state.q = v.trim(); renderGrid(); }, 140); });
  $('#shopSort').addEventListener('change', function (e) { state.sort = e.target.value; renderGrid(); });
  $('#shopClear').addEventListener('click', function () {
    state = { cat: 'all', q: '', sort: 'rel' }; $('#shopSearch').value = ''; $('#shopSort').value = 'rel';
    $$('.scat').forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-cat') === 'all') }); renderGrid();
  });
  // grid: abrir produto / adicionar
  grid.addEventListener('click', function (e) {
    var open = e.target.closest('[data-open]'); if (open) { openPD(open.getAttribute('data-open')); return; }
    var add = e.target.closest('[data-add]'); if (add) { addToCart(add.getAttribute('data-add'), 1); }
  });
  // painel de produto
  $('#pdClose').addEventListener('click', closePD);
  pdScrim.addEventListener('click', closePD);
  pdBody.addEventListener('click', function (e) {
    var addn = e.target.closest('[data-add-n]');
    if (addn) { var q = parseInt($('.qty .qval', pdBody).textContent, 10) || 1; addToCart(addn.getAttribute('data-add-n'), q); closePD(); openCart(); return; }
    stepQty(e, pdBody, true);
  });
  // carrinho
  $$('.cart-open, #cartFab').forEach(function (b) { b.addEventListener('click', openCart); });
  $('#cartClose').addEventListener('click', closeCart);
  cartScrim.addEventListener('click', closeCart);
  $$('.cart-close').forEach(function (b) { b.addEventListener('click', closeCart); });
  cartItems.addEventListener('click', function (e) {
    var del = e.target.closest('[data-del]'); if (del) { setQty(del.getAttribute('data-del'), 0); return; }
    stepQty(e, cartItems, false);
  });
  $('#cartCheckout').addEventListener('click', function (e) {
    var url = checkoutURL();
    if (!url) { e.preventDefault(); return; }
    e.currentTarget.setAttribute('href', url);
    // deixa o navegador seguir o link para o checkout da Shopify
  });
  // ESC fecha drawers
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (pd.classList.contains('open')) closePD(); else if (cartOpenState) closeCart(); }
  });
  // stepper +/- genérico
  function stepQty(e, root, isPD) {
    var plus = e.target.closest('.qplus'), minus = e.target.closest('.qminus'); if (!plus && !minus) return;
    var box = e.target.closest('.qty'); var val = $('.qval', box);
    if (isPD) { // só ajusta o número local no painel
      var n = (parseInt(val.textContent, 10) || 1) + (plus ? 1 : -1); if (n < 1) n = 1; val.textContent = n; return;
    }
    var variant = box.getAttribute('data-variant');
    setQty(variant, (cart[variant] || 0) + (plus ? 1 : -1));
  }

  /* ---------- reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('seen'); io.unobserve(x.target); } });
    }, { threshold: 0.2 });
    $$('[data-seen]').forEach(function (e) { io.observe(e); });
  } else { $$('[data-seen]').forEach(function (e) { e.classList.add('seen'); }); }

  // barra de progresso
  var prog = $('#prog');
  window.addEventListener('scroll', function () {
    if (!prog) return; var h = document.documentElement; var max = (h.scrollHeight - h.clientHeight) || 1;
    prog.style.width = (Math.min(1, window.scrollY / max) * 100) + '%';
  }, { passive: true });

  /* ---------- init ---------- */
  renderGrid(); syncCounts(); bindMag();
})();
