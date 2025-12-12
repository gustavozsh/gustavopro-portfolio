import { useState, useEffect } from 'react'

/**
 * useContent Hook
 * 
 * A custom React hook for loading content from the markdown-based CMS.
 * This hook enables content management via simple markdown files,
 * allowing you to update website content without modifying React code.
 * 
 * How it works:
 * 1. Content is stored in the /posts folder as markdown files
 * 2. Each section (about, projects, events, contact) has its own subfolder
 * 3. Markdown files use frontmatter (YAML) for structured data
 * 4. The body of the markdown is available as the 'body' property
 * 
 * Example usage:
 *   const { content, isLoading, error } = useContent('about', 'hero')
 *   // This loads /posts/about/hero.md
 * 
 * @param {string} section - The section folder name (e.g., 'about', 'projects')
 * @param {string} filename - The markdown file name without extension
 * @returns {Object} { content, isLoading, error }
 */
export function useContent(section, filename) {
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Try to fetch the markdown file
        const response = await fetch(`/posts/${section}/${filename}.md`)
        
        if (!response.ok) {
          // File doesn't exist yet, return null (this is fine for initial setup)
          setContent(null)
          setIsLoading(false)
          return
        }

        const text = await response.text()
        
        // Parse the markdown frontmatter and body
        const parsed = parseMarkdown(text)
        setContent(parsed)
      } catch (err) {
        console.log(`Content file not found: ${section}/${filename}.md`)
        setError(err)
        setContent(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()
  }, [section, filename])

  return { content, isLoading, error }
}

/**
 * useContentList Hook
 * 
 * Loads multiple content files from a section folder.
 * Useful for loading all projects, events, etc.
 * 
 * Since we can't dynamically scan folders in the browser,
 * this hook expects an index.md file that lists all content files.
 * 
 * @param {string} section - The section folder name
 * @returns {Object} { items, isLoading, error }
 */
export function useContentList(section) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadContentList = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // First, try to load the index file that lists all content
        const indexResponse = await fetch(`/posts/${section}/index.json`)
        
        if (!indexResponse.ok) {
          setItems([])
          setIsLoading(false)
          return
        }

        const index = await indexResponse.json()
        
        // Load each content file listed in the index
        const loadedItems = await Promise.all(
          index.files.map(async (filename) => {
            try {
              const response = await fetch(`/posts/${section}/${filename}`)
              if (!response.ok) return null
              
              const text = await response.text()
              return parseMarkdown(text)
            } catch {
              return null
            }
          })
        )

        // Filter out any null entries (failed loads)
        setItems(loadedItems.filter(Boolean))
      } catch (err) {
        console.log(`Index file not found for section: ${section}`)
        setError(err)
        setItems([])
      } finally {
        setIsLoading(false)
      }
    }

    loadContentList()
  }, [section])

  return { items, isLoading, error }
}

/**
 * Parse Markdown with Frontmatter
 * 
 * Parses a markdown string that contains YAML frontmatter.
 * The frontmatter is delimited by '---' at the beginning of the file.
 * 
 * Example markdown file:
 * ---
 * title: My Project
 * date: 2024-01-15
 * thumbnail: /images/project.png
 * ---
 * This is the body content in **markdown**.
 * 
 * @param {string} text - The raw markdown text
 * @returns {Object} Parsed object with frontmatter fields and body
 */
function parseMarkdown(text) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = text.match(frontmatterRegex)

  if (!match) {
    // No frontmatter, return the whole text as body
    return { body: text.trim() }
  }

  const frontmatterText = match[1]
  const body = text.slice(match[0].length).trim()

  // Parse YAML-like frontmatter (simple key: value pairs)
  const frontmatter = {}
  const lines = frontmatterText.split('\n')
  
  let currentKey = null
  let isMultiline = false
  let multilineValue = []

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue

    // Check for new key-value pair
    const keyValueMatch = line.match(/^(\w+):\s*(.*)$/)
    
    if (keyValueMatch) {
      // Save previous multiline value if any
      if (currentKey && isMultiline) {
        frontmatter[currentKey] = multilineValue.join('\n').trim()
      }

      const [, key, value] = keyValueMatch
      currentKey = key

      // Check if value starts with | or > (YAML multiline indicator)
      if (value === '|' || value === '>') {
        isMultiline = true
        multilineValue = []
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Parse array syntax: [item1, item2, item3]
        try {
          frontmatter[key] = JSON.parse(value)
        } catch {
          frontmatter[key] = value.slice(1, -1).split(',').map(s => s.trim())
        }
        currentKey = null
        isMultiline = false
      } else {
        frontmatter[key] = value.trim()
        currentKey = null
        isMultiline = false
      }
    } else if (isMultiline && currentKey) {
      // Continue collecting multiline value
      multilineValue.push(line)
    }
  }

  // Handle final multiline value
  if (currentKey && isMultiline) {
    frontmatter[currentKey] = multilineValue.join('\n').trim()
  }

  return { ...frontmatter, body }
}

export default useContent
