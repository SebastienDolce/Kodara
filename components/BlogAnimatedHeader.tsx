"use client";

import { motion } from "framer-motion";

const BlogAnimatedHeader = () => (
  <motion.h1
    className="text-6xl font-black border-b-8 border-red-600 inline-block mb-16"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    BLOG ARCHIVE
  </motion.h1>
);

export default BlogAnimatedHeader;
