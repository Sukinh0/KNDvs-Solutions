'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownRight, ArrowRight, Boxes, Braces, Check, ChevronDown, ChevronRight, CircleDot,
  Gauge, Layers3, Lightbulb, Menu, MessageSquareCode, Minus, Network, RefreshCw, Rocket,
  Smartphone, Sparkles, Workflow, X,
} from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import {
  benefits, navigation, problems, processSteps, projects, services, transformations,
  type ServiceIcon,
} from '@/lib/site-content';

const iconMap: Record<ServiceIcon, typeof Braces> = {
  web: Braces,
  mobile: Smartphone,
  automation: Workflow,
  mvp: Rocket,
  consulting: MessageSquareCode,
  maintenance: RefreshCw,
};

function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className={`section-heading${light ? ' light' : ''}`} data-reveal>
      <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', closeOnEscape);
    document.body.classList.toggle('menu-open', open);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="KNDev's Solutions — início" onClick={() => setOpen(false)}>
          <img src="/logomarca.png" alt="KNDev's Solutions" width="512" height="192" fetchPriority="high" />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="button button-small header-cta" href="#contato">Fale com a gente <ArrowDownRight aria-hidden="true" /></a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu">
        <nav className="container" aria-label="Navegação mobile">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{item.label}<ChevronRight aria-hidden="true" />
            </a>
          ))}
          <a className="button" href="#contato" onClick={() => setOpen(false)}>Fale com a gente <ArrowRight aria-hidden="true" /></a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    visualRef.current?.style.setProperty('--pointer-x', x.toFixed(3));
    visualRef.current?.style.setProperty('--pointer-y', y.toFixed(3));
  }

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span aria-hidden="true" /> Software &amp; consultoria</p>
          <h1 id="hero-title">
            Você tem a <em>ideia.</em><br />Nós desenvolvemos a <strong>solução.</strong>
          </h1>
          <p className="hero-lead">A KNDev&apos;s Solutions transforma necessidades reais em <mark>software sob medida.</mark></p>
          <p className="hero-benefit">Menos processos manuais. Mais <b>agilidade</b>, <b>controle</b> e <b>crescimento</b>.</p>
          <div className="hero-actions">
            <a className="button" href="#contato">Tire sua ideia do papel <ArrowRight aria-hidden="true" /></a>
            <a className="button button-secondary" href="#solucoes">Conheça nossas soluções</a>
          </div>
        </div>

        <div className="solution-flow" ref={visualRef} onPointerMove={handlePointerMove}
          onPointerLeave={() => { visualRef.current?.style.setProperty('--pointer-x', '0'); visualRef.current?.style.setProperty('--pointer-y', '0'); }}
          aria-label="Um problema com dados desconectados passa pela KNDev's Solutions e se transforma em módulos de software organizados" data-reveal>
          <div className="flow-caption flow-caption-in"><CircleDot aria-hidden="true" /> Problema</div>
          <div className="input-nodes" aria-hidden="true">
            <span className="node node-a"><Minus /></span><span className="node node-b" />
            <span className="node node-c"><Minus /></span><span className="node node-d" />
          </div>
          <div className="flow-core" aria-hidden="true">
            <span className="core-ring" /><img src="/kn-symbol.png" alt="" width="256" height="256" fetchPriority="high" />
            <span className="flow-line line-in" /><span className="flow-line line-out" />
            <span className="core-label">Transformação</span>
          </div>
          <div className="output-stack" aria-hidden="true">
            <div className="module module-primary"><span /><span /><span /></div>
            <div className="module-row"><div className="module module-small"><Braces /></div><div className="module module-small module-accent"><Check /></div></div>
            <div className="module module-wide"><span /><span /></div>
          </div>
          <div className="flow-caption flow-caption-out"><Boxes aria-hidden="true" /> Solução estruturada</div>
          <span className="data-pulse pulse-one" aria-hidden="true" /><span className="data-pulse pulse-two" aria-hidden="true" />
        </div>
      </div>
      <a className="scroll-cue" href="#problemas" aria-label="Ir para problemas que resolvemos"><span>Entenda o fluxo</span><ArrowDownRight aria-hidden="true" /></a>
    </section>
  );
}

function ProblemsSection() {
  const [view, setView] = useState<'before' | 'after'>('before');
  return (
    <section className="problems-section section-dark" id="problemas" aria-labelledby="problems-title">
      <div className="container">
        <SectionHeading eyebrow="Do atrito ao avanço" title="Menos processos manuais. Mais resultado no dia a dia." text="Toda solução começa com um problema bem entendido. Tornamos visível o que trava a operação — e o caminho para destravar." />
        <div className="transformation-panel" data-reveal>
          <fieldset className="transformation-tabs">
            <legend className="sr-only">Destacar cenário</legend>
            <button type="button" className={view === 'before' ? 'active' : ''} aria-pressed={view === 'before'} onClick={() => setView('before')}>Antes</button>
            <button type="button" className={view === 'after' ? 'active' : ''} aria-pressed={view === 'after'} onClick={() => setView('after')}>Depois</button>
          </fieldset>
          <div className="transformation-grid">
            <article className={`state-card before${view === 'before' ? ' is-active' : ''}`}>
              <div className="state-label"><span /> O que trava</div>
              <ul>{problems.map((problem) => <li key={problem}><X aria-hidden="true" />{problem}</li>)}</ul>
            </article>
            <div className="transform-bridge" aria-hidden="true"><span /><ArrowRight /></div>
            <article className={`state-card after${view === 'after' ? ' is-active' : ''}`}>
              <div className="state-label"><span /> O que muda</div>
              <ul>{transformations.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  function toggleService(serviceId: string) {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(serviceId)) next.delete(serviceId);
      else next.add(serviceId);
      return next;
    });
  }

  return (
    <section className="services-section section-light" id="solucoes" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading light eyebrow="Soluções" title="Tecnologia aplicada ao que seu negócio realmente precisa." />
          <p data-reveal>Da clareza inicial à evolução do produto, construímos o caminho com você.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            const active = expandedIds.has(service.id);
            return (
              <article key={service.id} className={`service-card${active ? ' is-active' : ''}`}>
                <div className="service-top"><span className="service-number">{service.number}</span><Icon aria-hidden="true" /></div>
                <h3>{service.title}</h3><p className="service-summary">{service.summary}</p>
                <button
                  className="service-select"
                  type="button"
                  aria-expanded={active}
                  aria-controls={`service-details-${service.id}`}
                  onClick={() => toggleService(service.id)}
                >
                  <span>{active ? 'Ocultar detalhes' : 'Ver detalhes'}</span>
                  <ChevronDown className={active ? 'is-open' : ''} aria-hidden="true" />
                </button>
                <div className="service-flow" id={`service-details-${service.id}`} aria-label={`Fluxo de ${service.title}`}>
                  <div><span>Problema</span><p>{service.problem}</p></div><ArrowRight aria-hidden="true" />
                  <div><span>Solução</span><p>{service.solution}</p></div><ArrowRight aria-hidden="true" />
                  <div><span>Resultado</span><p>{service.result}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const icons = [Workflow, Layers3, Gauge, Sparkles, Network, Lightbulb];
  const [expandedBenefits, setExpandedBenefits] = useState<Set<number>>(() => new Set());

  function toggleBenefit(index: number) {
    setExpandedBenefits((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section className="benefits-section section-light" aria-labelledby="benefits-title">
      <div className="container benefits-layout">
        <div className="benefits-sticky">
          <SectionHeading light eyebrow="Benefícios" title="Tecnologia que simplifica — e acompanha o próximo passo." text="O ganho aparece na rotina: menos atrito, mais visibilidade e uma base que pode evoluir." />
          <a className="text-link" href="#contato">Conversar sobre uma necessidade <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => {
            const Icon = icons[index];
            const active = expandedBenefits.has(index);
            return (
              <article className={`benefit-card${active ? ' is-active' : ''}`} key={benefit.title}>
                <span className="benefit-index">0{index + 1}</span>
                <Icon aria-hidden="true" />
                <h3>{benefit.title}</h3>
                <p id={`benefit-detail-${index}`}>{benefit.text}</p>
                <span className="benefit-hint" aria-hidden="true">{active ? '−' : '+'}</span>
                <button
                  className="benefit-toggle"
                  type="button"
                  aria-expanded={active}
                  aria-controls={`benefit-detail-${index}`}
                  onClick={() => toggleBenefit(index)}
                >
                  <span className="sr-only">{active ? `Ocultar detalhes de ${benefit.title}` : `Ver detalhes de ${benefit.title}`}</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ activeStep }: { activeStep: number }) {
  return (
    <section className="process-section section-dark" id="processo" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading eyebrow="Como trabalhamos" title="Um processo claro do primeiro entendimento à evolução." text="Cada etapa reduz incertezas e aproxima a solução da necessidade real." />
        <div className="process-timeline" style={{ '--process-progress': `${(activeStep / (processSteps.length - 1)) * 100}%` } as CSSProperties}>
          <div className="timeline-line" aria-hidden="true"><span /></div>
          {processSteps.map((step, index) => (
            <article key={step.number} className={`process-step${index <= activeStep ? ' is-active' : ''}`} data-process-step data-index={index} data-reveal>
              <span className="step-dot" aria-hidden="true"><span /></span>
              <div className="step-number">{step.number}</div><h3>{step.title}</h3><p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section section-light" id="sobre" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-mark" aria-hidden="true" data-reveal><img src="/kn-symbol.png" alt="" width="256" height="256" loading="lazy" /><span>Negócio</span><span>Tecnologia</span><span>Solução</span></div>
        <div data-reveal>
          <p className="eyebrow"><span aria-hidden="true" /> Sobre a KNDev&apos;s Solutions</p>
          <h2 id="about-title">Tecnologia próxima do negócio. Desenvolvimento com responsabilidade.</h2>
          <p>A KNDev&apos;s Solutions aproxima tecnologia e negócio para transformar necessidades reais em soluções personalizadas.</p>
          <p>Trabalhamos com clareza, parceria e responsabilidade — entendendo primeiro, desenvolvendo em etapas e evoluindo com propósito.</p>
          <ul className="brand-pillars"><li><Check />Clareza</li><li><Check />Personalização</li><li><Check />Confiabilidade</li><li><Check />Evolução</li></ul>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  if (projects.length === 0) return null;
  return (
    <section className="projects-section section-dark" aria-labelledby="projects-title">
      <div className="container"><SectionHeading eyebrow="Projetos" title="Soluções construídas a partir de desafios reais." />
        <div className="projects-grid">{projects.map((project) => <article key={project.title}><h3>{project.title}</h3><p>{project.context}</p></article>)}</div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="container final-cta-inner" data-reveal>
        <div><p className="eyebrow"><span aria-hidden="true" /> Próximo passo</p><h2 id="final-cta-title">Sua <em>ideia</em> não precisa continuar só no papel.</h2></div>
        <div><p>Conte o que você precisa. Vamos transformar sua ideia em um caminho viável e em uma solução real.</p><a className="button button-light" href="#contato">Vamos conversar <ArrowRight aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section section-dark" id="contato" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy" data-reveal><p className="eyebrow"><span aria-hidden="true" /> Contato</p><h2 id="contact-title">Tire sua ideia do papel.</h2><p>Explique o desafio do seu jeito. Nós ajudamos a organizar o problema e definir o próximo passo possível.</p>
          <div className="contact-promise"><Lightbulb aria-hidden="true" /><div><strong>Uma conversa começa pelo entendimento.</strong><span>Sem jargão e sem respostas prontas.</span></div></div>
        </div>
        <div data-reveal><ContactForm /></div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div><a className="footer-brand" href="#inicio" aria-label="KNDev's Solutions — início"><img src="/logomarca.png" alt="KNDev's Solutions" width="512" height="192" loading="lazy" /></a><p>Fábrica de softwares &amp; consultoria.</p></div>
        <nav aria-label="Navegação do rodapé">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div className="official-channels"><span>Canais oficiais</span><p>Use o formulário desta página enquanto os demais canais são configurados.</p><a href="#contato">Iniciar contato <ArrowRight aria-hidden="true" /></a></div>
      </div>
      <div className="container footer-bottom"><p>© {year} KNDev&apos;s Solutions. Todos os direitos reservados.</p><Link href="/politica-de-privacidade">Política de privacidade</Link></div>
    </footer>
  );
}

export function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!reduceMotion) {
      document.documentElement.classList.add('reveal-ready');
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
      revealItems.forEach((item) => revealObserver.observe(item));

      const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveStep(Number((entry.target as HTMLElement).dataset.index ?? 0));
        });
      }, { threshold: 0.55, rootMargin: '-15% 0px -35% 0px' });
      document.querySelectorAll('[data-process-step]').forEach((item) => stepObserver.observe(item));
      return () => { revealObserver.disconnect(); stepObserver.disconnect(); document.documentElement.classList.remove('reveal-ready'); };
    }
  }, []);

  return (
    <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header />
      <main id="conteudo"><Hero /><ProblemsSection /><ServicesSection /><BenefitsSection /><ProcessSection activeStep={activeStep} /><AboutSection /><ProjectsSection /><FinalCta /><ContactSection /></main><Footer /></>
  );
}
