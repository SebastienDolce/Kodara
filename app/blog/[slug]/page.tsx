import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { slug: string };
}

export default function BlogPost({ params }: Props) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound(); // 404 if post not found
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <div className="bg-black text-white min-h-screen font-mono p-12 pt-24">
      <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-6xl font-black border-b-8 border-red-600 inline-block mb-8">
        {data.title}
      </h1>
      <p className="text-gray-500 font-bold mb-8">{String(data.date)}</p>
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
    </div>
  );
}
