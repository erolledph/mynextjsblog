import { BlogPost } from './types';

const API_URL = 'https://nextjsblog123.netlify.app/api/content.json';

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.warn(`API request failed with status: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    // Ensure data is an array and filter published posts
    if (!Array.isArray(data)) {
      console.warn('API response is not an array:', data);
      return [];
    }
    
    return data.filter((post: BlogPost) => post.status === 'published');
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return empty array instead of throwing to prevent build failures
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.warn(`API request failed with status: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.warn('API response is not an array:', data);
      return null;
    }
    
    const post = data.find((item: BlogPost) => 
      item.slug === slug && item.status === 'published'
    );
    
    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const posts = await fetchAllPosts();
    return posts.map(post => post.slug);
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}