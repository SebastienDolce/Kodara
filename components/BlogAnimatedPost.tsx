"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

const BlogAnimatedPost = ({
  post,
  index,
}: {
  post: PostMeta;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="border-l-8 border-red-600 pl-8 py-4"
  >
    <p className="text-gray-500 font-bold mb-2">{post.date}</p>
    <Link href={`/blog/${post.slug}`}>
      <h3 className="text-4xl font-black mb-2 hover:text-red-600 transition-colors">
        {post.title}
      </h3>
    </Link>
    <p className="text-gray-400">{post.excerpt}</p>
  </motion.div>
);

export default BlogAnimatedPost;
