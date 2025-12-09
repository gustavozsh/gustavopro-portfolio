import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, Download, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

// Google Drive direct download link
const CV_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1otY4gIjSrCvTikk829AodUd0ooMKStdQ';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, href: '#about' },
    { name: t.projects, href: '#projects' },
    { name: t.events, href: '#events' },
    { name: t.contact, href: '#contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const handleDownloadCV = () => {
    window.open(CV_DOWNLOAD_URL, '_blank');
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b-2",
      scrolled ? "bg-background/95 backdrop-blur-sm border-black dark:border-white py-2" : "bg-transparent border-transparent py-6"
    )}>
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-2xl font-display font-bold tracking-tighter hover:text-accent transition-colors">
          Gustavo Santos — Portfolio<span className="text-accent">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-display font-bold uppercase tracking-wide hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent transition-all group-hover:w-full"></span>
            </button>
          ))}
          
          {/* Divider */}
          <div className="w-px h-6 bg-black/20 dark:bg-white/20"></div>
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-black dark:border-white font-bold text-sm uppercase hover:bg-accent hover:border-accent hover:text-black transition-all"
            title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          >
            <Globe size={16} />
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
          
          {/* Download CV Button */}
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-black font-bold text-sm uppercase hover:bg-black hover:text-accent border-2 border-accent hover:border-black transition-all"
          >
            <Download size={16} />
            {t.downloadCV}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b-2 border-black dark:border-white p-4 flex flex-col gap-4 md:hidden shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-left font-display font-bold uppercase text-xl py-2 hover:text-accent"
              >
                {link.name}
              </button>
            ))}
            
            <div className="border-t border-black/20 dark:border-white/20 pt-4 flex gap-4">
              {/* Language Toggle Mobile */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 border-2 border-black dark:border-white font-bold text-sm uppercase hover:bg-accent hover:border-accent hover:text-black transition-all"
              >
                <Globe size={16} />
                {language === 'pt' ? 'EN' : 'PT'}
              </button>
              
              {/* Download CV Mobile */}
              <button
                onClick={handleDownloadCV}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-black font-bold text-sm uppercase hover:bg-black hover:text-accent border-2 border-accent hover:border-black transition-all"
              >
                <Download size={16} />
                {t.downloadCV}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
