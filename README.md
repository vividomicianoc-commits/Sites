# JoyEat — site (Joy Group)

Site institucional da **JoyEat**, marca do **Joy Group**.
Experiência cinematográfica com scroll contínuo, identidade de marca viva e
motion design como parte da identidade.

## Stack
- HTML/CSS estáticos (sem build step)
- **GSAP + ScrollTrigger** — animações dirigidas por scroll
- **Lenis** — smooth scroll com inércia
- Fontes: Fredoka + Inter (Google Fonts)

## Estrutura
```
index.html          # marcação
css/style.css       # estilos + tokens de motion
js/main.js          # GSAP + ScrollTrigger + Lenis + microinterações
assets/             # arquivos ORIGINAIS da marca (Drive)
  logo.png
  pattern_a/b.png   # rostinho (padrão) laranja / verde
  band_a/b.png      # recortes sem emenda p/ faixas em movimento
  ring_orange/white.png   # anel de raios (grafismo)
  rostinho_green/orange.png # rostinho-personagem (marca d'água viva)
```

## Rodar localmente
Qualquer servidor estático, ex.:
```
npx serve .      # ou: python3 -m http.server 8000
```

## Publicar
Deploy estático (GitHub Pages, Netlify, Vercel). Não há build.

## A fazer (pendências de conteúdo)
- [x] Vídeo do hero (full-screen) → `assets/hero.mp4` (+ `assets/hero-poster.jpg`) já no `<video>` do `.hero-video`
- [ ] Fotos reais dos produtos (PNG recortado) no cardápio/loja
- [ ] Adesivos originais da marca (as frases) — arquivos do Drive
- [ ] Logo da Joy Power / Joy Group (quando existirem)

> Todos os grafismos usados são **arquivos originais da marca**, sem recriação.
