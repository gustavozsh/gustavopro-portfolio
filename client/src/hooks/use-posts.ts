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
    [key: string]: any;
  };
}

export function usePosts(section?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // In a real static site generation setup, we would list files at build time.
        // For this client-side implementation, we'll fetch a known list or manifest.
        // Since we can't list directory contents client-side without a server index,
        // we will fetch the specific files we created.
        
        const files = [
          'about.md',
          'skills.md',
          'project-1.md',
          'event-1.md'
        ];

        const loadedPosts = await Promise.all(
          files.map(async (file) => {
            const response = await fetch(`/posts/${file}`);
            const text = await response.text();
            const { data, content } = parseFrontmatter(text);
            return {
              slug: file.replace('.md', ''),
              content,
              data
            };
          })
        );

        let filteredPosts = loadedPosts;
        if (section) {
          filteredPosts = loadedPosts.filter(post => post.data.section === section);
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
