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
<section class="bg-black text-white font-mono px-6 py-16">
  <article class="max-w-4xl mx-auto space-y-12">

    <!-- Hero -->
    <header class="space-y-6">
      <h1 class="text-5xl md:text-6xl font-black border-b-8 border-red-600 inline-block">
        Custom&nbsp;Web</br>&nbsp;&amp;&nbsp;App&nbsp;Development
      </h1>
      <p class="text-gray-300 leading-relaxed text-lg">
        Looking for a <span class="font-bold text-white">web developer</span> and not sure where to begin?<br />
        We turn early ideas into market‑ready websites and applications—clearly, efficiently, and with full cost transparency.
      </p>
      <div class="relative w-full h-full">
        <img
          src="images/web-design.png"
          alt="Abstract development sketch"
          class="object-cover object-center w-full h-full rounded-md shadow-lg"
        />
      </div>
    </header>

    <!-- What You Receive -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">What You Receive</h2>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Tailored functionality</span>: built to fit your goals, not a one‑size‑fits‑all template.</li>
        <li><span class="font-bold text-white">Fast, mobile‑first performance</span>: pages load quickly and keep visitors engaged.</li>
        <li><span class="font-bold text-white">Straightforward pricing</span>: every line item detailed before work starts.</li>
      </ul>
      <blockquote class="border-l-4 border-red-600 pl-4 italic text-gray-400">
        “Consider us the partner who translates your vision into a reliable, high‑performing product.”
      </blockquote>
    </section>

    <!-- Four‑Step Process -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Our Four‑Step Process</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm border-collapse">
          <thead class="bg-gray-800 text-gray-200">
            <tr>
              <th class="p-3 font-bold">Step</th>
              <th class="p-3 font-bold">What Happens</th>
              <th class="p-3 font-bold">Why It Matters</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr>
              <td class="p-3 font-bold text-white">1. Discovery Call (Free)</td>
              <td class="p-3">We discuss objectives, audience, and desired outcomes.</td>
              <td class="p-3">Clarifies scope and sets clear expectations.</td>
            </tr>
            <tr>
              <td class="p-3 font-bold text-white">2. Project Roadmap</td>
              <td class="p-3">Timeline, milestones, and budget presented in plain language.</td>
              <td class="p-3">Provides a dependable plan you can align with your business.</td>
            </tr>
            <tr>
              <td class="p-3 font-bold text-white">3. Interactive Prototype</td>
              <td class="p-3">Clickable preview delivered quickly.</td>
              <td class="p-3">Validates design and user flow before major development begins.</td>
            </tr>
            <tr>
              <td class="p-3 font-bold text-white">4. Build &amp; Launch</td>
              <td class="p-3">We develop, test, and deploy—then hand you complete ownership.</td>
              <td class="p-3">Ensures a smooth release and future scalability.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-gray-300">
        Need post‑launch assistance? Flexible support plans are available as you grow.
      </p>
    </section>

    <!-- Ideal Partners -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Ideal Partners</h2>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">First‑time founders</span> seeking guidance from concept to launch</li>
        <li><span class="font-bold text-white">Established businesses</span> refreshing outdated sites or applications</li>
        <li><span class="font-bold text-white">Non‑technical teams</span> who value clear communication and reliable results</li>
      </ul>
      
    </section>

    <!-- Common Questions -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Common Questions</h2>
      <div class="space-y-4 text-gray-300">
        <p><span class="font-bold text-white">Q:</span> Do I need detailed specifications before we talk?<br />
           <span class="font-bold text-red-600">A:</span> No. Bring your core idea and business goals, we’ll shape the technical plan together.</p>

        <p><span class="font-bold text-white">Q:</span> What’s the typical timeline?<br />
           <span class="font-bold text-red-600">A:</span> Most projects take <span class="font-bold text-white">4–12 weeks</span>, depending on complexity. You’ll receive a schedule you can plan around.</p>

        <p><span class="font-bold text-white">Q:</span> Is ongoing maintenance included?<br />
           <span class="font-bold text-red-600">A:</span> Launch is only the beginning. We offer optional care plans to keep your site secure, updated, and performing at its best.</p>
      </div>
    </section>

    <!-- Call to Action -->
    <footer class="space-y-4">
      <h2 class="text-3xl font-black">Ready to Start?</h2>
      <p class="text-gray-300">
        If you’ve been searching <em>“how to hire a web developer”</em> or <em>“where do I begin with my website?”</em>, you’re in the right place.
      </p>
      <a
        href="/#contact"
        class="inline-block bg-red-600 hover:bg-red-500 transition-colors font-bold px-6 py-3 rounded-md"
      >
        Schedule a Discovery Call
      </a>
      <p class="text-gray-400">Let’s build something that works as hard as you do.</p>
    </footer>

  </article>
</section>


`
},
  {
    id: "technical-consulting",
    title: "Tech Strategy & Consulting",
    description: `
<section class="bg-black text-white font-mono px-6 py-16">
  <article class="max-w-4xl mx-auto space-y-12">

    <!-- Header -->
    <header class="space-y-6">
      <h1 class="text-5xl md:text-6xl font-black border-b-8 border-red-600 inline-block">
        Tech Strategy&nbsp;&amp;&nbsp;Consulting
      </h1>
      <p class="text-gray-300 leading-relaxed text-lg">
        You don’t need to speak in code to make good technical decisions.  
        We help founders, product teams, and business owners align their tech with their goals clearly and confidently.
      </p>
      <div class="relative w-full h-full">
        <img
          src="images/consulting.jpg"
          alt="System diagram and team discussion"
          class="object-cover object-center w-full h-full rounded-md shadow-lg"
        />
      </div>
    </header>

    <!-- What You Receive -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">What You Receive</h2>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Clarity</span>: know what you’re building, why it matters, and what it’ll take.</li>
        <li><span class="font-bold text-white">Focus</span>: avoid over-engineering, costly detours, and mismatched tools.</li>
        <li><span class="font-bold text-white">Confidence</span>: make decisions backed by real experience, not guesswork.</li>
      </ul>
      <blockquote class="border-l-4 border-red-600 pl-4 italic text-gray-400">
        “It’s not just about the tech. It’s about making smart, informed choices that move your business forward.”
      </blockquote>
    </section>

    <!-- Who It’s For -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Who It's For</h2>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Startups</span> needing a clear product roadmap or MVP strategy</li>
        <li><span class="font-bold text-white">Teams</span> struggling with scaling or modernizing legacy systems</li>
        <li><span class="font-bold text-white">Decision-makers</span> who want unbiased advice before hiring developers or agencies</li>
      </ul>
    </section>

    <!-- Our Approach -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">How It Works</h2>
      <ol class="list-decimal pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Initial Consultation:</span> We discuss where you are, what’s blocking progress, and what success looks like.</li>
        <li><span class="font-bold text-white">Audit or Evaluation:</span> We review existing systems or plans (if any) and identify strengths and risks.</li>
        <li><span class="font-bold text-white">Strategy Session:</span> You receive a clear, actionable strategy built for your timeline, team, and budget.</li>
        <li><span class="font-bold text-white">Ongoing Support (Optional):</span> Continue working with us as an external CTO, tech lead, or second opinion.</li>
      </ol>
      
    </section>

    <!-- FAQ -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Common Questions</h2>
      <div class="space-y-4 text-gray-300">
        <p><span class="font-bold text-white">Q:</span> Do I need to have a project already underway?<br />
           <span class="font-bold text-red-600">A:</span> Not at all. Many clients come to us before writing a single line of code.</p>

        <p><span class="font-bold text-white">Q:</span> Can you work with our existing dev team?<br />
           <span class="font-bold text-red-600">A:</span> Absolutely. We often act as technical translators, helping teams work more efficiently together.</p>

        <p><span class="font-bold text-white">Q:</span> What’s the commitment?<br />
           <span class="font-bold text-red-600">A:</span> We offer everything from one-time audits to monthly consulting retainers. It’s flexible and designed around your needs.</p>
      </div>
    </section>

    <!-- Call to Action -->
    <footer class="space-y-4">
      <h2 class="text-3xl font-black">Not Sure Where to Begin?</h2>
      <p class="text-gray-300">
        If you're unsure what to build—or how to build it—start here.  
        Kodara is the partner that helps you move forward with clarity.
      </p>
      <a
        href="/#contact"
        class="inline-block bg-red-600 hover:bg-red-500 transition-colors font-bold px-6 py-3 rounded-md"
      >
        Book a Consultation
      </a>
    </footer>

  </article>
</section>


`
  },
  {
    id: "software-engineering",
    title: "MVPs & Prototypes",
    description: `
<section class="bg-black text-white font-mono px-6 py-16">
  <article class="max-w-4xl mx-auto space-y-12">

    <!-- Header -->
    <header class="space-y-6">
      <h1 class="text-5xl md:text-6xl font-black border-b-8 border-red-600 inline-block">
        MVPs&nbsp;&amp;&nbsp;Prototypes
      </h1>
      <p class="text-gray-300 leading-relaxed text-lg">
        Launch quickly, learn fast.  
        We help you test ideas in the real world without committing to full-scale development up front.
      </p>
      <div class="relative w-full h-full">
        <img
          src="images/mvp.jpeg"
          alt="Whiteboard with prototype flow"
          class="object-cover object-center w-full h-full rounded-md shadow-lg"
        />
      </div>
    </header>

    <!-- What You Receive -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">What You Receive</h2>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Clickable prototypes</span>: quickly demo a concept to users, investors, or stakeholders.</li>
        <li><span class="font-bold text-white">Lightweight MVPs</span>: functional apps or sites with just enough to launch and learn.</li>
        <li><span class="font-bold text-white">Validation strategy</span>: get honest user feedback before investing more time or budget.</li>
      </ul>
      <blockquote class="border-l-4 border-red-600 pl-4 italic text-gray-400">
        “A prototype isn't just a mockup, it’s your first step toward product-market fit.”
      </blockquote>
    </section>

    <!-- Who It's For -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Who It’s For</h2>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Founders</span> looking to test demand or pitch to investors</li>
        <li><span class="font-bold text-white">Product teams</span> needing a fast proof-of-concept for internal review</li>
        <li><span class="font-bold text-white">Entrepreneurs</span> unsure how to begin or what features matter most</li>
      </ul>
    </section>

    <!-- Our Approach -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">How It Works</h2>
      <ol class="list-decimal pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Goal Definition:</span> We help you identify the simplest version of your idea that can still prove the concept.</li>
        <li><span class="font-bold text-white">Prototype Design:</span> We build a visual walkthrough or a real app you can test right away.</li>
        <li><span class="font-bold text-white">Launch & Learn:</span> We help you gather feedback from users, investors, or stakeholders to shape next steps.</li>
        <li><span class="font-bold text-white">Option to Build:</span> Ready to scale? We can evolve the MVP into a full product when you’re ready.</li>
      </ol>
      
    </section>

    <!-- FAQ -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Common Questions</h2>
      <div class="space-y-4 text-gray-300">
        <p><span class="font-bold text-white">Q:</span> What’s the difference between an MVP and a prototype?<br />
           <span class="font-bold text-red-600">A:</span> A prototype shows the concept visually. An MVP is a working version with core features. We help with both.</p>

        <p><span class="font-bold text-white">Q:</span> Can I use the prototype for pitching or user testing?<br />
           <span class="font-bold text-red-600">A:</span> Absolutely. We design it with that goal in mind clear, interactive, and easy to share.</p>

        <p><span class="font-bold text-white">Q:</span> How fast can I launch an MVP?<br />
           <span class="font-bold text-red-600">A:</span> Most MVPs take **2–6 weeks** depending on scope. We’ll give you a timeline up front.</p>
      </div>
    </section>

    <!-- Call to Action -->
    <footer class="space-y-4">
      <h2 class="text-3xl font-black">Let’s Build What Matters First</h2>
      <p class="text-gray-300">
        If you’re unsure how to begin, but need something real, start here.  
        We help you launch fast, test smart, and stay in control of your product’s future.
      </p>
      <a
        href="/#contact"
        class="inline-block bg-red-600 hover:bg-red-500 transition-colors font-bold px-6 py-3 rounded-md"
      >
        Schedule a Discovery Call
      </a>
    </footer>

  </article>
</section>


`
  },
  {
    id: "data-pipelines",
    title: "Data Pipelines & Integrations",
    description: `
<section class="bg-black text-white font-mono px-6 py-16">
  <article class="max-w-4xl mx-auto space-y-12">

    <!-- Header -->
    <header class="space-y-6">
      <h1 class="text-5xl md:text-6xl font-black border-b-8 border-red-600 inline-block">
        Data Pipelines&nbsp;&amp;&nbsp;Integration
      </h1>
      <p class="text-gray-300 leading-relaxed text-lg">
        Data should flow where it’s needed cleanly, automatically, and without bottlenecks.  
        We help you connect systems, automate data movement, and streamline operations behind the scenes.
      </p>
      <div class="relative w-full h-full">
        <img
          src="images/integrations.png"
          alt="Visual of connected systems"
          class="object-cover object-center w-full h-full rounded-md shadow-lg"
        />
      </div>
    </header>

    <!-- What You Receive -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">What You Receive</h2>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Reliable pipelines</span>: automated processes that keep your data flowing without manual effort.</li>
        <li><span class="font-bold text-white">Seamless integration</span>: unify tools, platforms, and databases so everything works together.</li>
        <li><span class="font-bold text-white">Clear documentation</span>: know what’s connected, where your data goes, and how to maintain it.</li>
      </ul>
      <blockquote class="border-l-4 border-red-600 pl-4 italic text-gray-400">
        “Think of us as the team that keeps your systems in sync while you stay focused on the big picture.”
      </blockquote>
    </section>

    <!-- Common Use Cases -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Where We Help Most</h2>
      <ul class="list-disc pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Startups</span> that need their app to sync with CRMs, marketing tools, or analytics platforms</li>
        <li><span class="font-bold text-white">Teams</span> spending hours manually exporting/importing CSVs between tools</li>
        <li><span class="font-bold text-white">Operations leads</span> who want to automate reporting, workflows, or real-time dashboards</li>
      </ul>
    </section>

    <!-- Our Approach -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">How It Works</h2>
      <ol class="list-decimal pl-6 space-y-3 text-gray-300">
        <li><span class="font-bold text-white">Understand the Flow:</span> We map out where your data lives, where it needs to go, and why.</li>
        <li><span class="font-bold text-white">Design the Pipeline:</span> We plan connections that are stable, secure, and easy to monitor.</li>
        <li><span class="font-bold text-white">Build & Automate:</span> We implement the data flow from APIs to databases to 3rd-party tools.</li>
        <li><span class="font-bold text-white">Monitor & Support:</span> We provide visibility and support options to ensure long-term success.</li>
      </ol>
     
    </section>

    <!-- FAQ -->
    <section class="space-y-6">
      <h2 class="text-3xl font-black">Common Questions</h2>
      <div class="space-y-4 text-gray-300">
        <p><span class="font-bold text-white">Q:</span> What types of platforms can you connect?<br />
           <span class="font-bold text-red-600">A:</span> CRMs, email tools, ERPs, custom APIs, SQL/NoSQL databases, you name it. If it has an interface, we’ll integrate it.</p>

           <p><span class="font-bold text-white">Q:</span> Can you Work with AI?<br />
           <span class="font-bold text-red-600">A:</span> Absolutely! from chat completion, to image generation, to text embedding, we can integrte AI into any workflow. Just ask.</p>

        <p><span class="font-bold text-white">Q:</span> Do you only work with big systems?<br />
           <span class="font-bold text-red-600">A:</span> Not at all. Many of our projects are small automations that save hours each week.</p>

        <p><span class="font-bold text-white">Q:</span> Will I need a developer to maintain it later?<br />
           <span class="font-bold text-red-600">A:</span> We build solutions that are easy to monitor and hand off. We also offer maintenance plans if needed.</p>
      </div>
    </section>

    <!-- Call to Action -->
    <footer class="space-y-4">
      <h2 class="text-3xl font-black">Ready to Untangle the Data?</h2>
      <p class="text-gray-300">
        If your tools don’t talk to each other or you’re tired of doing things manually, we can help.  
        Let’s build the system that lets your business breathe.
      </p>
      <a
        href="/#contact"
        class="inline-block bg-red-600 hover:bg-red-500 transition-colors font-bold px-6 py-3 rounded-md"
      >
        Book a Consultation
      </a>
    </footer>

  </article>
</section>


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
            
  <div
  dangerouslySetInnerHTML={{ __html: services[activeIndex].description }}
  className="prose prose-invert"
/>

</div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
};

export default ServicesPage;
