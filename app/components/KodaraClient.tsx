// app/components/KodaraClient.tsx
"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
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

const formRef = useRef<HTMLFormElement>(null);

useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js?render=6LfPImkrAAAAAKG2Ybsg0XNXFAn5YCr8URjuGJG5';
  script.async = true;
  document.body.appendChild(script);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;
const token = await window.grecaptcha.execute('6LfPImkrAAAAAKG2Ybsg0XNXFAn5YCr8URjuGJG5', { action: 'submit' });

    //const token = await grecaptcha.execute('6LfPImkrAAAAAKG2Ybsg0XNXFAn5YCr8URjuGJG5', {
    //  action: 'submit',
  //  });

    const input = form.querySelector<HTMLInputElement>('#g-recaptcha-response');
    if (input) input.value = token;

    form.submit();
  };

  const form = formRef.current;
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  return () => {
    if (form) {
      form.removeEventListener('submit', handleSubmit);
    }
  };
}, []);


  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const teamMembers = [
  {
    name: "Sebastien",
    role: "Founder / Engineer",
    bio: "Sebastien guides Kodara’s direction with a focus on transparency and client success.",
    image: "/images/sebastien.jpg", // or use a remote URL
  },
  {
    name: "Devs.miami",
    role: "Agency",
    bio: "A powerful team of engineers ready to build software that grows with your needs.",
    image: "/images/devs-miami-logo.jpg",
    link: "https://devs.miami",
  },
 
];


  const services = [
  {
    title: "Custom Web & App Development",
    slug: "web-design",
    description: "We handle the code, and make sure you understand the why behind it.",
  },
  {
    title: "Tech Strategy & Consulting",
    slug: "technical-consulting",
    description: "We break down complex tech into clear, confident decisions.",
  },
  {
    title: "MVPs & Prototypes",
    slug: "software-engineering",
    description: "We help you move from rough idea to real, working product fast.",
  },
  {
    title: "Data Pipelines & Integrations",
    slug: "data-pipelines",
    description: "We connect your tools, automate the boring stuff, and keep your data flowing exactly where it needs to go.",
  },

];



  return (
    <><script src="https://www.google.com/recaptcha/api.js?render=6LfPImkrAAAAAKG2Ybsg0XNXFAn5YCr8URjuGJG5"></script>
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
              className="w-20 h-20 border-4 border-red-600 border-t-transparent" />
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
            IDEAS
            <br />
            INTO
            <br />
            <span className="text-red-600">REALITY</span>
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

      <section id="why-we-exist" className="bg-white text-black px-6 py-20 border-y-4 border-black">
  <div className="max-w-5xl mx-auto text-center space-y-8">
    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
      Why We Exist
    </h2>
    <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
      Kodara exists to bridge the gap between <strong>visionary ideas</strong> and <strong>high-performance software</strong>.
      We're here for startups and teams who want more than cookie-cutter code, who want thoughtful engineering,
      rapid iteration, and design that respects both form and function.
    </p>
    <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
      In a world full of complexity, we make things work beautifully, reliably, and fast.
      From scalable web apps to bulletproof backends, we bring deep technical craft and
      startup-level urgency to everything we build.
    </p>
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

<div className="grid md:grid-cols-2 gap-8 justify-center">
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
<div className="relative w-full h-110 mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center rounded-lg" />
                  </div>
                  <h3 className="text-3xl font-black mb-2"><a href={member.link}>{member.name}</a></h3>
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
            IDEAS
            <br />
            <span className="text-red-600">IN ACTION</span>
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
                <p className="text-xl text-gray-400">{post.excerpt}</p>
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
              <p className="text-xl mb-8">Ready to break conventions? We work with startups, enterprises, and bold individuals. Let’s bring your vision to life.</p>
              <div className="space-y-4">
                <p className="text-xl font-bold">team@kodara.dev</p>
                <p className="text-xl font-bold">+1 (561) 806-1027</p>
                <p className="text-xl font-bold">Miami, FL</p>
              </div>
            </motion.div>

            <motion.form
              name="contact"
              ref={formRef}
              method="POST"
              action="/.netlify/functions/send-email"
              className="space-y-6"
              initial={{ x: 50, opacity: 0 }}
              animate={inView4 ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
  <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" />


              {/* Full Name */}
              <input
                type="text"
                name="name"
                placeholder="FULL NAME"
                required
                className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold" />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                required
                className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold" />

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
                className="w-full bg-transparent border-b-4 border-white p-4 placeholder-white text-white font-bold" />

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
    </div></>
    
  );
};

export default KodaraClient;
