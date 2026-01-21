"use client";

import { HeroSection, SplitScreen } from "@/components/home";

// Placeholder content for now - will be replaced with localized content
const physioContent = {
  title: "Physiotherapie",
  tagline: "Professionelle Behandlung für Ihre Gesundheit",
  paragraphs: [
    "Als ausgebildeter Physiotherapeut biete ich Ihnen eine individuelle Behandlung, die auf Ihre spezifischen Bedürfnisse zugeschnitten ist. Durch gezielte manuelle Therapie und moderne Behandlungsmethoden helfe ich Ihnen, Schmerzen zu lindern und Ihre Beweglichkeit wiederherzustellen.",
    "Mein ganzheitlicher Ansatz berücksichtigt nicht nur Ihre akuten Beschwerden, sondern auch deren Ursachen. Gemeinsam entwickeln wir einen nachhaltigen Therapieplan, der Sie auf dem Weg zur vollständigen Genesung begleitet.",
    "Von Rückenschmerzen über Sportverletzungen bis hin zu postoperativer Rehabilitation – ich stehe Ihnen mit meiner Expertise zur Seite und unterstütze Sie dabei, Ihre körperliche Gesundheit zurückzugewinnen.",
  ],
};

const ptContent = {
  title: "Personal Training",
  tagline: "Erreichen Sie Ihre Fitnessziele mit professioneller Begleitung",
  paragraphs: [
    "Als zertifizierter Personal Trainer entwickle ich maßgeschneiderte Trainingsprogramme, die exakt auf Ihre individuellen Ziele abgestimmt sind. Ob Muskelaufbau, Gewichtsreduktion oder allgemeine Fitness – gemeinsam erreichen wir Ihre Ziele.",
    "Meine Trainingsmethoden basieren auf wissenschaftlichen Erkenntnissen und jahrelanger praktischer Erfahrung. Ich motiviere und begleite Sie durch jede Session, um sicherzustellen, dass Sie das Maximum aus Ihrem Training herausholen.",
    "Flexibel, effektiv und individuell – mein Personal Training passt sich Ihrem Lebensstil an. Ob im Studio, zu Hause oder im Freien, ich bringe das Training zu Ihnen und helfe Ihnen, die beste Version Ihrer selbst zu werden.",
  ],
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section - Sticky with fade/scale on scroll */}
      <HeroSection
        title="Jakob Pinger"
        subtitle="Physiotherapie & Personal Training – Professionelle Betreuung für Ihre Gesundheit und Fitness in Wien"
      />

      {/* Split Screen Section - Overlays the hero as you scroll */}
      <div className="relative z-10 bg-color-background">
        <SplitScreen
          physioContent={physioContent}
          ptContent={ptContent}
        />
      </div>
    </div>
  );
}
