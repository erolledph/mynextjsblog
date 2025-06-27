import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Story Not Found</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The story you&apos;re looking for doesn&apos;t exist or may have been removed. 
              Discover other great stories on our homepage.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/" 
              className="btn-primary inline-block px-6 py-3"
            >
              Browse All Stories
            </Link>
            <div>
              <Link 
                href="/about" 
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                About our blog
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}