/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.pexels.com', 'nextjsblog123.netlify.app'], // Add external image domains
  },
  // Enable static exports for Cloudflare Workers
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Disable SWC minification to avoid potential issues
  swcMinify: false,
  // Ensure proper asset prefix for static export
  assetPrefix: '',
  // Remove deprecated experimental.appDir option
  experimental: {
    // App router is now stable, no need for experimental flag
  },
};

module.exports = nextConfig;