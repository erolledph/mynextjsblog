# Modern Blog - Next.js with ISR

A modern, responsive blog built with Next.js 13+ featuring Incremental Static Regeneration (ISR) for dynamic content updates without redeployment.

## 🚀 Features

- **Incremental Static Regeneration (ISR)**: Content updates automatically every 60 seconds without requiring redeployment
- **Dynamic Content**: Fetches content from external API with automatic caching and revalidation
- **SEO Optimized**: Full metadata support, Open Graph, and Twitter Cards
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance**: Optimized images, fonts, and static generation
- **Modern Stack**: Next.js 13+, TypeScript, Tailwind CSS

## 🏗️ Architecture

### ISR Implementation
- **Revalidation**: Pages revalidate every 60 seconds (`revalidate = 60`)
- **Static Generation**: Initial pages are pre-generated at build time
- **Background Updates**: Content updates happen in the background without affecting user experience
- **Cache Tags**: Granular cache control with Next.js cache tags

### Content Management
- **External API**: Fetches content from `https://blogform.netlify.app/api/content.json`
- **Dynamic Updates**: New posts appear automatically without redeployment
- **Status Filtering**: Only published posts are displayed
- **Markdown Support**: Rich content formatting with remark

## 🔧 Configuration

### ISR Settings
```typescript
// Enable ISR with 60-second revalidation
export const revalidate = 60;
export const dynamic = 'force-static';
export const dynamicParams = true;
```

### API Configuration
```typescript
const response = await fetch(API_URL, {
  next: { 
    revalidate: 60,
    tags: ['posts'] // Cache tags for granular control
  },
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  }
});
```

## 🚀 Deployment

### Cloudflare Pages
This project is optimized for Cloudflare Pages with Next.js Runtime:

1. **Build Configuration**: Uses Next.js native build (not static export)
2. **Runtime**: Cloudflare Pages Next.js Runtime with Node.js compatibility
3. **ISR Support**: Full ISR support with automatic revalidation

### Environment Variables
No additional environment variables required for basic functionality.

## 📁 Project Structure

```
├── app/
│   ├── blog/[slug]/          # Dynamic blog post pages
│   ├── about/                # About page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── Header.tsx            # Navigation header
│   └── Footer.tsx            # Site footer
├── lib/
│   ├── api.ts                # API functions with ISR
│   └── types.ts              # TypeScript types
└── public/
    ├── _headers              # Cloudflare Pages headers
    └── _redirects            # Cloudflare Pages redirects
```

## 🔄 How ISR Works

1. **Build Time**: Static pages are generated for all existing posts
2. **Runtime**: When a user visits a page:
   - If the page is fresh (< 60 seconds), serve cached version
   - If the page is stale (> 60 seconds), serve cached version and trigger background regeneration
   - Background process fetches latest data and regenerates the page
   - Next request gets the updated page

3. **New Content**: New posts automatically appear without redeployment:
   - API returns new posts
   - ISR generates new pages on-demand
   - Pages are cached for future requests

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Performance

- **First Load**: Pre-generated static pages for instant loading
- **Subsequent Loads**: Cached pages with background updates
- **SEO**: Full static generation for search engine optimization
- **Images**: Optimized with Next.js Image component

## 🔍 Monitoring

The application includes debug information (remove in production):
- API fetch status and timing
- ISR revalidation status
- Content update indicators

## 📝 Content API

Expected API response format:
```json
[
  {
    "id": "string",
    "title": "string",
    "slug": "string",
    "content": "string (markdown)",
    "featuredImageUrl": "string",
    "metaDescription": "string",
    "seoTitle": "string",
    "keywords": ["string"],
    "author": "string",
    "categories": ["string"],
    "tags": ["string"],
    "status": "published|draft",
    "publishDate": "ISO date string",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
]
```

## 🎯 Benefits of This Setup

1. **No Redeployment Needed**: Content updates automatically
2. **SEO Friendly**: Pages are statically generated
3. **Fast Performance**: Cached pages with background updates
4. **Scalable**: Handles traffic spikes with cached content
5. **Cost Effective**: Minimal server resources needed
6. **Developer Friendly**: Simple content management workflow