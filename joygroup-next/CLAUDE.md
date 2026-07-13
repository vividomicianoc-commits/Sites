@AGENTS.md

# JoyGroup — Site (Next.js)

Site institucional do **Joy Group**, que reúne **JoyEat** (comida saudável, rápida e transparente) e **Joy Power** (suplementação limpa). Foco: experiência cinematográfica, branding forte e premium.

## Stack

- **Next.js 16** (App Router, `src/`, TypeScript) — ver `AGENTS.md`: esta versão tem breaking changes, consultar `node_modules/next/dist/docs/` antes de escrever código.
- **Tailwind CSS 4**
- **GSAP 3** + **ScrollTrigger** (`gsap/ScrollTrigger`)
- **Lenis** (smooth scroll)

## Regra de animação (OBRIGATÓRIA)

**Toda animação usa Lenis no scroll e GSAP no movimento.**

- **Lenis** é a única fonte de scroll suave da página.
- **GSAP** controla todo o movimento (reveals, timelines, transformações, parallax, pin).
- **ScrollTrigger** sincroniza GSAP com o scroll do Lenis. Sempre conectar os dois:
  - `lenis.on('scroll', ScrollTrigger.update)`
  - dirigir o Lenis pelo ticker do GSAP: `gsap.ticker.add((t) => lenis.raf(t * 1000))` + `gsap.ticker.lagSmoothing(0)`
- Não usar `scroll-behavior` em CSS, nem outra lib de scroll, nem animação de scroll fora de GSAP/ScrollTrigger.
- Registrar plugins uma vez: `gsap.registerPlugin(ScrollTrigger)`.
- Respeitar `prefers-reduced-motion`: desligar Lenis e reveals quando ativo.
- Componentes com GSAP são Client Components (`"use client"`); usar `useLayoutEffect`/`useGSAP` e limpar (`ctx.revert()`) no unmount.

## Estrutura

- `src/app/` — App Router (layout, page, globals)
- Componentes e o provider de scroll (Lenis) entram aqui conforme forem criados.

## Scripts

- `npm run dev` · `npm run build` · `npm run start` · `npm run lint`
