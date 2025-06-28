import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://mynextjsblog1.pages.dev'),
  title: 'Modern Blog - Insights & Stories',
  description: 'A modern blog featuring insights, tutorials, and stories on technology, development, and more.',
  keywords: ['blog', 'technology', 'development', 'insights', 'tutorials'],
  authors: [{ name: 'Modern Blog' }],
  openGraph: {
    title: 'Modern Blog - Insights & Stories',
    description: 'A modern blog featuring insights, tutorials, and stories on technology, development, and more.',
    type: 'website',
    locale: 'en_US',
    url: 'https://mynextjsblog1.pages.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog - Insights & Stories',
    description: 'A modern blog featuring insights, tutorials, and stories on technology, development, and more.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}