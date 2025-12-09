import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t border-border">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-display font-bold mb-2 tracking-tighter text-foreground">Gustavo Santos<span className="text-primary">.</span></h2>

        </div>

        <div className="flex gap-6">
          <a href="https://github.com/gustavozsh" target="_blank" rel="noopener noreferrer" className="text-2xl text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200" title="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/gustavribeiro/" target="_blank" rel="noopener noreferrer" className="text-2xl text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200" title="LinkedIn"><FaLinkedin /></a>
          <a href="https://www.instagram.com/gustavribeiro/" target="_blank" rel="noopener noreferrer" className="text-2xl text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200" title="Instagram"><FaInstagram /></a>
          <a href="https://www.youtube.com/@GDGCLOUDBRASILIA" target="_blank" rel="noopener noreferrer" className="text-2xl text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200" title="YouTube"><FaYoutube /></a>
        </div>

        <div className="text-center md:text-right text-muted-foreground text-sm font-sans">
          <p>&copy; {currentYear} {t.footerRights}</p>
        </div>
      </div>
    </footer>
  );
}
