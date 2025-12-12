import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent } from '../hooks/useContent'
import SocialIcons from './SocialIcons'
import { Send, CheckCircle } from 'lucide-react'

/**
 * Contact Section Component
 * 
 * Provides a contact form and displays social links.
 * The form can be connected to services like Formspree, Netlify Forms, etc.
 * 
 * Content Structure:
 * - /posts/contact/main.md: Contact section text
 * - /posts/contact/social.md: Social media links
 * 
 * The contact information markdown file should have:
 * ---
 * title: Contact Title
 * subtitle: Subtitle
 * email: your@email.com
 * formEndpoint: https://formspree.io/f/xxxxx (optional)
 * ---
 * Additional text content for the contact section.
 */
function Contact() {
  const { t, i18n } = useTranslation()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  // Load contact content based on language
  const lang = i18n.language
  const { content: contactContent } = useContent('contact', `main-${lang}`)
  const { content: fallbackContent } = useContent('contact', 'main-pt')
  
  const content = contactContent || fallbackContent

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // If a form endpoint is configured, submit to it
      const endpoint = content?.formEndpoint || 'https://formspree.io/f/YOUR_FORM_ID'
      
      // For demo purposes, just simulate a successful submission
      // Replace with actual form submission logic
      if (endpoint.includes('YOUR_FORM_ID')) {
        // Simulate submission for demo
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSubmitted(true)
        setFormState({ name: '', email: '', message: '' })
      } else {
        // Real form submission
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formState)
        })

        if (response.ok) {
          setIsSubmitted(true)
          setFormState({ name: '', email: '', message: '' })
        } else {
          throw new Error('Form submission failed')
        }
      }
    } catch (err) {
      setError('Houve um erro ao enviar. Tente novamente.')
      console.error('Form submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form after successful submission
  const resetForm = () => {
    setIsSubmitted(false)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <div className="contact-container">
          {/* Left Side - Text and Social Links */}
          <div className="contact-left">
            <h2>{content?.title || t('contact.title')}</h2>
            <p className="contact-subtitle">{t('contact.explore')}</p>
            
            <div className="about-separator"></div>
            
            <p className="contact-text">
              {content?.body || t('contact.subtitle')}
            </p>

            {/* Social Links */}
            <div className="contact-socials">
              <SocialIcons variant="dark" />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form">
            {isSubmitted ? (
              // Success Message
              <div 
                style={{
                  textAlign: 'center',
                  padding: '3rem 2rem'
                }}
              >
                <CheckCircle 
                  size={60} 
                  color="#041145" 
                  style={{ marginBottom: '1rem' }}
                />
                <h3 style={{ marginBottom: '1rem', color: '#041145' }}>
                  {i18n.language === 'pt' ? 'Mensagem Enviada!' : 'Message Sent!'}
                </h3>
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                  {i18n.language === 'pt' 
                    ? 'Obrigado pelo contato. Responderei em breve!' 
                    : 'Thank you for reaching out. I\'ll respond soon!'}
                </p>
                <button 
                  onClick={resetForm}
                  className="submit-btn"
                  style={{ width: 'auto', padding: '0.75rem 2rem' }}
                >
                  {i18n.language === 'pt' ? 'Enviar outra mensagem' : 'Send another message'}
                </button>
              </div>
            ) : (
              // Contact Form
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t('contact.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder={t('contact.namePlaceholder')}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('contact.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p style={{ 
                    color: '#e53e3e', 
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div 
                        className="loading-spinner" 
                        style={{ 
                          width: '20px', 
                          height: '20px',
                          borderWidth: '2px' 
                        }}
                      />
                      {i18n.language === 'pt' ? 'Enviando...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t('contact.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
