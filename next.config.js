/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Add standalone output for better Cloudflare Pages compatibility
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
  // Removed static export configuration to enable ISR
  // output: 'export', // REMOVED - This was preventing ISR from working
  // trailingSlash: true, // REMOVED - Not needed for ISR
  // skipTrailingSlashRedirect: true, // REMOVED - Not needed for ISR
};

module.exports = nextConfig;
