import { BlogPost } from './types';

const API_URL = 'https://blogform.netlify.app/api/content.json';

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    console.log('🔄 Fetching posts from:', API_URL);
    
    const response = await fetch(API_URL, {
      // Use Next.js revalidation instead of no-store for ISR
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Modern-Blog-NextJS/1.0',
      }
    });
    
    console.log('📡 API Response status:', response.status);
    console.log('📡 API Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      console.error(`❌ API request failed with status: ${response.status}`);
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      return [];
    }
    
    const data = await response.json();
    console.log('📊 Raw API data type:', typeof data);
    console.log('📊 Raw API data length:', Array.isArray(data) ? data.length : 'Not an array');
    
    // Log first item to understand structure
    if (Array.isArray(data) && data.length > 0) {
      console.log('📄 First post sample:', {
        id: data[0].id,
        title: data[0].title,
        slug: data[0].slug,
        status: data[0].status,
        author: data[0].author
      });
    }
    
    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.warn('⚠️ API response is not an array:', typeof data);
      return [];
    }
    
    // Filter published posts
    const publishedPosts = data.filter((post: BlogPost) => {
      const isPublished = post.status === 'published';
      if (!isPublished) {
        console.log(`⏭️ Skipping unpublished post: ${post.title} (status: ${post.status})`);
      }
      return isPublished;
    });
    
    console.log('✅ Total posts from API:', data.length);
    console.log('✅ Published posts:', publishedPosts.length);
    
    // Sort by publish date (newest first)
    publishedPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    
    return publishedPosts;
  } catch (error) {
    console.error('💥 Error fetching posts:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log('🔍 Fetching post by slug:', slug);
    
    const response = await fetch(API_URL, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Modern-Blog-NextJS/1.0',
      }
    });
    
    if (!response.ok) {
      console.error(`❌ API request failed with status: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn('⚠️ API response is not an array:', typeof data);
      return null;
    }
    
    const post = data.find((item: BlogPost) => 
      item.slug === slug && item.status === 'published'
    );
    
    console.log('🎯 Found post:', post ? `"${post.title}" by ${post.author}` : 'Not found');
    
    return post || null;
  } catch (error) {
    console.error('💥 Error fetching post by slug:', error);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    console.log('📝 Fetching all slugs...');
    const posts = await fetchAllPosts();
    const slugs = posts.map(post => post.slug);
    console.log('📝 Found slugs:', slugs.length, slugs.slice(0, 5));
    return slugs;
  } catch (error) {
    console.error('💥 Error fetching slugs:', error);
    return [];
  }
}