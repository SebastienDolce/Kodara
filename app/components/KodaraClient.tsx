// app/components/KodaraClient.tsx
"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";


interface PostMeta {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface Props {
  blogPosts: PostMeta[];
}

const KodaraClient: React.FC<Props> = ({ blogPosts }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const teamMembers = [
  {
    name: "Sebastien",
    role: "CEO",
    bio: "Visionary leader driving Kodara's strategic direction and growth.",
    image: "/images/sebastien.png", // or use a remote URL
  },
  {
    name: "Rob",
    role: "CTO",
    bio: "Technical mastermind architecting cutting-edge solutions.",
    image: "/images/rob.png",
  },
  {
    name: "Gabe",
    role: "CFO",
    bio: "Financial strategist ensuring sustainable growth and profitability.",
    image: "/images/gabe.png",
  },
];


  const services = [
  {
    title: "Custom Web & App Development",
    slug: "web-design",
    description: "We write the code so you don’t have to pretend you understand it.",
  },
  {
    title: "Tech Strategy & Consulting",
    slug: "technical-consulting",
    description: "We explain the tech stuff so clearly, your grandma could nod along.",
  },
  {
    title: "MVPs & Prototypes",
    slug: "software-engineering",
    description: "Your million-dollar idea deserves more than a napkin sketch.",
  },
];


  return (
    <div className="bg-black text-white min-h-screen font-mono overflow-x-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-red-600 border-t-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-red-600 opacity-20" />
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-white opacity-10" />
        </motion.div>

        <div className="text-center z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-8xl md:text-9xl font-black tracking-tighter mb-4"
          >
            BUILD
            <br />
            BREAK
            <br />
            <span className="text-red-600">BETTER</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="text-xl tracking-widest">
            SOFTWARE ENGINEERING REDEFINED
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={ref1} className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={inView1 ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-20 border-b-8 border-red-600 inline-block"
          >
            SERVICES
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
  <motion.div
    key={index}
    onClick={() => router.push(`/services#${service.slug}`)}
    className="cursor-pointer border-4 border-white p-8 hover:border-red-600 transition-colors"
  >
    <h3 className="text-4xl font-black mb-4">{service.title}</h3>
    <p className="text-gray-400 leading-relaxed">{service.description}</p>
  </motion.div>
))}

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" ref={ref2} className="min-h-screen py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ x: 100, opacity: 0 }}
            animate={inView2 ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-20 text-right"
          >
            THE
            <br />
            ARCHITECTS
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView2 ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <div className="bg-black text-white p-8 h-full">
  <div className="relative w-full h-48 mb-6">
    <Image
      src={member.image}
      alt={member.name}
      fill
      className="object-cover rounded-lg"
    />
  </div>
  <h3 className="text-3xl font-black mb-2">{member.name}</h3>
  <p className="text-red-600 font-bold mb-4">{member.role}</p>
  <p className="text-gray-400">{member.bio}</p>
</div>

                <motion.div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-red-600 -z-10" whileHover={{ x: 2, y: 2 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-7xl font-black mb-20 text-center">
            METEORIC
            <br />
            <span className="text-red-600">RISE</span>
          </motion.h2>

          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="border-l-8 border-red-600 pl-8 py-4"
              >
                <p className="text-gray-500 font-bold mb-2">{post.date}</p>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-4xl font-black mb-4 hover:text-red-600 transition-colors">{post.title}</h3>
                </Link>
                <p className="text-xl text-gray-400">{post.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={ref4} className="min-h-screen py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 initial={{ scale: 0.5, opacity: 0 }} animate={inView4 ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.8 }} className="text-7xl font-black mb-20">
            CONNECT
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={inView4 ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }}>
              <h3 className="text-4xl font-black mb-8">LET'S BUILD SOMETHING</h3>
              <p className="text-xl mb-8">Ready to break conventions? We're here to help.</p>
              <div className="space-y-4">
                <p className="text-xl font-bold">sdolce@kodara.dev</p>
                <p className="text-xl font-bold">+1 (555) 123-4567</p>
                <p className="text-xl font-bold">San Francisco, CA</p>
              </div>
            </motion.div>

            <motion.form
  name="contact"
  method="POST"
  action="/success"
  data-netlify="true"
  netlify-honeypot="bot-field"
  className="space-y-6"
  initial={{ x: 50, opacity: 0 }}
  animate={inView4 ? { x: 0, opacity: 1 } : {}}
  transition={{ duration: 0.8 }}
>
  {/* Netlify hidden fields */}
  <input type="hidden" name="form-name" value="contact" />
  <p className="hidden">
    <label>
      Don’t fill this out: <input name="bot-field" />
    </label>
  </p>

  {/* Full Name */}
  <input
    type="text"
    name="name"
    placeholder="FULL NAME"
    required
    className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold"
  />

  {/* Email */}
  <input
    type="email"
    name="email"
    placeholder="EMAIL"
    required
    className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold"
  />

  {/* Project Type */}
 <select
  name="project_type"
  className="w-full bg-red-600 border-b-4 border-white p-4 text-white font-bold appearance-none"
  defaultValue=""
  required
>
  <option value="" disabled hidden className="bg-red-600 text-white">
    PROJECT TYPE
  </option>
  <option value="General Inquiry" className="bg-red-600 text-white">
    General Inquiry
  </option>
  <option value="Project Quote" className="bg-red-600 text-white">
    Project Quote
  </option>
  <option value="Collaboration" className="bg-red-600 text-white">
    Collaboration
  </option>
  <option value="Feedback" className="bg-red-600 text-white">
    Feedback
  </option>
</select>



  {/* Message */}
  <textarea
    name="message"
    placeholder="YOUR MESSAGE"
    rows={4}
    required
    className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold"
  />

  <motion.button
    type="submit"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-black text-white px-8 py-4 font-black text-xl hover:bg-white hover:text-red-600 transition-colors"
  >
    SEND MESSAGE
  </motion.button>
</motion.form>

          </div>
        </div>
      </section>
    </div>
  );
};

export default KodaraClient;
