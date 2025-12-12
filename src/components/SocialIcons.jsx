import { Github, Linkedin, Mail, Twitter, Instagram, Youtube } from 'lucide-react'
import { useContent } from '../hooks/useContent'

/**
 * Social Icons Component
 * 
 * A reusable component that displays social media icons.
 * The social links are loaded from the markdown content system,
 * making it easy to update links without touching the code.
 * 
 * Variants:
 * - 'light': For use on dark backgrounds (white icons)
 * - 'dark': For use on light backgrounds (dark icons)
 * 
 * The icons and their links are configured in posts/contact/social.md
 */
function SocialIcons({ variant = 'light' }) {
  // Load social links from the content system
  const { content: socialData } = useContent('contact', 'social')

  // Default social links if no content file exists
  const defaultSocials = {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:email@example.com',
    twitter: '',
    instagram: '',
    youtube: ''
  }

  const socials = socialData?.links || defaultSocials

  // Icon configuration with their respective components
  const socialIcons = [
    { 
      id: 'github', 
      Icon: Github, 
      url: socials.github,
      label: 'GitHub'
    },
    { 
      id: 'linkedin', 
      Icon: Linkedin, 
      url: socials.linkedin,
      label: 'LinkedIn'
    },
    { 
      id: 'email', 
      Icon: Mail, 
      url: socials.email,
      label: 'Email'
    },
    { 
      id: 'twitter', 
      Icon: Twitter, 
      url: socials.twitter,
      label: 'Twitter/X'
    },
    { 
      id: 'instagram', 
      Icon: Instagram, 
      url: socials.instagram,
      label: 'Instagram'
    },
    { 
      id: 'youtube', 
      Icon: Youtube, 
      url: socials.youtube,
      label: 'YouTube'
    }
  ]

  // Filter out empty links
  const activeSocials = socialIcons.filter(social => social.url)

  return (
    <div className={`social-icons ${variant}`}>
      {activeSocials.map(({ id, Icon, url, label }) => (
        <a
          key={id}
          href={url}
          target={url.startsWith('mailto:') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="social-icon"
          aria-label={label}
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  )
}

export default SocialIcons
