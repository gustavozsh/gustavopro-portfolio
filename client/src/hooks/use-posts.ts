import { useState, useEffect } from 'react';
import { parseFrontmatter } from '@/lib/frontmatter';

export interface Post {
  slug: string;
  content: string;
  data: {
    title?: string;
    section?: string;
    order?: number;
    image?: string;
    tags?: string[];
    link?: string;
    date?: string;
    role?: string;
    location?: string;
    thumbnail?: string;
    albumUrl?: string;
    [key: string]: any;
  };
}

export function usePosts(section?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // File paths organized by folder structure
        const files = [
          { path: 'about/about.md', section: 'about' },
          { path: 'skills/skills.md', section: 'skills' },
          { path: 'projects/project-1.md', section: 'projects' },
          { path: 'projects/project-2.md', section: 'projects' },
          { path: 'projects/project-3.md', section: 'projects' },
          { path: 'projects/project-4.md', section: 'projects' },
          { path: 'events/event-1.md', section: 'events' },
          { path: 'events/event-2.md', section: 'events' },
          { path: 'events/event-3.md', section: 'events' }
        ];

        const loadedPosts = await Promise.all(
          files.map(async (file) => {
            try {
              const response = await fetch(`/posts/${file.path}`);
              if (!response.ok) return null;
              const text = await response.text();
              const { data, content } = parseFrontmatter(text);
              return {
                slug: file.path.split('/').pop()?.replace('.md', '') || '',
                content,
                data
              };
            } catch {
              return null;
            }
          })
        );

        let filteredPosts = loadedPosts.filter((post): post is Post => post !== null);
        
        if (section) {
          filteredPosts = filteredPosts.filter(post => post.data.section === section);
        }

        // Sort by order if available
        filteredPosts.sort((a, b) => (a.data.order || 99) - (b.data.order || 99));

        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [section]);

  return { posts, loading };
}
