/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for Cloudflare Pages
  experimental: {
    runtime: 'nodejs',
  },
  
  images: {
    unoptimized: true, // Required for Cloudflare Pages
    domains: ['images.pexels.com', 'blogform.netlify.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogform.netlify.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  
  // Ensure ISR is enabled (DO NOT use output: 'export')
  // ISR requires server-side rendering capabilities
  
  // Optimize for Cloudflare Pages
  poweredByHeader: false,
  generateEtags: false,
  
  // Ensure proper routing
  trailingSlash: false,
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;