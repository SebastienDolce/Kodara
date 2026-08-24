import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#080808] px-5 py-12 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="text-3xl font-black tracking-[-0.055em]">KODARA</span>
              <span className="h-4 w-4 bg-red-600" aria-hidden="true" />
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/45">
              Founder-led product systems studio. Build the thing. Connect the things. Automate the rest.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <div className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-white/30">Explore</div>
            <div className="space-y-2 text-sm text-white/60">
              <div><Link href="/#work" className="hover:text-red-500">Work</Link></div>
              <div><Link href="/#services" className="hover:text-red-500">Capabilities</Link></div>
              <div><Link href="/#lab" className="hover:text-red-500">Kodara Lab</Link></div>
              <div><Link href="/blog" className="hover:text-red-500">Notes</Link></div>
            </div>
          </nav>

          <div>
            <div className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-white/30">Contact</div>
            <div className="space-y-2 text-sm text-white/60">
              <div><a href="mailto:team@kodara.dev" className="hover:text-red-500">team@kodara.dev</a></div>
              <div>Miami, FL / working globally</div>
              <div className="pt-2">
                <a href="https://github.com/SebastienDolce" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">GitHub ↗</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white/25">
          <span>© {year} Kodara</span>
          <span>Software without the buzzword tax.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
