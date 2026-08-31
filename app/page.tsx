import { LandingPage } from '@/components/landing-page';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  name: "KNDev's Solutions",
  description: 'Fábrica de softwares e consultoria que transforma necessidades reais em soluções digitais sob medida.',
  serviceType: ['Desenvolvimento de software sob medida', 'Consultoria em tecnologia'],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LandingPage />
    </>
  );
}
