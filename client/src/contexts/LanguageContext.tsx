import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  // Navbar
  about: string;
  projects: string;
  events: string;
  contact: string;
  downloadCV: string;
  
  // Hero
  hello: string;
  role: string;
  heroDescription: string;
  
  // About Section
  aboutTitle: string;
  contactButton: string;
  skillsTitle: string;
  loadingAbout: string;
  loadingSkills: string;
  
  // Projects Section
  projectsTitle: string;
  viewProject: string;
  viewCode: string;
  noProjects: string;
  
  // Events Section
  eventsTitle: string;
  viewAlbum: string;
  noEvents: string;
  albumNotConfigured: string;
  
  // Contact Section
  contactTitle1: string;
  contactTitle2: string;
  contactTitle3: string;
  contactDescription: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendButton: string;
  
  // Footer
  footerRights: string;
  
  // Months
  months: string[];
}

const translations: Record<Language, Translations> = {
  pt: {
    // Navbar
    about: 'Sobre',
    projects: 'Projetos',
    events: 'Eventos',
    contact: 'Contato',
    downloadCV: 'Baixar CV',
    
    // Hero
    hello: 'Olá, eu sou',
    role: 'Senior Data Engineer | Senior Cloud Engineer',
    heroDescription: 'Especialista em criar interfaces modernas, performáticas e acessíveis. Transformo ideias complexas em experiências digitais fluidas.',
    
    // About Section
    aboutTitle: 'SOBRE MIM',
    contactButton: 'Entre em contato',
    skillsTitle: 'SKILLS',
    loadingAbout: 'Carregando informações sobre mim...',
    loadingSkills: 'Carregando habilidades...',
    
    // Projects Section
    projectsTitle: 'PROJETOS',
    viewProject: 'VER PROJETO',
    viewCode: 'Ver Código',
    noProjects: 'Nenhum projeto encontrado.',
    
    // Events Section
    eventsTitle: 'EVENTOS',
    viewAlbum: 'Ver Álbum de Fotos',
    noEvents: 'Nenhum evento encontrado.',
    albumNotConfigured: 'Link do álbum ainda não configurado. Edite o arquivo event-X.md para adicionar o link do Google Fotos.',
    
    // Contact Section
    contactTitle1: 'VAMOS',
    contactTitle2: 'COLABORAR',
    contactTitle3: 'JUNTOS?',
    contactDescription: 'Se você tem uma ideia, vamos conversar.',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome',
    emailLabel: 'Email',
    emailPlaceholder: 'seu@email.com',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Conte sobre seu projeto...',
    sendButton: 'Enviar Mensagem',
    
    // Footer
    footerRights: 'Todos os direitos reservados.',
    
    // Months
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  },
  en: {
    // Navbar
    about: 'About',
    projects: 'Projects',
    events: 'Events',
    contact: 'Contact',
    downloadCV: 'Download CV',
    
    // Hero
    hello: "Hi, I'm",
    role: 'Senior Data Engineer | Senior Cloud Engineer',
    heroDescription: 'Specialist in creating modern, performant, and accessible interfaces. I transform complex ideas into fluid digital experiences.',
    
    // About Section
    aboutTitle: 'ABOUT ME',
    contactButton: 'Get in touch',
    skillsTitle: 'SKILLS',
    loadingAbout: 'Loading information...',
    loadingSkills: 'Loading skills...',
    
    // Projects Section
    projectsTitle: 'PROJECTS',
    viewProject: 'VIEW PROJECT',
    viewCode: 'View Code',
    noProjects: 'No projects found.',
    
    // Events Section
    eventsTitle: 'EVENTS',
    viewAlbum: 'View Photo Album',
    noEvents: 'No events found.',
    albumNotConfigured: 'Album link not configured yet. Edit the event-X.md file to add the Google Photos link.',
    
    // Contact Section
    contactTitle1: "LET'S",
    contactTitle2: 'COLLABORATE',
    contactTitle3: 'TOGETHER?',
    contactDescription: "If you have an idea, let's talk.",
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell me about your project...',
    sendButton: 'Send Message',
    
    // Footer
    footerRights: 'All rights reserved.',
    
    // Months
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
