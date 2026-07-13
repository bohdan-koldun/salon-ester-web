import React from 'react';
import type { HeadFC } from 'gatsby';
import BlogArticle from '../../components/BlogArticle';
import BlogSeo from '../../components/BlogSeo';
import { blogPosts } from '../../lib/blog';

const post = blogPosts.find((p) => p.slug === 'rimski-shtory')!;

const Page: React.FC = () => <BlogArticle post={post} />;

export default Page;

export const Head: HeadFC = () => <BlogSeo post={post} />;
