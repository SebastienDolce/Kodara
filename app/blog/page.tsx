// app/blog/page.tsx

import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogAnimatedHeader from "@/components/BlogAnimatedHeader";
import BlogAnimatedPost from "@/components/BlogAnimatedPost";

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

const getBlogPosts = (): PostMeta[] => {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content, excerpt } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title,
      date: String(data.date),
      excerpt: data.excerpt,
      content: content.slice(0, 150) + "...",
    };
  });
};

const BlogPage = () => {
  const blogPosts = getBlogPosts();

  return (
    <div className="bg-black text-white min-h-screen font-mono p-12 pt-24">
       <div className="max-w-7xl mx-auto px-6"> 
      <BlogAnimatedHeader />

      <div className="space-y-12">
        {blogPosts.map((post, index) => (
          <BlogAnimatedPost key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default BlogPage;
