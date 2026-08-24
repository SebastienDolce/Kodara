"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Braces, Cpu, GitBranch, Sparkles } from "lucide-react";

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
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

const systemSteps = [
  { key: "build", label: "BUILD", detail: "Products, web, mobile" },
  { key: "connect", label: "CONNECT", detail: "APIs, data, infrastructure" },
  { key: "automate", label: "AUTOMATE", detail: "AI, agents, workflows" },
];

const projects = [
  {
    index: "01",
    title: "SpentHere",
    eyebrow: "CONSUMER PRODUCT / MOBILE / WEB",
    statement: "What if restaurant reviews started with what people actually paid?",
    description:
      "A receipt-first local discovery product built around pricing, real-world contribution, maps, and structured restaurant intelligence.",
    tags: ["Flutter", "Next.js", "Firebase", "Maps", "AI extraction"],
  },
  {
    index: "02",
    title: "AI Project Coordinator",
    eyebrow: "AI SYSTEMS / INTERNAL TOOLING",
    statement: "Giving AI access was easy. Giving it the right amount of access was more interesting.",
    description:
      "An approval-gated control layer that lets AI understand projects, propose changes, and execute only the writes a human has approved.",
    tags: ["FastAPI", "MCP", "Leantime", "OAuth", "Automation"],
  },
  {
    index: "03",
    title: "Credential Exchange",
    eyebrow: "KODARA LAB / SECURITY WORKFLOW",
    statement: "Please stop emailing me passwords.",
    description:
      "A one-time secure exchange flow for collecting exactly the credentials a project needs, with expiring links and controlled retrieval.",
    tags: ["Security", "One-time links", "Self-hosted", "Vaults"],
  },
];

const capabilities = [
  {
    icon: Braces,
    title: "Build the thing",
    body: "Product engineering across web, mobile, prototypes, and the odd idea that does not fit neatly into a template.",
  },
  {
    icon: GitBranch,
    title: "Connect the things",
    body: "APIs, data flows, cloud services, legacy systems, and infrastructure that need to behave like one coherent product.",
  },
  {
    icon: Cpu,
    title: "Automate the rest",
    body: "AI when it helps, deterministic software when it should, and workflows that stop wasting human attention.",
  },
];

const KodaraClient: React.FC<Props> = ({ blogPosts }) => {
  const [activeSystem, setActiveSystem] = useState("build");

  useEffect(() => {
    if (document.querySelector('script[data-kodara-recaptcha="true"]')) return;

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=6LfPImkrAAAAAKG2Ybsg0XNXFAn5YCr8URjuGJG5";
    script.async = true;
    script.dataset.kodaraRecaptcha = "true";
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      const token = await window.grecaptcha?.execute("6LfPImkrAAAAAKG2Ybsg0XNXFAn5YCr8URjuGJG5", {
        action: "submit",
      });

      const input = form.querySelector<HTMLInputElement>('#g-recaptcha-response');
      if (input && token) input.value = token;
    } finally {
      form.submit();
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080808] text-[#f3f0ea] selection:bg-red-600 selection:text-white">
      <section id="home" className="relative min-h-[94vh] border-b border-white/10 px-5 pb-16 pt-36 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 kodara-grid opacity-60" />
        <div className="relative mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-white/55"
            >
              <span className="kodara-block h-3 w-3" />
              FOUNDER-LED PRODUCT SYSTEMS STUDIO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="max-w-6xl text-[14vw] font-black uppercase leading-[0.76] tracking-[-0.075em] sm:text-[11vw] lg:text-[8.2rem] xl:text-[10rem]"
            >
              Build the thing.
              <br />
              <span className="text-white/35">Connect the things.</span>
              <br />
              <span className="text-red-600">Automate the rest.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-12 grid max-w-4xl gap-8 md:grid-cols-[1fr_auto] md:items-end"
            >
              <p className="max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
                Kodara turns messy workflows and ambitious ideas into software, AI automation, and infrastructure that actually works.
              </p>
              <Link
                href="#work"
                className="group inline-flex items-center gap-3 border-b border-white/40 pb-2 text-sm font-bold uppercase tracking-[0.18em] hover:border-red-600 hover:text-red-500"
              >
                See what we build
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.7 }}
            className="border border-white/15 bg-black/50 p-5 backdrop-blur md:p-7"
          >
            <div className="mb-8 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">
              <span>System / 001</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 bg-red-600" /> LIVE</span>
            </div>

            <div className="space-y-4">
              {systemSteps.map((step, index) => {
                const active = activeSystem === step.key;
                return (
                  <button
                    key={step.key}
                    type="button"
                    onMouseEnter={() => setActiveSystem(step.key)}
                    onFocus={() => setActiveSystem(step.key)}
                    className={`group w-full border p-5 text-left transition-all ${
                      active ? "border-red-600 bg-red-600 text-white" : "border-white/12 bg-white/[0.02] text-white/55 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs font-bold tracking-[0.22em]">0{index + 1}</span>
                      <span className="h-3 w-3 border border-current transition-transform group-hover:rotate-45 group-hover:bg-current" />
                    </div>
                    <div className="mt-8 text-3xl font-black tracking-[-0.04em] md:text-4xl">{step.label}</div>
                    <div className={`mt-2 text-sm ${active ? "text-white/75" : "text-white/35"}`}>{step.detail}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2" aria-hidden="true">
              {systemSteps.map((step) => (
                <span key={step.key} className={`h-1 ${activeSystem === step.key ? "bg-red-600" : "bg-white/10"}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#f2efe8] px-5 py-8 text-black md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.18em]">
          <span>Software / Product / AI / Automation / Infrastructure</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-red-600" /> Miami → Anywhere</span>
        </div>
      </section>

      <section id="work" className="px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-16 grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-red-500">Selected builds</div>
            <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Evidence beats a services page.
            </h2>
          </div>

          <div className="border-t border-white/15">
            {projects.map((project) => (
              <article key={project.title} className="group grid gap-8 border-b border-white/15 py-10 lg:grid-cols-[.16fr_.84fr_1fr] lg:py-14">
                <div className="text-sm font-bold tracking-[0.2em] text-white/35">{project.index}</div>
                <div>
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-red-500">{project.eyebrow}</div>
                  <h3 className="text-4xl font-black tracking-[-0.045em] md:text-5xl">{project.title}</h3>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-white/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <p className="max-w-2xl text-2xl font-bold leading-tight tracking-[-0.02em] md:text-3xl">{project.statement}</p>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/50">{project.description}</p>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex h-12 w-12 items-center justify-center border border-white/20 transition-all group-hover:border-red-600 group-hover:bg-red-600">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f2efe8] px-5 py-24 text-black md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-red-600">What Kodara does</div>
              <h2 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.055em] md:text-7xl">
                Complicated things should feel simple.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-black/60">
                The stack changes. The job does not: understand the actual problem, build the right system, and remove the friction around it.
              </p>
            </div>

            <div className="border-t border-black/15">
              {capabilities.map(({ icon: Icon, title, body }, index) => (
                <div key={title} className="grid gap-5 border-b border-black/15 py-8 md:grid-cols-[auto_1fr] md:gap-8 md:py-10">
                  <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-bold tracking-[0.2em] text-black/35">0{index + 1}</span>
                      <h3 className="text-3xl font-black tracking-[-0.035em] md:text-4xl">{title}</h3>
                    </div>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-black/55">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-white/10 px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div className="relative aspect-[4/5] max-w-xl overflow-hidden bg-white/5">
            <Image src="/images/sebastien.jpg" alt="Sebastien, founder of Kodara" fill className="object-cover grayscale" />
            <div className="absolute bottom-0 left-0 bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white">
              Founder / Product Engineer
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-red-500">The human in the loop</div>
            <h2 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.055em] md:text-7xl">
              There has to be a better way.
            </h2>
            <div className="mt-9 max-w-3xl space-y-6 text-lg leading-8 text-white/60">
              <p>
                Kodara is founder-led by Sebastien Dolce. The common thread across the work is simple: when a workflow is repetitive, confusing, unnecessarily manual, or held together with copy and paste, it is worth asking whether software should be doing more of the work.
              </p>
              <p>
                That usually leads somewhere between product design, engineering, infrastructure, automation, and a slightly unreasonable amount of curiosity.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.17em] text-white/45">
              <span className="border border-white/15 px-4 py-2">Product thinking</span>
              <span className="border border-white/15 px-4 py-2">Hands-on engineering</span>
              <span className="border border-white/15 px-4 py-2">AI with guardrails</span>
              <span className="border border-white/15 px-4 py-2">No buzzword tax</span>
            </div>
          </div>
        </div>
      </section>

      <section id="lab" className="px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-red-500">
                <Sparkles className="h-4 w-4" /> Kodara Lab
              </div>
              <p className="mt-6 max-w-md text-lg leading-8 text-white/55">
                Small experiments, internal tools, prototypes, and things built mostly because the existing way was annoying.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-white/15 p-7">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">Experiment / 01</div>
                <div className="mt-8 text-3xl font-black tracking-[-0.035em]">Review Composer</div>
                <p className="mt-4 text-white/50">Can an honest review form require almost no writing and almost no thinking?</p>
              </div>
              <div className="border border-white/15 p-7">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">Experiment / 02</div>
                <div className="mt-8 text-3xl font-black tracking-[-0.035em]">Receipt Intelligence</div>
                <p className="mt-4 text-white/50">Turn a messy receipt into structured, useful local pricing data without making the user fill out fourteen fields.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {blogPosts.length > 0 && (
        <section id="notes" className="border-y border-white/10 bg-white/[0.025] px-5 py-24 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.28em] text-red-500">Notes from the workshop</div>
                <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] md:text-6xl">Things worth writing down.</h2>
              </div>
              <Link href="/blog" className="text-xs font-bold uppercase tracking-[0.2em] text-white/45 hover:text-red-500">
                All notes →
              </Link>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {blogPosts.slice(0, 2).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-[#0a0a0a] p-8 hover:bg-[#101010]">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/30">{post.date}</div>
                  <h3 className="mt-8 text-3xl font-black tracking-[-0.035em] group-hover:text-red-500">{post.title}</h3>
                  <p className="mt-4 max-w-xl leading-7 text-white/45">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="bg-red-600 px-5 py-24 text-white md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-white/65">Have a weird problem?</div>
              <h2 className="mt-5 text-6xl font-black leading-[0.86] tracking-[-0.065em] md:text-8xl">Good. Those are usually the fun ones.</h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/75">
                Tell me what is annoying, broken, manual, expensive, or just stubbornly refusing to become a product.
              </p>
              <a href="mailto:team@kodara.dev" className="mt-10 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em]">
                team@kodara.dev <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <form name="contact" method="POST" action="/.netlify/functions/send-email" onSubmit={handleSubmit} className="border-t border-white/35">
              <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" />
              <div className="grid md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME"
                  required
                  className="border-b border-white/35 bg-transparent px-0 py-6 text-sm font-bold placeholder:text-white/55 focus:outline-none md:border-r md:px-5"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  required
                  className="border-b border-white/35 bg-transparent px-0 py-6 text-sm font-bold placeholder:text-white/55 focus:outline-none md:px-5"
                />
              </div>
              <select
                name="project_type"
                defaultValue=""
                required
                className="w-full border-b border-white/35 bg-red-600 px-0 py-6 text-sm font-bold focus:outline-none md:px-5"
              >
                <option value="" disabled>WHAT ARE WE BUILDING?</option>
                <option value="Product / MVP">Product / MVP</option>
                <option value="Automation / AI">Automation / AI</option>
                <option value="Integration / Infrastructure">Integration / Infrastructure</option>
                <option value="Consulting / Architecture">Consulting / Architecture</option>
                <option value="Something weird">Something weird</option>
              </select>
              <textarea
                name="message"
                placeholder="TELL ME WHAT IS ANNOYING YOU"
                rows={5}
                required
                className="w-full resize-none border-b border-white/35 bg-transparent px-0 py-6 text-sm font-bold placeholder:text-white/55 focus:outline-none md:px-5"
              />
              <button type="submit" className="mt-8 inline-flex items-center gap-3 bg-black px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-1">
                Send it <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KodaraClient;
