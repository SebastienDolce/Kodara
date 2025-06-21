"use client"; // Add this directive at the top for Next.js App Router


import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface Service {
  title: string;
  description: string;
}

const Kodara: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const teamMembers: TeamMember[] = [
    {
      name: 'Sebastien',
      role: 'CEO',
      bio: 'Visionary leader driving Kodara\'s strategic direction and growth.'
    },
    {
      name: 'Rob',
      role: 'CTO',
      bio: 'Technical mastermind architecting cutting-edge solutions.'
    },
    {
      name: 'Gabe',
      role: 'CFO',
      bio: 'Financial strategist ensuring sustainable growth and profitability.'
    }
  ];

  const services: Service[] = [
    {
      title: 'WEB DESIGN',
      description: 'Brutalist aesthetics meet functional excellence. We craft digital experiences that challenge conventions.'
    },
    {
      title: 'TECHNICAL CONSULTING',
      description: 'Strategic guidance for complex technical challenges. We architect solutions that scale.'
    }
  ];

  const blogPosts = [
    {
      date: '2024.01',
      title: 'THE BEGINNING',
      content: 'Three engineers. One vision. Zero compromise.'
    },
    {
      date: '2024.06',
      title: 'FIRST MILLION',
      content: 'Breaking barriers. Shattering expectations. Kodara reaches unprecedented heights.'
    },
    {
      date: '2024.12',
      title: 'GLOBAL EXPANSION',
      content: 'From garage to global. The meteoric rise continues.'
    }
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black z-40 border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <motion.h1 
            className="text-4xl font-black tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            KODARA<span className="text-red-600">.</span>
          </motion.h1>
          <div className="flex gap-8">
            {['HOME', 'SERVICES', 'TEAM', 'BLOG', 'CONTACT'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold hover:text-red-600 transition-colors"
                whileHover={{ y: -2 }}
                onClick={() => setActiveSection(item.toLowerCase())}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

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
            BUILD<br />BREAK<br />
            <span className="text-red-600">REPEAT</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl tracking-widest"
          >
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
                initial={{ y: 50, opacity: 0 }}
                animate={inView1 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ x: 10 }}
                className="border-4 border-white p-8 hover:border-red-600 transition-colors"
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
            THE<br />ARCHITECTS
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
                  <div className="w-full h-48 bg-gray-800 mb-6" />
                  <h3 className="text-3xl font-black mb-2">{member.name}</h3>
                  <p className="text-red-600 font-bold mb-4">{member.role}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
                <motion.div
                  className="absolute -bottom-2 -right-2 w-full h-full border-4 border-red-600 -z-10"
                  whileHover={{ x: 2, y: 2 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" ref={ref3} className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-20 text-center"
          >
            METEORIC<br />
            <span className="text-red-600">RISE</span>
          </motion.h2>
          
          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={inView3 ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="border-l-8 border-red-600 pl-8 py-4"
              >
                <p className="text-gray-500 font-bold mb-2">{post.date}</p>
                <h3 className="text-4xl font-black mb-4">{post.title}</h3>
                <p className="text-xl text-gray-400">{post.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={ref4} className="min-h-screen py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView4 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-7xl font-black mb-20"
          >
            CONNECT
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={inView4 ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-4xl font-black mb-8">LET'S BUILD SOMETHING BRUTAL</h3>
              <p className="text-xl mb-8">Ready to break conventions? We're here to help.</p>
              <div className="space-y-4">
                <p className="text-xl font-bold">hello@kodara.tech</p>
                <p className="text-xl font-bold">+1 (555) 123-4567</p>
                <p className="text-xl font-bold">San Francisco, CA</p>
              </div>
            </motion.div>
            
            <motion.form
              initial={{ x: 50, opacity: 0 }}
              animate={inView4 ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <input
                type="text"
                placeholder="NAME"
                className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold"
              />
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold"
              />
              <textarea
                placeholder="MESSAGE"
                rows={4}
                className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold"
              />
              <motion.button
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

export default Kodara;