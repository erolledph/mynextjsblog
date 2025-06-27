import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            About Our
            <span className="text-green-600"> Story</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We believe in the power of stories to inspire, educate, and connect people 
            across the globe. Our mission is to create a platform where ideas flourish 
            and knowledge is shared freely.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            
            <div className="prose-custom">
              <p>
                Modern Blog was born from a simple belief: everyone has a story worth telling, 
                and everyone deserves access to quality content that informs, inspires, and 
                empowers them to make better decisions.
              </p>
              
              <p>
                In a world overwhelmed by information, we curate and create content that cuts 
                through the noise. Our writers and contributors are passionate experts who 
                share their knowledge not for fame or fortune, but because they believe in 
                the transformative power of shared wisdom.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Built with modern web technologies for instant loading and seamless reading experience 
                across all devices.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                Every article is carefully reviewed and fact-checked to ensure accuracy and value 
                for our readers.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Our content is shaped by our community&apos;s interests and feedback, ensuring 
                relevance and engagement.
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-600">
                Accessible worldwide with content that resonates across cultures and 
                backgrounds, fostering global understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built for the Future</h2>
            
            <div className="prose-custom">
              <p>
                Our platform leverages cutting-edge technology to deliver an exceptional 
                reading experience. Built with Next.js 13+ and powered by Incremental 
                Static Regeneration (ISR), we ensure lightning-fast load times while 
                keeping content fresh and up-to-date.
              </p>
              
              <h3>Key Technologies</h3>
              <ul>
                <li><strong>Next.js 13+</strong> - For optimal performance and SEO</li>
                <li><strong>TypeScript</strong> - Ensuring code reliability and maintainability</li>
                <li><strong>Tailwind CSS</strong> - For beautiful, responsive design</li>
                <li><strong>Incremental Static Regeneration</strong> - Automatic content updates</li>
                <li><strong>Markdown Support</strong> - Rich content formatting capabilities</li>
              </ul>
              
              <p>
                This technical foundation allows us to focus on what matters most: 
                creating and curating exceptional content for our readers.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of a growing community of readers and writers who believe in 
              the power of shared knowledge and meaningful conversations.
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
        </section>
      </main>

      <Footer />
    </div>
  );
}