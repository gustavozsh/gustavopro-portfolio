import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-accent">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-display font-bold mb-2">PORTFOLIO<span className="text-accent">.</span></h2>
          <p className="text-gray-400 max-w-xs">
            Criando experiências digitais memoráveis com código e design.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-2xl hover:text-accent transition-colors hover:-translate-y-1 transform duration-200"><FaGithub /></a>
          <a href="#" className="text-2xl hover:text-accent transition-colors hover:-translate-y-1 transform duration-200"><FaLinkedin /></a>
          <a href="#" className="text-2xl hover:text-accent transition-colors hover:-translate-y-1 transform duration-200"><FaTwitter /></a>
          <a href="#" className="text-2xl hover:text-accent transition-colors hover:-translate-y-1 transform duration-200"><FaInstagram /></a>
        </div>
        
        <div className="text-center md:text-right text-gray-500 text-sm font-mono">
          <p>&copy; {currentYear} Todos os direitos reservados.</p>
          <p>Design inspirado no Neo-Brutalismo.</p>
        </div>
      </div>
    </footer>
  );
}
