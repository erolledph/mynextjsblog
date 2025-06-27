/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for Cloudflare Pages
    domains: ['images.pexels.com', 'blogform.netlify.app'], // Add external image domains
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
  // For Cloudflare Pages deployment
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;