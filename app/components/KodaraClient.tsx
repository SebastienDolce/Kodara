"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Braces,
  Check,
  Cpu,
  Database,
  GitBranch,
  Link2,
  LockKeyhole,
  MapPinned,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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

type VisualKind = "spenthere" | "coordinator" | "credentials";

const systemSteps = [
  { key: "build", label: "BUILD", detail: "Products, web, mobile" },
  { key: "connect", label: "CONNECT", detail: "APIs, data, infrastructure" },
  { key: "automate", label: "AUTOMATE", detail: "AI, agents, workflows" },
];

const systemCopy: Record<string, { title: string; body: string; signal: string }> = {
  build: {
    title: "Turn the idea into a real thing.",
    body: "Interfaces, product logic, mobile, web, prototypes, and the decisions that make the whole thing coherent.",
    signal: "PRODUCT ONLINE",
  },
  connect: {
    title: "Make the pieces behave like one system.",
    body: "APIs, cloud services, databases, legacy tools, auth, and data flows connected without creating another mess.",
    signal: "SYSTEMS LINKED",
  },
  automate: {
    title: "Give the repetitive work back to software.",
    body: "AI when it earns its keep, deterministic automation when it does not, and human approval where judgment matters.",
    signal: "WORKFLOW MOVING",
  },
};

const projects: Array<{
  index: string;
  title: string;
  eyebrow: string;
  statement: string;
  description: string;
  tags: string[];
  visual: VisualKind;
}> = [
  {
    index: "01",
    title: "SpentHere",
    eyebrow: "CONSUMER PRODUCT / MOBILE / WEB",
    statement: "What if restaurant reviews started with what people actually paid?",
    description:
      "A receipt-first local discovery product built around pricing, real-world contribution, maps, and structured restaurant intelligence.",
    tags: ["Flutter", "Next.js", "Firebase", "Maps", "AI extraction"],
    visual: "spenthere",
  },
  {
    index: "02",
    title: "AI Project Coordinator",
    eyebrow: "AI SYSTEMS / INTERNAL TOOLING",
    statement: "Giving AI access was easy. Giving it the right amount of access was more interesting.",
    description:
      "An approval-gated control layer that lets AI understand projects, propose changes, and execute only the writes a human has approved.",
    tags: ["FastAPI", "MCP", "Leantime", "OAuth", "Automation"],
    visual: "coordinator",
  },
  {
    index: "03",
    title: "Credential Exchange",
    eyebrow: "KODARA LAB / SECURITY WORKFLOW",
    statement: "Please stop emailing me passwords.",
    description:
      "A one-time secure exchange flow for collecting exactly the credentials a project needs, with expiring links and controlled retrieval.",
    tags: ["Security", "One-time links", "Self-hosted", "Vaults"],
    visual: "credentials",
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

function ProjectVisual({ kind }: { kind: VisualKind }) {
  if (kind === "spenthere") {
    return (
      <div className="kodara-scanline kodara-grid-tight relative min-h-[340px] overflow-hidden border border-white/15 bg-[#0c0c0c] p-5 md:p-7">
        <div className="kodara-mono mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/35">
          <span>Receipt → useful data</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 bg-red-600" /> ingesting</span>
        </div>
        <div className="grid gap-4 md:grid-cols-[.8fr_1.2fr]">
          <div className="border border-white/15 bg-black p-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-dashed border-white/15 pb-4">
              <ReceiptText className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm font-bold">RECEIPT_0241</div>
                <div className="kodara-mono mt-1 text-[9px] uppercase tracking-[0.16em] text-white/30">Miami / 8:42 PM</div>
              </div>
            </div>
            <div className="kodara-mono mt-5 space-y-3 text-[10px] text-white/45">
              <div className="flex justify-between"><span>ENTREE × 2</span><span>$42.00</span></div>
              <div className="flex justify-between"><span>APPETIZER</span><span>$13.50</span></div>
              <div className="flex justify-between"><span>SERVICE</span><span>$8.75</span></div>
              <div className="mt-5 flex justify-between border-t border-dashed border-white/15 pt-4 text-white"><span>TOTAL</span><span>$84.62</span></div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="border border-white/15 bg-black/80 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"><MapPinned className="h-4 w-4 text-red-500" /> Local intelligence</div>
                <span className="kodara-mono text-[9px] text-green-400">92% confidence</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {["Avg entree / $21", "Parking / $18", "Service / detected", "Party size / 4"].map((item) => (
                  <div key={item} className="border border-white/10 bg-white/[0.025] p-3 text-xs text-white/55">{item}</div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 border border-red-600/60 bg-red-600/10 p-4 text-xs font-bold uppercase tracking-[0.15em] text-red-400">
              <span className="h-2.5 w-2.5 bg-red-600" /> One receipt added four useful facts
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "coordinator") {
    const nodes = [
      { icon: Bot, label: "AI", sub: "proposes" },
      { icon: ShieldCheck, label: "HUMAN", sub: "approves" },
      { icon: Database, label: "PROJECT", sub: "updates" },
    ];

    return (
      <div className="kodara-grid-tight relative min-h-[340px] overflow-hidden border border-white/15 bg-[#0c0c0c] p-5 md:p-7">
        <div className="kodara-mono flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/35">
          <span>Controlled write path</span>
          <span>policy / approval_required</span>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-8 md:gap-12">
          {nodes.map(({ icon: Icon, label, sub }, index) => (
            <div key={label} className="relative">
              <motion.div
                whileHover={{ y: -5 }}
                className={`relative z-10 border p-4 text-center md:p-6 ${index === 1 ? "border-red-600 bg-red-600 text-white" : "border-white/15 bg-black"}`}
              >
                <Icon className="mx-auto h-6 w-6" />
                <div className="mt-5 text-sm font-black tracking-[0.12em] md:text-base">{label}</div>
                <div className={`kodara-mono mt-2 text-[9px] uppercase tracking-[0.16em] ${index === 1 ? "text-white/65" : "text-white/30"}`}>{sub}</div>
              </motion.div>
              {index < nodes.length - 1 && (
                <div className="absolute left-[calc(100%+1px)] top-1/2 h-px w-8 bg-white/20 md:w-12">
                  <motion.span
                    className="absolute left-0 top-[-2px] h-[5px] w-[5px] bg-red-600"
                    animate={{ x: [0, 30, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.35 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="kodara-mono mt-12 grid gap-2 text-[9px] uppercase tracking-[0.14em] text-white/35 md:grid-cols-3">
          <span>01 / read context</span>
          <span className="text-red-400">02 / permission gate</span>
          <span>03 / auditable write</span>
        </div>
      </div>
    );
  }

  return (
    <div className="kodara-grid-tight relative min-h-[340px] overflow-hidden border border-white/15 bg-[#0c0c0c] p-5 md:p-7">
      <div className="kodara-mono flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/35">
        <span>Secret exchange / one-time</span>
        <span className="flex items-center gap-2 text-green-400"><span className="h-2 w-2 bg-green-400" /> encrypted</span>
      </div>
      <div className="mx-auto mt-10 max-w-xl border border-white/15 bg-black">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 text-red-500" />
            <span className="text-sm font-black">WORDPRESS ACCESS</span>
          </div>
          <span className="kodara-mono text-[9px] uppercase tracking-[0.15em] text-white/30">expires / 23:41</span>
        </div>
        <div className="space-y-3 p-5">
          <div className="border border-white/10 p-4">
            <div className="kodara-mono text-[9px] uppercase tracking-[0.16em] text-white/30">username</div>
            <div className="mt-2 text-sm text-white/70">••••••••••@client.com</div>
          </div>
          <div className="border border-white/10 p-4">
            <div className="kodara-mono text-[9px] uppercase tracking-[0.16em] text-white/30">password</div>
            <div className="mt-2 text-sm tracking-[0.28em] text-white/70">••••••••••••••</div>
          </div>
          <div className="flex items-center justify-between bg-red-600 p-4 text-xs font-black uppercase tracking-[0.14em]">
            <span>Submit once</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="kodara-mono mx-auto mt-4 flex max-w-xl flex-wrap items-center gap-3 text-[9px] uppercase tracking-[0.14em] text-white/30">
        <span className="flex items-center gap-2"><Check className="h-3 w-3 text-green-400" /> scoped request</span>
        <span>/</span>
        <span className="flex items-center gap-2"><Link2 className="h-3 w-3 text-red-400" /> link burns after use</span>
        <span>/</span>
        <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3 text-white/60" /> controlled retrieval</span>
      </div>
    </div>
  );
}

const KodaraClient: React.FC<Props> = ({ blogPosts }) => {
  const [activeSystem, setActiveSystem] = useState("build");
  const activeCopy = systemCopy[activeSystem];

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
      const input = form.querySelector<HTMLInputElement>("#g-recaptcha-response");
      if (input && token) input.value = token;
    } finally {
      form.submit();
    }
  };

  return (
    <div className="kodara-grain min-h-screen overflow-x-hidden bg-[#080808] text-[#f3f0ea] selection:bg-red-600 selection:text-white">
      <section id="home" className="relative min-h-[94vh] border-b border-white/10 px-5 pb-16 pt-36 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 kodara-grid opacity-60" />
        <div className="relative mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="kodara-mono mb-8 flex items-center gap-3 text-[10px] font-bold tracking-[0.28em] text-white/50">
              <span className="kodara-block h-3 w-3" /> FOUNDER-LED PRODUCT SYSTEMS STUDIO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="max-w-6xl text-[14vw] font-bold uppercase leading-[0.76] tracking-[-0.075em] sm:text-[11vw] lg:text-[8.2rem] xl:text-[10rem]"
            >
              Build the thing.
              <br />
              <span className="text-white/30">Connect the things.</span>
              <br />
              <span className="text-red-600">Automate the rest.</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.7 }} className="mt-12 grid max-w-4xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
                Kodara turns messy workflows and ambitious ideas into software, AI automation, and infrastructure that actually works.
              </p>
              <Link href="#work" className="group inline-flex items-center gap-3 border-b border-white/35 pb-2 text-sm font-bold uppercase tracking-[0.18em] hover:border-red-600 hover:text-red-500">
                See what we build
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22, duration: 0.7 }} className="kodara-scanline border border-white/15 bg-black/60 p-5 backdrop-blur md:p-7">
            <div className="kodara-mono mb-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">
              <span>System / 001</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 bg-red-600" /> {activeCopy.signal}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {systemSteps.map((step, index) => {
                const active = activeSystem === step.key;
                return (
                  <button
                    key={step.key}
                    type="button"
                    aria-pressed={active}
                    onMouseEnter={() => setActiveSystem(step.key)}
                    onFocus={() => setActiveSystem(step.key)}
                    onClick={() => setActiveSystem(step.key)}
                    className={`group border px-3 py-4 text-left transition-all md:px-4 ${active ? "border-red-600 bg-red-600 text-white" : "border-white/12 bg-white/[0.02] text-white/45 hover:border-white/30"}`}
                  >
                    <div className="kodara-mono flex items-start justify-between gap-2 text-[9px] tracking-[0.18em]">
                      <span>0{index + 1}</span>
                      <span className="h-2.5 w-2.5 border border-current transition-transform group-hover:rotate-45 group-hover:bg-current" />
                    </div>
                    <div className="mt-6 text-sm font-black tracking-[-0.02em] md:text-base">{step.label}</div>
                  </button>
                );
              })}
            </div>

            <motion.div key={activeSystem} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 border border-white/12 bg-white/[0.025] p-5 md:p-6">
              <div className="text-2xl font-bold leading-tight tracking-[-0.035em] md:text-3xl">{activeCopy.title}</div>
              <p className="mt-4 text-sm leading-6 text-white/45">{activeCopy.body}</p>
              <div className="kodara-mono mt-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-red-400">
                <span className="h-2 w-2 bg-red-600" /> system state / {activeSystem}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#f2efe8] px-5 py-8 text-black md:px-10 lg:px-16">
        <div className="kodara-mono mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.18em]">
          <span>Software / Product / AI / Automation / Infrastructure</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 bg-red-600" /> Miami → Anywhere</span>
        </div>
      </section>

      <section id="work" className="px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-16 grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
            <div className="kodara-mono text-[10px] font-bold uppercase tracking-[0.28em] text-red-500">Selected builds / not slideware</div>
            <h2 className="text-5xl font-bold leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Evidence beats a services page.</h2>
          </div>

          <div className="border-t border-white/15">
            {projects.map((project) => (
              <article key={project.title} className="group border-b border-white/15 py-12 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[.12fr_.78fr_1.1fr] lg:items-start">
                  <div className="kodara-mono text-[10px] font-bold tracking-[0.2em] text-white/30">{project.index}</div>
                  <div>
                    <div className="kodara-mono mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">{project.eyebrow}</div>
                    <h3 className="text-4xl font-bold tracking-[-0.045em] md:text-5xl">{project.title}</h3>
                    <p className="mt-7 max-w-xl text-2xl font-bold leading-tight tracking-[-0.02em] text-white/90">{project.statement}</p>
                    <p className="mt-5 max-w-xl text-base leading-7 text-white/45">{project.description}</p>
                    <div className="kodara-mono mt-7 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="border border-white/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.13em] text-white/45">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <ProjectVisual kind={project.visual} />
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
              <div className="kodara-mono text-[10px] font-bold uppercase tracking-[0.28em] text-red-600">What Kodara does</div>
              <h2 className="mt-6 text-5xl font-bold leading-[0.92] tracking-[-0.055em] md:text-7xl">Complicated things should feel simple.</h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-black/60">The stack changes. The job does not: understand the actual problem, build the right system, and remove the friction around it.</p>
            </div>

            <div className="border-t border-black/15">
              {capabilities.map(({ icon: Icon, title, body }, index) => (
                <div key={title} className="group grid gap-5 border-b border-black/15 py-8 md:grid-cols-[auto_1fr] md:gap-8 md:py-10">
                  <div className="flex h-12 w-12 items-center justify-center bg-black text-white transition-transform group-hover:rotate-3 group-hover:bg-red-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="kodara-mono text-[9px] font-bold tracking-[0.2em] text-black/35">0{index + 1}</span>
                      <h3 className="text-3xl font-bold tracking-[-0.035em] md:text-4xl">{title}</h3>
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
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="relative aspect-[4/5] max-w-xl overflow-hidden bg-white/5">
            <Image src="/images/sebastien.jpg" alt="Sebastien, founder of Kodara" fill className="object-cover grayscale transition duration-500 hover:grayscale-0" />
            <div className="kodara-mono absolute left-0 top-0 bg-black/80 px-4 py-3 text-[9px] uppercase tracking-[0.18em] text-white/55">Human / required</div>
            <div className="kodara-mono absolute bottom-0 left-0 bg-red-600 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white">Founder / Product Engineer</div>
          </div>

          <div>
            <div className="kodara-mono text-[10px] font-bold uppercase tracking-[0.28em] text-red-500">The human in the loop</div>
            <h2 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.055em] md:text-7xl">There has to be a better way.</h2>
            <div className="mt-9 max-w-3xl space-y-6 text-lg leading-8 text-white/55">
              <p>Kodara is founder-led by Sebastien Dolce. The common thread across the work is simple: when a workflow is repetitive, confusing, unnecessarily manual, or held together with copy and paste, it is worth asking whether software should be doing more of the work.</p>
              <p>That usually leads somewhere between product design, engineering, infrastructure, automation, and a slightly unreasonable amount of curiosity.</p>
            </div>
            <div className="kodara-mono mt-10 flex flex-wrap gap-3 text-[9px] font-bold uppercase tracking-[0.17em] text-white/40">
              <span className="border border-white/15 px-4 py-2">Product thinking</span>
              <span className="border border-white/15 px-4 py-2">Hands-on engineering</span>
              <span className="border border-white/15 px-4 py-2">AI with guardrails</span>
              <span className="border border-white/15 px-4 py-2">No buzzword tax</span>
            </div>
          </div>
        </div>
      </section>

      <section id="lab" className="kodara-lab relative overflow-hidden border-b border-white/10 px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="absolute right-[-8rem] top-[-3rem] select-none text-[16rem] font-black leading-none tracking-[-0.1em] text-red-600/[0.045]" aria-hidden="true">LAB</div>
        <div className="relative mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <div>
              <div className="kodara-mono flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-red-500"><Sparkles className="h-4 w-4" /> Kodara Lab / unstable on purpose</div>
              <h2 className="mt-7 text-5xl font-bold leading-[0.9] tracking-[-0.055em] md:text-6xl">Where annoying ideas become prototypes.</h2>
              <p className="mt-7 max-w-md text-lg leading-8 text-white/50">Small experiments, internal tools, prototypes, and things built mostly because the existing way was annoying.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { n: "01", title: "Review Composer", body: "Can an honest review form require almost no writing and almost no thinking?", state: "TESTING" },
                { n: "02", title: "Receipt Intelligence", body: "Turn a messy receipt into structured local pricing data without making the user fill out fourteen fields.", state: "BUILDING" },
              ].map((item) => (
                <motion.div key={item.title} whileHover={{ y: -6 }} className="group relative min-h-[300px] overflow-hidden border border-white/15 bg-black/70 p-7">
                  <div className="absolute right-0 top-0 h-20 w-20 border-b border-l border-white/10 transition-colors group-hover:border-red-600/60" />
                  <div className="kodara-mono flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                    <span>Experiment / {item.n}</span><span className="text-red-400">{item.state}</span>
                  </div>
                  <div className="mt-16 text-3xl font-bold tracking-[-0.04em] md:text-4xl">{item.title}</div>
                  <p className="mt-5 max-w-md leading-7 text-white/45">{item.body}</p>
                  <div className="absolute bottom-7 right-7 h-3 w-3 bg-red-600 transition-transform group-hover:rotate-45 group-hover:scale-125" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {blogPosts.length > 0 && (
        <section id="notes" className="border-b border-white/10 bg-white/[0.025] px-5 py-24 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="kodara-mono text-[10px] font-bold uppercase tracking-[0.28em] text-red-500">Notes from the workshop</div>
                <h2 className="mt-5 text-5xl font-bold tracking-[-0.05em] md:text-6xl">Things worth writing down.</h2>
              </div>
              <Link href="/blog" className="kodara-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-red-500">All notes →</Link>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {blogPosts.slice(0, 2).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-[#0a0a0a] p-8 hover:bg-[#101010]">
                  <div className="kodara-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">{post.date}</div>
                  <h3 className="mt-8 text-3xl font-bold tracking-[-0.035em] group-hover:text-red-500">{post.title}</h3>
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
              <div className="kodara-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/60">Have a weird problem?</div>
              <h2 className="mt-5 text-6xl font-bold leading-[0.86] tracking-[-0.065em] md:text-8xl">Good. Those are usually the fun ones.</h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/75">Tell me what is annoying, broken, manual, expensive, or just stubbornly refusing to become a product.</p>
              <a href="mailto:team@kodara.dev" className="kodara-mono mt-10 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em]">team@kodara.dev <ArrowUpRight className="h-4 w-4" /></a>
            </div>

            <form name="contact" method="POST" action="/.netlify/functions/send-email" onSubmit={handleSubmit} className="border-t border-white/35">
              <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" />
              <div className="grid md:grid-cols-2">
                <input type="text" name="name" placeholder="YOUR NAME" required className="kodara-mono border-b border-white/35 bg-transparent px-0 py-6 text-xs font-bold placeholder:text-white/55 focus:outline-none md:border-r md:px-5" />
                <input type="email" name="email" placeholder="EMAIL" required className="kodara-mono border-b border-white/35 bg-transparent px-0 py-6 text-xs font-bold placeholder:text-white/55 focus:outline-none md:px-5" />
              </div>
              <select name="project_type" defaultValue="" required className="kodara-mono w-full border-b border-white/35 bg-red-600 px-0 py-6 text-xs font-bold focus:outline-none md:px-5">
                <option value="" disabled>WHAT ARE WE BUILDING?</option>
                <option value="Product / MVP">Product / MVP</option>
                <option value="Automation / AI">Automation / AI</option>
                <option value="Integration / Infrastructure">Integration / Infrastructure</option>
                <option value="Consulting / Architecture">Consulting / Architecture</option>
                <option value="Something weird">Something weird</option>
              </select>
              <textarea name="message" placeholder="TELL ME WHAT IS ANNOYING YOU" rows={5} required className="kodara-mono w-full resize-none border-b border-white/35 bg-transparent px-0 py-6 text-xs font-bold placeholder:text-white/55 focus:outline-none md:px-5" />
              <button type="submit" className="kodara-mono mt-8 inline-flex items-center gap-3 bg-black px-7 py-4 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-1">Send it <ArrowUpRight className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KodaraClient;
