// app/blog/[slug]/page.tsx

import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default function BlogPost({ params }: Props) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <div className="bg-black text-white min-h-screen font-mono p-12 pt-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-6xl font-black border-b-8 border-red-600 inline-block mb-8">
          {data.title}
        </h1>
        <p className="text-gray-500 font-bold mb-8">{String(data.date)}</p>
       <article className="prose prose-invert max-w-none text-gray-300">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
      h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
      h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-6 mb-2" {...props} />,
      p: ({ node, ...props }) => <p className="mb-4" {...props} />,
      ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
      ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
      a: ({ node, ...props }) => <a className="text-red-600 underline" {...props} />,
    }}
  >
    {content}
  </ReactMarkdown>
</article>

      </div>
    </div>
  );
}
