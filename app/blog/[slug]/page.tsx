import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchPostBySlug, getAllSlugs } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Enable SSR with force-dynamic for individual blog posts
export const dynamic = 'force-dynamic';

// Generate static params for all blog posts (still useful for build optimization)
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  
  console.log('🏗️ Generating static params for slugs:', slugs.length);
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.metaDescription,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : [],
    },
  };
}

async function processMarkdown(markdown: string) {
  const processedContent = await remark()
    .use(html)
    .process(markdown);
  return processedContent.toString();
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  console.log('📄 Blog post page: Fetching post with slug:', params.slug);
  console.log('🔄 SSR: This post is server-rendered on every request');
  
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    console.log('❌ Post not found for slug:', params.slug);
    notFound();
  }

  console.log('✅ Post found:', post.title, 'by', post.author);

  const contentHtml = await processMarkdown(post.content);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Article */}
      <article className="pt-20">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 py-12">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to stories
          </Link>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category) => (
              <span key={category} className="tag">
                {category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-serif">
            {post.title}
          </h1>

          {/* Subtitle/Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.metaDescription}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-600 font-semibold text-lg">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <time dateTime={post.publishDate}>
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{Math.ceil(post.content.length / 1000)} min read</span>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImageUrl && (
          <div className="max-w-5xl mx-auto px-4 mb-12">
            <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-4 mb-16">
          <div 
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="max-w-3xl mx-auto px-4 mb-12">
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tagged in</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="max-w-3xl mx-auto px-4 mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-start">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                <span className="text-green-600 font-bold text-2xl">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Written by {post.author}
                </h3>
                <p className="text-gray-600 mb-4">
                  A passionate writer and developer sharing insights about technology, 
                  development, and the digital world. Follow for more stories and tutorials.
                </p>
                <button className="btn-secondary text-sm">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Enjoyed this story?
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to get more stories like this delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="btn-primary px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-3xl mx-auto px-4 mb-16">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              className="btn-secondary"
            >
              ← More stories
            </Link>
            <button className="btn-primary">
              Share story
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}