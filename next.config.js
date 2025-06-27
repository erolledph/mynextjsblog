/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for Cloudflare Pages
    domains: ['images.pexels.com', 'nextjsblog123.netlify.app'], // Add external image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextjsblog123.netlify.app',
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
  // Enable ISR by NOT using static export
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Ensure proper headers for API requests
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  experimental: {
    // Enable ISR features
    isrMemoryCacheSize: 0, // Disable memory cache to always fetch fresh data
  },
};

module.exports = nextConfig;