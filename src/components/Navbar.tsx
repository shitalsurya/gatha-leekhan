import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { href: "#about", label: "उपक्रम" },
  { href: "#impact", label: "प्रभाव" },
  { href: "#process", label: "सहभाग" },
  { href: "#gallery", label: "क्षणचित्रे" },
  { href: "#volunteer", label: "स्वयंसेवा" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [music, setMusic] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/80 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-saffron rounded-full blur-md opacity-40 group-hover:opacity-70 transition" />
            <img src={logo} alt="गाथालिखाण" width={48} height={48} className="relative w-12 h-12 object-contain" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl text-maroon">गाथालिखाण</div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-saffron-deep">सेवा अभियान</div>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-serif-dev text-[15px] text-foreground/80 hover:text-saffron-deep transition relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-saffron group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMusic((m) => !m)}
            aria-label="Toggle ambience"
            className={`hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur hover:bg-saffron/10 transition ${
              music ? "text-saffron-deep animate-flicker" : "text-muted-foreground"
            }`}
          >
            <Music2 className="w-4 h-4" />
          </button>
          <a
            href="#cta"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-saffron text-primary-foreground font-serif-dev text-sm shadow-sacred hover:scale-105 transition-transform"
          >
            नोंदणी करा
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-border"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-cream border-t border-border px-5 py-6 space-y-3"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-serif-dev text-lg text-foreground/80"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="block text-center mt-4 px-5 py-3 rounded-full bg-gradient-saffron text-primary-foreground"
          >
            नोंदणी करा
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};
