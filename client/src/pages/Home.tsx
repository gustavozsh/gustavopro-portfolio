import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePosts } from '@/hooks/use-posts';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaUsers, FaWhatsapp, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaImages } from 'react-icons/fa';
import { SiGooglechrome } from 'react-icons/si';
import { Streamdown } from 'streamdown';

export default function Home() {
  const { posts: aboutPosts } = usePosts('about');
  const { posts: skillsPosts } = usePosts('skills');
  const { posts: projectPosts } = usePosts('projects');
  const { posts: eventPosts } = usePosts('events');
  const { t } = useLanguage();
  
  const aboutContent = aboutPosts[0];
  const skillsContent = skillsPosts[0];

  // Helper function to format date as "Month Year" based on language
  function formatEventDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    return `${t.months[monthIndex]} ${year}`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex flex-col md:flex-row pt-20 md:pt-0">
        {/* Left Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 z-10 bg-background">
          <div className="space-y-6 animate-in slide-in-from-left duration-700 fade-in">
            <h2 className="text-xl md:text-2xl font-mono text-muted-foreground">{t.hello}</h2>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none">
              GUSTAVO<br />
              <span className="text-outline-black dark:text-outline-white text-transparent stroke-2">SANTOS</span>
            </h1>
            <h3 className="text-2xl md:text-3xl font-display text-accent bg-black inline-block px-4 py-1 transform -skew-x-6">
              {t.role}
            </h3>
            
            <p className="text-lg text-muted-foreground max-w-md py-4">
              {t.heroDescription}
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <a href="https://github.com/gustavozsh" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" title="GitHub">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/gustavribeiro/" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" title="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <a href="https://www.instagram.com/gustavribeiro/" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" title="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="https://gustavosantosio.com/" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" title="Blog">
                <SiGooglechrome size={24} />
              </a>
              <a href="https://gdg.community.dev/gdg-cloud-brasilia/" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" title="GDG Cloud Brasília">
                <FaUsers size={24} />
              </a>
              <a href="https://www.youtube.com/@GDGCLOUDBRASILIA" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-black dark:border-white hover:bg-accent hover:border-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" title="YouTube">
                <FaYoutube size={24} />
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
          <h2 className="section-title">{t.aboutTitle}</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg dark:prose-invert max-w-none font-sans">
              {aboutContent ? (
                <Streamdown>{aboutContent.content}</Streamdown>
              ) : (
                <p>{t.loadingAbout}</p>
              )}
              
              <div className="mt-8">
                <a href="#contact" className="btn-brutal">
                  {t.contactButton}
                </a>
              </div>
            </div>
            
            <div className="relative" id="skills">
              <div className="absolute -inset-4 border-2 border-black dark:border-white translate-x-4 translate-y-4 z-0"></div>
              <div className="relative z-10 bg-white dark:bg-black border-2 border-black dark:border-white p-8 shadow-xl">
                <h3 className="text-2xl font-display mb-6 border-b-2 border-accent pb-2 inline-block">{t.skillsTitle}</h3>
                
                {skillsContent ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none skills-content">
                    <Streamdown>{skillsContent.content}</Streamdown>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">{t.loadingSkills}</p>
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
          <h2 className="section-title">{t.projectsTitle}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectPosts.length > 0 ? (
              projectPosts.map((project, index) => (
                <div key={index} className="group relative border-2 border-black dark:border-white bg-card hover:-translate-y-2 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <div className="aspect-video overflow-hidden border-b-2 border-black dark:border-white relative">
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                      <span className="font-display font-bold text-2xl bg-black text-white px-4 py-2 transform -rotate-3">{t.viewProject}</span>
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
                      {t.viewCode} <FaArrowRight className="ml-2 text-xs" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>{t.noProjects}</p>
            )}
          </div>
        </div>
      </section>

      {/* Events Section - Cards with Google Photos Link */}
      <section id="events" className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/bg-texture.png)' }}></div>
        <div className="container relative z-10">
          <h2 className="section-title text-white after:bg-accent">{t.eventsTitle}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventPosts.length > 0 ? (
              eventPosts.map((event, index) => (
                <div 
                  key={index} 
                  className="group bg-gray-900 border-2 border-white/20 hover:border-accent transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={event.data.thumbnail || "/images/project-placeholder.png"} 
                      alt={event.data.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-accent text-black px-3 py-1 font-display font-bold text-sm">
                      {formatEventDate(event.data.date)}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {event.data.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-accent" /> 
                        {event.data.role}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-accent" /> 
                        {event.data.location}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                      {event.content.replace(/[#*_]/g, '').substring(0, 120)}...
                    </p>
                    
                    {/* Ver Álbum Button */}
                    <a 
                      href={event.data.albumUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent text-black px-4 py-2 font-bold text-sm hover:bg-white transition-colors"
                      onClick={(e) => {
                        if (!event.data.albumUrl || event.data.albumUrl === "https://photos.google.com/share/seu-album-aqui") {
                          e.preventDefault();
                          alert(t.albumNotConfigured);
                        }
                      }}
                    >
                      <FaImages /> {t.viewAlbum}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">{t.noEvents}</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-accent text-black">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-none text-center md:text-left">
                {t.contactTitle1}<br />{t.contactTitle2}<br />{t.contactTitle3}
              </h2>
              <p className="text-xl font-bold mb-8 max-w-md">
                {t.contactDescription}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-xl">
                    <FaWhatsapp />
                  </div>
                  <span className="font-mono font-bold text-lg">+55 11 98833-8155</span>
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
                  <label className="block font-bold uppercase mb-2 text-sm">{t.nameLabel}</label>
                  <input type="text" className="w-full bg-gray-100 border-2 border-black p-3 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" placeholder={t.namePlaceholder} />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-2 text-sm">{t.emailLabel}</label>
                  <input type="email" className="w-full bg-gray-100 border-2 border-black p-3 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" placeholder={t.emailPlaceholder} />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-2 text-sm">{t.messageLabel}</label>
                  <textarea rows={4} className="w-full bg-gray-100 border-2 border-black p-3 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" placeholder={t.messagePlaceholder}></textarea>
                </div>
                <button type="submit" className="w-full bg-black text-white font-display font-bold uppercase py-4 text-xl hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-black">
                  {t.sendButton}
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
