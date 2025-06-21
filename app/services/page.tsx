"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Image from "next/image";



const services = [
 {
  id: "web-design",
  title: "Custom Web & App Development",
  description: `
Brutalist aesthetics meet functional excellence.

![Mockup](https://picsum.photos/200/300)

We craft digital experiences that challenge conventions.
`
},
  {
    id: "technical-consulting",
    title: "Tech Strategy & Consulting",
    description: `
Strategic guidance for complex technical challenges.

**We help with:**
- Scaling systems  
- Architecting infrastructure  
- Choosing the right stack`
  },
  {
    id: "software-engineering",
    title: "MVPs & Prototypes",
    description: `
From rapid MVPs to battle-tested platforms, we build with clarity and precision.

> No bloated code. No fragile systems. Just resilient software made to last.
`
  }
];

const ServicesPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
const renderers = {
  img: ({ src = "", alt = "" }) => (
    <div className="relative w-full h-64 my-4">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain rounded-lg shadow"
      />
    </div>
  )
};

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const slug = hash.substring(1);
    const index = services.findIndex(
      (service) => slugify(service.title) === slug
    );
    if (index !== -1) {
      setActiveIndex(index);
    }

    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
}, []);



  return (
<div className="bg-black text-white min-h-screen font-mono pt-24">
  <div className="max-w-7xl mx-auto px-6">      <motion.h1
        className="text-6xl font-black border-b-8 border-red-600 inline-block mb-16"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        OUR SERVICES
      </motion.h1>

      <div className="grid md:grid-cols-[300px_1fr] gap-12">
        {/* Service List */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <button
              key={index}
onClick={() => {
  setActiveIndex(index);
  window.history.replaceState(null, "", `#${slugify(service.title)}`);
}}

              className={`w-full text-left px-6 py-4 border-2 ${
                activeIndex === index
                  ? "border-red-600 text-red-600"
                  : "border-white hover:border-red-600 hover:text-red-600"
              } transition-colors font-black text-xl`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Active Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="border-4 border-white p-8 prose prose-invert max-w-none"
          >
            <h2 className="text-4xl font-black mb-6">
              {services[activeIndex].title}
            </h2>
           <div className="prose prose-invert prose-img:rounded-lg max-w-none text-gray-400 text-lg leading-relaxed">
            
  <ReactMarkdown>
    {services[activeIndex].description}
  </ReactMarkdown>
</div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
};

export default ServicesPage;
