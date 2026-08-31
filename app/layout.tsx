import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const spaceGrotesk = Space_Grotesk({ variable: '--font-space-grotesk', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: "KNDev's Solutions | Software sob medida e consultoria",
  description: 'Transformamos ideias e necessidades reais em sistemas, aplicativos, automações e soluções digitais sob medida para o seu negócio.',
  keywords: ['software sob medida', 'desenvolvimento de sistemas', 'aplicativos', 'automação', 'MVP', 'consultoria em tecnologia'],
  openGraph: {
    type: 'website', locale: 'pt_BR', siteName: "KNDev's Solutions",
    title: "KNDev's Solutions | Software sob medida e consultoria",
    description: 'Transformamos ideias e necessidades reais em sistemas, aplicativos, automações e soluções digitais sob medida para o seu negócio.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Você tem a ideia. Nós desenvolvemos a solução.' }],
  },
  twitter: {
    card: 'summary_large_image', title: "KNDev's Solutions | Software sob medida e consultoria",
    description: 'Software sob medida para transformar necessidades reais em soluções digitais.', images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</body></html>;
}
