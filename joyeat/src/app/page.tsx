import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Manifesto from '@/components/Manifesto';
import Problem from '@/components/Problem';
import JoyeatSection from '@/components/JoyeatSection';
import Founders from '@/components/Founders';
import Ecosystem from '@/components/Ecosystem';
import Transparency from '@/components/Transparency';
import BuildDiary from '@/components/BuildDiary';
import Community from '@/components/Community';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        {/* Navigation */}
        <Navbar />

        {/* 1. Hero — primeira impressão */}
        <Hero />

        {/* Marquee ticker */}
        <Marquee />

        {/* 2. Manifesto */}
        <Manifesto />

        {/* 3. O Problema */}
        <Problem />

        {/* Marquee reverse */}
        <Marquee reverse />

        {/* 4. JOYEAT — o conceito */}
        <JoyeatSection />

        {/* 5. Fundadoras */}
        <Founders />

        {/* 6. Ecossistema JOYGROUP */}
        <Ecosystem />

        {/* 7. Transparência */}
        <Transparency />

        {/* 8. Diário da Construção */}
        <BuildDiary />

        {/* 9. Comunidade */}
        <Community />

        {/* 10. FAQ */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
