export type ServiceIcon = 'web' | 'mobile' | 'automation' | 'mvp' | 'consulting' | 'maintenance';

export interface Service {
  id: string;
  number: string;
  icon: ServiceIcon;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
}

export const navigation = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Processo', href: '#processo' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export const problems = [
  'Processos manuais e repetitivos',
  'Informações espalhadas',
  'Falta de controle operacional',
  'Ideias que ainda não saíram do papel',
  'Ferramentas que não acompanham o crescimento',
];

export const transformations = [
  'Mais automação',
  'Mais organização',
  'Mais agilidade',
  'Mais controle',
  'Soluções preparadas para evoluir',
];

export const services: Service[] = [
  {
    id: 'sistemas-web', number: '01', icon: 'web', title: 'Sistemas web',
    summary: 'Operações organizadas em um sistema feito para o seu negócio.',
    problem: 'Dados e tarefas distribuídos entre planilhas e ferramentas desconectadas.',
    solution: 'Um sistema acessível pelo navegador, personalizado para centralizar informações e facilitar a gestão.',
    result: 'Operação mais organizada, acessível e preparada para evoluir.',
  },
  {
    id: 'aplicativos', number: '02', icon: 'mobile', title: 'Aplicativos',
    summary: 'Experiências mobile rápidas para equipes, empresas e clientes.',
    problem: 'Jornadas que precisam acontecer com mobilidade, rapidez e simplicidade.',
    solution: 'Aplicações mobile intuitivas e responsivas, pensadas para o contexto real de uso.',
    result: 'Mais proximidade e uma experiência consistente em qualquer lugar.',
  },
  {
    id: 'automacoes', number: '03', icon: 'automation', title: 'Automações',
    summary: 'Fluxos integrados para deixar o trabalho repetitivo com a tecnologia.',
    problem: 'Tempo perdido em tarefas repetitivas, retrabalho e transferência manual de dados.',
    solution: 'Automações e integrações que conectam etapas e executam rotinas com consistência.',
    result: 'Menos esforço manual, menos erros e mais tempo para decisões importantes.',
  },
  {
    id: 'mvps', number: '04', icon: 'mvp', title: 'MVPs',
    summary: 'Uma primeira versão funcional para aprender com o mercado.',
    problem: 'Uma boa ideia ainda sem clareza sobre escopo, prioridade e viabilidade.',
    solution: 'Uma versão inicial funcional, focada no essencial para validar a proposta.',
    result: 'Aprendizado real antes de investimentos maiores.',
  },
  {
    id: 'consultoria', number: '05', icon: 'consulting', title: 'Consultoria em tecnologia',
    summary: 'Clareza técnica para escolher o caminho certo.',
    problem: 'Dúvidas sobre solução, arquitetura, prioridades ou próximos passos.',
    solution: 'Análise do cenário e orientação técnica antes ou durante o desenvolvimento.',
    result: 'Decisões mais conscientes e um caminho viável para executar.',
  },
  {
    id: 'manutencao-evolucao', number: '06', icon: 'maintenance', title: 'Manutenção e evolução',
    summary: 'Melhorias contínuas e ajustes estruturais para software já existente.',
    problem: 'Sistemas lentos, desatualizados ou com falhas que travam a operação.',
    solution: 'Diagnóstico, correção de falhas e implementação de novas funcionalidades com segurança.',
    result: 'Software estável, atualizado e pronto para continuar crescendo.',
  },
];

export const benefits = [
  { title: 'Menos processos manuais', text: 'Automatize o que consome tempo sem precisar consumir atenção.' },
  { title: 'Informações centralizadas', text: 'Encontre o que precisa em um fluxo claro e confiável.' },
  { title: 'Mais controle', text: 'Acompanhe a operação com dados organizados e decisões visíveis.' },
  { title: 'Mais velocidade', text: 'Reduza etapas e torne o trabalho cotidiano mais simples.' },
  { title: 'Tecnologia que cresce', text: 'Construa uma base preparada para novas necessidades.' },
  { title: 'Solução sob medida', text: 'A tecnologia se adapta à realidade do negócio — não o contrário.' },
];

export const processSteps = [
  { number: '01', title: 'Entendemos', text: 'Conhecemos a ideia, o problema e o objetivo.' },
  { number: '02', title: 'Planejamos', text: 'Definimos escopo, prioridades e caminho técnico.' },
  { number: '03', title: 'Desenvolvemos', text: 'Construímos e validamos em etapas, com clareza.' },
  { number: '04', title: 'Evoluímos', text: 'Acompanhamos resultados e novas necessidades.' },
];

export const solutionTypes = [
  'Sistemas web', 'Aplicativos', 'Automações', 'MVP', 'Consultoria em tecnologia', 'Manutenção e evolução', 'Ainda não sei',
];

export interface Project {
  title: string;
  context: string;
  problem: string;
  solution: string;
  technologies: string[];
  result: string;
}

// Adicione aqui apenas projetos com informações e resultados confirmados.
export const projects: Project[] = [];
