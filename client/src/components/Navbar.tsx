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
      setScrolled(window.scrollY > 20);
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
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled ? "bg-background/80 backdrop-blur-md border-border py-3 shadow-sm" : "bg-transparent border-transparent py-6"
    )}>
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-2xl font-display font-bold tracking-tighter text-foreground hover:text-primary transition-colors cursor-pointer">
          Gustavo Santos — Portfolio<span className="text-primary">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-sans font-medium hover:text-primary transition-colors relative group text-sm uppercase tracking-wider"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-6 bg-border"></div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border font-bold text-xs uppercase hover:bg-primary hover:border-primary hover:text-white transition-all"
            title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          >
            <Globe size={14} />
            {language === 'pt' ? 'EN' : 'PT'}
          </button>

          {/* Download CV Button */}
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-bold text-xs uppercase hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            <Download size={14} />
            {t.downloadCV}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-left font-display font-bold uppercase text-2xl py-2 hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}

            <div className="border-t border-border pt-6 flex gap-4">
              {/* Language Toggle Mobile */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border font-bold text-sm uppercase hover:bg-muted transition-all"
              >
                <Globe size={18} />
                {language === 'pt' ? 'EN' : 'PT'}
              </button>

              {/* Download CV Mobile */}
              <button
                onClick={handleDownloadCV}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold text-sm uppercase hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <Download size={18} />
                {t.downloadCV}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
