import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-4 border-red-600 px-6 py-12 text-sm">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left: Branding */}
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest text-red-600">
            Kodara
          </h2>
          <p className="mt-2 text-white/80">
            Software Engineering Redefined. We build fast, bold, and scalable digital systems.
          </p>
        </div>

        {/* Center: Navigation */}
        <nav aria-label="Footer navigation" className="space-y-2">
          <h3 className="text-white font-bold uppercase tracking-wide mb-2">Explore</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:text-red-600">Home</Link></li>
            <li><Link href="/services" className="hover:text-red-600">Services</Link></li>
            <li><Link href="/blog" className="hover:text-red-600">Blog</Link></li>
            <li><Link href="/team" className="hover:text-red-600">Team</Link></li>
            <li><Link href="/contact" className="hover:text-red-600">Contact</Link></li>
          </ul>
        </nav>

        {/* Right: Contact */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wide mb-2">Contact</h3>
          <p className="text-white/80">Email: <a href="mailto:hello@kodara.dev" className="text-red-600 hover:underline">hello@kodara.dev</a></p>
          <p className="text-white/80">Based in New York, working globally.</p>
          <div className="mt-4 space-x-4">
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">GitHub</a>
            <a href="https://linkedin.com/company/kodara" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-center text-white/50">
        <p>&copy; {year} Kodara. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
