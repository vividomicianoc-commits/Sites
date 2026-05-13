import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JOYGROUP | Fast Casual Saudável para a Vida Real — Goiânia",
  description: "A JOYGROUP é um ecossistema moderno de bem-estar: JOYEAT (fast casual saudável), JOYPOWER (suplementos) e JOYBODY (comunidade). Comida de verdade, rápida e saborosa para quem tem rotina real. Em tempo de comer bem.",
  keywords: [
    "fast casual saudável Goiânia",
    "restaurante saudável Goiânia",
    "alimentação saudável prática",
    "comida saudável rápida",
    "fast food saudável",
    "alimentação saudável para rotina corrida",
    "comida de verdade",
    "restaurante saudável moderno",
    "alimentação saudável sem radicalismo",
    "JOYEAT",
    "JOYGROUP",
    "JOYBODY",
    "JOYPOWER",
  ].join(", "),
  authors: [{ name: "JOYGROUP" }],
  creator: "JOYGROUP",
  publisher: "JOYGROUP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://joygroup.com.br",
    siteName: "JOYGROUP",
    title: "JOYGROUP | Fast Casual Saudável para a Vida Real",
    description: "Ecossistema moderno de bem-estar. JOYEAT, JOYPOWER, JOYBODY. Em tempo de comer bem.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOYGROUP | Fast Casual Saudável para a Vida Real",
    description: "Ecossistema moderno de bem-estar. Em tempo de comer bem.",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://joygroup.com.br/#organization",
      name: "JOYGROUP",
      alternateName: ["JOYEAT", "JOYBODY", "JOYPOWER"],
      description: "Ecossistema moderno de bem-estar e alimentação saudável. Fast casual saudável, suplementos e comunidade de saúde.",
      url: "https://joygroup.com.br",
      foundingDate: "2024",
      areaServed: { "@type": "City", name: "Goiânia" },
      knowsAbout: ["fast casual saudável", "alimentação saudável", "comida de verdade", "suplementos naturais", "comunidade de bem-estar"],
    },
    {
      "@type": "Restaurant",
      "@id": "https://joygroup.com.br/#restaurant",
      name: "JOYEAT",
      description: "Fast casual saudável para a rotina real. Comida de verdade, rápida, saborosa e transparente.",
      servesCuisine: ["Fast Casual Saudável", "Comida Saudável"],
      priceRange: "$$",
      address: { "@type": "PostalAddress", addressLocality: "Goiânia", addressRegion: "GO", addressCountry: "BR" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://joygroup.com.br/#faq",
      mainEntity: [
        { "@type": "Question", name: "O que é a JOYEAT?", acceptedAnswer: { "@type": "Answer", text: "A JOYEAT é um fast casual saudável criado para a vida real. Comida de verdade, rápida, saborosa e com transparência total sobre ingredientes e preparo." } },
        { "@type": "Question", name: "A JOYEAT é um restaurante fitness?", acceptedAnswer: { "@type": "Answer", text: "Não. A JOYEAT não é um restaurante fitness. É fast casual saudável para a rotina real — sem radicalismo, com sabor de verdade." } },
        { "@type": "Question", name: "O que significa Em tempo de comer bem?", acceptedAnswer: { "@type": "Answer", text: "É o manifesto da JOYEAT. Significa que mesmo com a correria, ainda dá tempo de comer bem. A marca nasceu para tornar isso possível." } },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#fd6900" />
      </head>
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
