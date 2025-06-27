export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImageUrl: string;
  metaDescription: string;
  seoTitle: string;
  keywords: string[];
  author: string;
  categories: string[];
  tags: string[];
  status: string;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}