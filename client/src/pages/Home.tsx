import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePosts, Post } from '@/hooks/use-posts';
import { FaGithub, FaLinkedin, FaWhatsapp, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Streamdown } from 'streamdown';

export default function Home() {
  const { posts: aboutPosts } = usePosts('about');
  const { posts: skillsPosts } = usePosts('skills');
  const { posts: projectPosts } = usePosts('projects');
  const { posts: eventPosts } = usePosts('events');
  
  const aboutContent = aboutPosts[0];
  const skillsContent = skillsPosts[0];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex flex-col md:flex-row pt-20 md:pt-0">
        {/* Left Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 z-10 bg-background">
          <div className="space-y-6 animate-in slide-in-from-left duration-700 fade-in">
            <h2 className="text-xl md:text-2xl font-mono text-muted-foreground">Olá, eu sou</h2>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none">
              GUSTAVO<br />
              <span className="text-outline-black dark:text-outline-white text-transparent stroke-2">SANTOS</span>
            </h1>
            <h3 className="text-2xl md:text-3xl font-display text-accent bg-black inline-block px-4 py-1 transform -skew-x-6">
              Senior Data Engineer | Senior Cloud Engineer
            </h3>
            
            <p className="text-lg text-muted-foreground max-w-md py-4">
              Especialista em criar interfaces modernas, performáticas e acessíveis. Transformo ideias complexas em experiências digitais fluidas.
            </p>
            
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <FaGithub size={24} />
              </a>
              <a href="#" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Side - Image & Diagonal Background */}
        <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen bg-black flex items-end justify-center overflow-hidden">
          {/* Diagonal Cut */}
          <div className="absolute top-0 left-0 w-full h-full bg-background md:hidden z-0"></div>
          <div className="absolute top-0 -left-24 w-[150%] h-full bg-black transform -skew-x-12 z-0 hidden md:block origin-bottom-left"></div>
          
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-20 z-0 pointer-events-none" style={{ backgroundImage: 'url(/images/bg-texture.png)' }}></div>
          
          {/* Profile Image */}
          <div className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl bottom-0 animate-in slide-in-from-bottom duration-1000 fade-in">
            <img 
              src="/images/profile.jpeg" 
              alt="Profile" 
              className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 mask-image-gradient"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary relative overflow-hidden">
        <div className="container relative z-10">
          <h2 className="section-title">SOBRE MIM</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg dark:prose-invert max-w-none font-sans">
              {aboutContent ? (
                <Streamdown>{aboutContent.content}</Streamdown>
              ) : (
                <p>Carregando informações sobre mim...</p>
              )}
              
              <div className="mt-8">
                <a href="#contact" className="btn-brutal">
                  Entre em contato
                </a>
              </div>
            </div>
            
            <div className="relative" id="skills">
              <div className="absolute -inset-4 border-2 border-black dark:border-white translate-x-4 translate-y-4 z-0"></div>
              <div className="relative z-10 bg-white dark:bg-black border-2 border-black dark:border-white p-8 shadow-xl">
                <h3 className="text-2xl font-display mb-6 border-b-2 border-accent pb-2 inline-block">SKILLS</h3>
                
                {skillsContent ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none skills-content">
                    <Streamdown>{skillsContent.content}</Streamdown>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">Carregando habilidades...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-background">
        <div className="container">
          <h2 className="section-title">PROJETOS</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectPosts.length > 0 ? (
              projectPosts.map((project, index) => (
                <div key={index} className="group relative border-2 border-black dark:border-white bg-card hover:-translate-y-2 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <div className="aspect-video overflow-hidden border-b-2 border-black dark:border-white relative">
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                      <span className="font-display font-bold text-2xl bg-black text-white px-4 py-2 transform -rotate-3">VER PROJETO</span>
                    </div>
                    <img 
                      src={project.data.image || "/images/project-placeholder.png"} 
                      alt={project.data.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.data.tags?.map((tag: string) => (
                        <span key={tag} className="text-xs font-bold uppercase tracking-wider text-accent bg-black px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2">{project.data.title}</h3>
                    <div className="prose prose-sm dark:prose-invert mb-4 line-clamp-3">
                      <Streamdown>{project.content}</Streamdown>
                    </div>
                    <a href={project.data.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-bold hover:text-accent transition-colors group-hover:underline decoration-2 underline-offset-4">
                      View Code <FaArrowRight className="ml-2 text-xs" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum projeto encontrado.</p>
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/bg-texture.png)' }}></div>
        <div className="container relative z-10">
          <h2 className="section-title text-white after:bg-accent">EVENTOS</h2>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {eventPosts.length > 0 ? (
              eventPosts.map((event, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 border-l-4 border-accent pl-6 md:pl-0 md:border-l-0 md:border-b-2 md:border-white/20 md:pb-8 group hover:border-accent transition-colors">
                  <div className="md:w-1/4 flex flex-col md:items-end md:pr-8 md:border-r-2 md:border-white/20 md:group-hover:border-accent transition-colors">
                    <span className="text-4xl font-display font-bold text-accent">{event.data.date?.split('-')[2]}</span>
                    <span className="text-xl font-bold uppercase">{new Date(event.data.date || '').toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-muted-foreground">{event.data.date?.split('-')[0]}</span>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors">{event.data.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-400 mb-4">
                      <span className="flex items-center"><FaCalendarAlt className="mr-2" /> {event.data.role}</span>
                      <span className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {event.data.location}</span>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <Streamdown>{event.content}</Streamdown>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum evento encontrado.</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-accent text-black">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-none">
                VAMOS<br />TRABALHAR<br />JUNTOS?
              </h2>
              <p className="text-xl font-bold mb-8 max-w-md">
                Tenho interesse em oportunidades freelance e projetos ambiciosos. Se você tem uma ideia, vamos conversar.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-xl">
                    <FaWhatsapp />
                  </div>
                  <span className="font-mono font-bold text-lg">+55 11 99999-9999</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-xl">
                    <span className="font-display">@</span>
                  </div>
                  <span className="font-mono font-bold text-lg">contato@gustavosantos.com</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
              <form className="space-y-6">
                <div>
                  <label className="block font-bold uppercase mb-2 text-sm">Nome</label>
                  <input type="text" className="w-full bg-gray-100 border-2 border-black p-3 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-2 text-sm">Email</label>
                  <input type="email" className="w-full bg-gray-100 border-2 border-black p-3 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-2 text-sm">Mensagem</label>
                  <textarea rows={4} className="w-full bg-gray-100 border-2 border-black p-3 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" placeholder="Conte sobre seu projeto..."></textarea>
                </div>
                <button type="submit" className="w-full bg-black text-white font-display font-bold uppercase py-4 text-xl hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-black">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
