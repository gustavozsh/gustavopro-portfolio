import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePosts } from '@/hooks/use-posts';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaUsers, FaWhatsapp, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaImages } from 'react-icons/fa';
import { SiGooglechrome } from 'react-icons/si';
import { Streamdown } from 'streamdown';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

// ============================================================================
// CONTACT FORM - PLACEHOLDER IMPLEMENTATION
// ============================================================================
// NOTE: The contact form below validates user input but does NOT actually 
// send messages anywhere. Form submissions are logged to console only.
// This is a placeholder implementation pending backend integration.
// ============================================================================

// Validation Schema for Contact Form
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(500),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Home() {
  const { posts: aboutPosts } = usePosts('about');
  const { posts: skillsPosts } = usePosts('skills');
  const { posts: projectPosts } = usePosts('projects');
  const { posts: eventPosts } = usePosts('events');
  const { t } = useLanguage();

  const aboutContent = aboutPosts[0];
  const skillsContent = skillsPosts[0];

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  // PLACEHOLDER: This form submission is not yet connected to a backend API
  // TODO: Implement actual email/contact submission when backend is ready
  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call - this is a placeholder implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For now, just log to console (not sent anywhere)
    console.log("Form Data (not sent - placeholder implementation):", data);
    
    // Show success message (note: data is not actually sent)
    toast.success(t.messageSent || "Message sent successfully!");
    reset();
  };

  // Helper function to format date as "Month Year" based on language
  function formatEventDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    return `${t.months[monthIndex]} ${year}`;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section - Premium Modern Split */}
      <section className="relative min-h-screen flex flex-col md:flex-row pt-20 md:pt-0 overflow-hidden">
        {/* Background Gradient Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Left Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-mono text-primary font-bold tracking-wider">
              {t.hello}
            </motion.h2>

            <motion.div variants={itemVariants}>
              <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none text-foreground drop-shadow-sm">
                GUSTAVO<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative">
                  SANTOS
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-2 bg-primary/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-display text-foreground/80 flex items-center gap-4">
              <span className="w-12 h-1 bg-primary rounded-full"></span>
              {t.role}
            </motion.h3>

            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {t.heroDescription}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              {[
                { Icon: FaGithub, href: "https://github.com/gustavozsh", label: "GitHub" },
                { Icon: FaLinkedin, href: "https://www.linkedin.com/in/gustavribeiro/", label: "LinkedIn" },
                { Icon: FaInstagram, href: "https://www.instagram.com/gustavribeiro/", label: "Instagram" },
                { Icon: SiGooglechrome, href: "https://gustavosantosio.com/", label: "Blog" },
                { Icon: FaUsers, href: "https://gdg.community.dev/gdg-cloud-brasilia/", label: "GDG" },
                { Icon: FaYoutube, href: "https://www.youtube.com/@GDGCLOUDBRASILIA", label: "YouTube" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg hover:shadow-primary/30 border border-border"
                  title={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Image & Modern Background */}
        <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen flex items-end justify-center overflow-hidden bg-secondary/30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(30,41,59,0.04) 0px, rgba(30,41,59,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(30,41,59,0.04) 0px, rgba(30,41,59,0.04) 1px, transparent 1px, transparent 32px)",
              maskImage: "linear-gradient(to bottom, transparent, black)",
            }}
            // Dark mode override
            data-dark="true"
          />
          <style>
            {`
              [data-dark="true"]:is(.dark) {
                background-image:
                  repeating-linear-gradient(0deg, rgba(148,163,184,0.05) 0px, rgba(148,163,184,0.05) 1px, transparent 1px, transparent 32px),
                  repeating-linear-gradient(90deg, rgba(148,163,184,0.05) 0px, rgba(148,163,184,0.05) 1px, transparent 1px, transparent 32px);
              }
            `}
          </style>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl bottom-0 px-6"
          >
            {/* Abstract Shapes behind image */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

            <img
              src="/images/profile.jpeg"
              alt="Profile"
              className="w-full h-auto object-cover rounded-t-[3rem] shadow-2xl shadow-primary/20 relative z-20"
              style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-background">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t.aboutTitle}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none font-sans text-muted-foreground"
            >
              {aboutContent ? (
                <Streamdown>{aboutContent.content}</Streamdown>
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              )}

              <div className="mt-10">
                <a href="#contact" className="btn-primary no-underline text-white">
                  {t.contactButton}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500"></div>

              <h3 className="text-2xl font-display font-bold mb-8 text-foreground flex items-center gap-3">
                <span className="p-2 bg-primary/10 rounded-lg text-primary"><FaCode size={20} /></span>
                {t.skillsTitle}
              </h3>

              {skillsContent ? (
                <div className="prose prose-sm dark:prose-invert max-w-none skills-content">
                  <Streamdown>{skillsContent.content}</Streamdown>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-muted-foreground">{t.loadingSkills}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-secondary/50">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {t.projectsTitle}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectPosts.length > 0 ? (
              projectPosts.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-sm">
                      <span className="font-sans font-bold text-lg text-white px-6 py-3 rounded-full border-2 border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        {t.viewProject}
                      </span>
                    </div>
                    <img
                      src={project.data.image || "/images/project-placeholder.png"}
                      alt={project.data.title}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.data.tags?.map((tag: string) => (
                        <span key={tag} className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{project.data.title}</h3>
                    <div className="prose prose-sm dark:prose-invert mb-6 line-clamp-3 text-muted-foreground">
                      <Streamdown>{project.content}</Streamdown>
                    </div>
                    <a href={project.data.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors group/link">
                      {t.viewCode} <FaArrowRight className="ml-2 text-xs transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>{t.noProjects}</p>
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-foreground text-background relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-20 bg-[url('/images/bg-texture.png')] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-background from-background to-background/70">{t.eventsTitle}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventPosts.length > 0 ? (
              eventPosts.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={event.data.thumbnail || "/images/project-placeholder.png"}
                      alt={event.data.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg backdrop-blur-md">
                      {formatEventDate(event.data.date)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-2">
                      {event.data.title}
                    </h3>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-primary" />
                        {event.data.role}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-primary" />
                        {event.data.location}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                      {event.content.replace(/[#*_]/g, '').substring(0, 120)}...
                    </p>

                    <a
                      href={event.data.albumUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-sm hover:bg-primary hover:text-white transition-all duration-300"
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
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">{t.noEvents}</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section - With Form Validation */}
      <section id="contact" className="py-24 bg-muted/50 relative">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight text-foreground">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t.contactTitle1}<br />
                </span>
                {t.contactTitle2}<br />{t.contactTitle3}
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-md">
                {t.contactDescription}
              </p>

              <div className="space-y-6">
                <a href="https://wa.me/5511988338155" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-4 rounded-2xl bg-background border border-border hover:border-primary hover:shadow-lg transition-all group cursor-pointer">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-1">WhatsApp</div>
                    <span className="font-mono font-bold text-lg text-foreground group-hover:text-primary transition-colors">+55 11 98833-8155</span>
                  </div>
                </a>

                <a href="mailto:contato@gustavosantos.com" className="flex items-center gap-6 p-4 rounded-2xl bg-background border border-border hover:border-primary hover:shadow-lg transition-all group cursor-pointer">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="font-display">@</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-1">Email</div>
                    <span className="font-mono font-bold text-lg text-foreground group-hover:text-primary transition-colors">contato@gustavosantos.com</span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <div className="bg-card p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-primary/5 border border-border">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">{t.nameLabel}</label>
                    <input
                      {...register("name")}
                      type="text"
                      className={`w-full bg-secondary border-2 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-primary'} rounded-xl p-4 outline-none transition-all placeholder:text-muted-foreground/50`}
                      placeholder={t.namePlaceholder}
                    />
                    {errors.name && <p className="text-red-500 text-xs ml-1 font-medium">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">{t.emailLabel}</label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full bg-secondary border-2 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-primary'} rounded-xl p-4 outline-none transition-all placeholder:text-muted-foreground/50`}
                      placeholder={t.emailPlaceholder}
                    />
                    {errors.email && <p className="text-red-500 text-xs ml-1 font-medium">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">{t.messageLabel}</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className={`w-full bg-secondary border-2 ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-primary'} rounded-xl p-4 outline-none transition-all placeholder:text-muted-foreground/50 resize-none`}
                      placeholder={t.messagePlaceholder}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs ml-1 font-medium">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg py-4 mt-4 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <span className="animate-pulse">{t.sending}</span>
                      ) : (
                        <>
                          {t.sendButton} <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
