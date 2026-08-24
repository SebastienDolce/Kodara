import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import KodaraClient from "./KodaraClient";

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

  return filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const parsedDate = new Date(data.date);

      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title,
        excerpt: data.excerpt || content.slice(0, 150),
        date: Number.isNaN(parsedDate.getTime())
          ? String(data.date)
          : parsedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            }),
        content: content.slice(0, 150) + "...",
        sortDate: Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime(),
      };
    })
    .sort((a, b) => b.sortDate - a.sortDate)
    .map(({ sortDate: _sortDate, ...post }) => post);
};

const KodaraServer = () => {
  const blogPosts = getBlogPosts();
  return <KodaraClient blogPosts={blogPosts} />;
};

export default KodaraServer;
