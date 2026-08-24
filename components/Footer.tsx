import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden border-t border-white/10 bg-[#080808] px-5 pb-10 pt-12 text-white md:px-10 lg:px-16 lg:pt-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="kodara-mono mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
          <span className="flex items-center gap-2"><span className="h-2 w-2 bg-red-600" /> End of page / not end of ideas</span>
          <span>Miami / working globally</span>
        </div>

        <Link href="/" aria-label="Kodara home" className="group block border-b border-white/10 pb-10">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[20vw] font-black uppercase leading-[0.72] tracking-[-0.085em] sm:text-[17vw] lg:text-[13.8rem] xl:text-[16rem]">
              KODARA
            </span>
            <span className="mt-2 h-5 w-5 shrink-0 bg-red-600 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-125 md:h-8 md:w-8" aria-hidden="true" />
          </div>
        </Link>

        <div className="grid gap-10 py-10 md:grid-cols-[1.35fr_.65fr_.65fr] lg:py-12">
          <div>
            <div className="max-w-xl text-2xl font-bold leading-tight tracking-[-0.035em] md:text-3xl">
              Build the thing. Connect the things. <span className="text-red-500">Automate the rest.</span>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/40">
              Founder-led product systems studio for software, AI automation, integrations, infrastructure, and problems that refuse to fit neatly into a template.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <div className="kodara-mono mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/25">Explore / 01</div>
            <div className="space-y-2.5 text-sm text-white/55">
              <div><Link href="/#work" className="hover:text-red-500">Selected work</Link></div>
              <div><Link href="/#services" className="hover:text-red-500">Capabilities</Link></div>
              <div><Link href="/#lab" className="hover:text-red-500">Kodara Lab</Link></div>
              <div><Link href="/#notes" className="hover:text-red-500">Workshop notes</Link></div>
            </div>
          </nav>

          <div>
            <div className="kodara-mono mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/25">Connect / 02</div>
            <div className="space-y-2.5 text-sm text-white/55">
              <div><a href="mailto:team@kodara.dev" className="hover:text-red-500">team@kodara.dev</a></div>
              <div><a href="https://github.com/SebastienDolce" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">GitHub ↗</a></div>
              <div><Link href="/#contact" className="hover:text-red-500">Start a conversation →</Link></div>
            </div>
          </div>
        </div>

        <div className="kodara-mono flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[8px] font-bold uppercase tracking-[0.17em] text-white/20">
          <span>© {year} Kodara</span>
          <span>Human judgment / software leverage / no buzzword tax</span>
          <span>EOF ■</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
