import Link from 'next/link';
import Image from 'next/image';
import { fetchAllPosts } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

export default async function Home() {
  console.log('🏠 Homepage: Starting to fetch posts...');
  const startTime = Date.now();
  
  const posts = await fetchAllPosts();
  
  const fetchTime = Date.now() - startTime;
  console.log(`🏠 Homepage: Fetched ${posts.length} posts in ${fetchTime}ms`);
  
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stories that
              <span className="text-green-600"> inspire</span> and
              <span className="text-blue-600"> inform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover insights, tutorials, and stories from our community of writers and thinkers.
              Join thousands of readers who trust us for quality content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-3">
                Start Reading
              </button>
              <button className="btn-secondary text-lg px-8 py-3">
                Subscribe to Newsletter
              </button>
            </div>
          </div>

          {/* API Status Debug - Remove in production */}
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800">
              <div className="font-semibold mb-2">🔍 API Debug Info:</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <strong>Total Posts:</strong> {posts.length}
                </div>
                <div>
                  <strong>Featured Post:</strong> {featuredPost ? '✅ Yes' : '❌ None'}
                </div>
                <div>
                  <strong>Recent Posts:</strong> {recentPosts.length}
                </div>
              </div>
              {featuredPost && (
                <div className="mt-2 p-2 bg-blue-100 rounded">
                  <strong>Featured:</strong> "{featuredPost.title}" by {featuredPost.author}
                </div>
              )}
              <div className="mt-2 text-xs text-blue-600">
                Check browser console for detailed API logs
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full">
                      {featuredPost.featuredImageUrl ? (
                        <Image
                          src={featuredPost.featuredImageUrl}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-100 to-blue-100">
                          <span className="text-gray-400">Featured Article</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.categories.slice(0, 2).map((category) => (
                        <span key={category} className="tag">
                          {category}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.metaDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium text-gray-700">{featuredPost.author}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={featuredPost.publishDate}>
                          {new Date(featuredPost.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                        <span className="mx-2">•</span>
                        <span>{Math.ceil(featuredPost.content.length / 1000)} min read</span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-block mt-6 text-green-600 hover:text-green-700 font-semibold transition-colors"
                    >
                      Read full story →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center p-12 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No featured content available</h3>
              <p className="text-gray-500">Content is being loaded from the API...</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Stories</h2>
              <p className="text-gray-600">Fresh perspectives and insights from our writers</p>
            </div>
            <Link 
              href="#" 
              className="text-green-600 hover:text-green-700 font-semibold transition-colors hidden md:block"
            >
              View all stories →
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading recent stories...</h3>
              <p className="text-gray-500">Content is being fetched from the API. Check the debug info above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post: BlogPost) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="bg-white rounded-xl overflow-hidden card-shadow hover-lift">
                      <div className="relative h-48 bg-gray-100">
                        {post.featuredImageUrl ? (
                          <Image
                            src={post.featuredImageUrl}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category) => (
                            <span key={category} className="tag text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-green-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                          {post.metaDescription}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700">{post.author}</span>
                            <span className="mx-2">•</span>
                            <time dateTime={post.publishDate}>
                              {new Date(post.publishDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                          <span>{Math.ceil(post.content.length / 1000)} min</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {recentPosts.length > 0 && (
            <div className="text-center mt-12">
              <Link 
                href="#" 
                className="btn-secondary inline-block md:hidden"
              >
                View all stories
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Never miss a story
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get our latest articles, insights, and updates delivered straight to your inbox.
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
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}