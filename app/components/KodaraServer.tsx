// app/components/KodaraServer.tsx
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import KodaraClient from "./KodaraClient"; // import the client component

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
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title,
      excerpt: data.excerpt || content.slice(0, 150),
      date: String(data.date),
      content: content.slice(0, 150) + "...",
    };
  });
};

const KodaraServer = () => {
  const blogPosts = getBlogPosts();

  return <KodaraClient blogPosts={blogPosts} />;
};

export default KodaraServer;
