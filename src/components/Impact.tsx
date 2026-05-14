import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { n: "१,००,०००", label: "गाथा लक्ष्य", sub: "संपूर्ण अभियान" },
  { n: "५,०००+", label: "नोंदणी", sub: "सहभागी भक्त" },
  { n: "१००+", label: "स्वयंसेवक", sub: "जिल्हा पातळीवर" },
  { n: "महाराष्ट्र", label: "भर उपक्रम", sub: "३६ जिल्हे" },
];

export const Impact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section
      id="impact"
      ref={ref}
      className="relative py-28 bg-gradient-to-b from-cream via-cream-deep/30 to-cream"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif-dev text-sm tracking-[0.3em] uppercase text-saffron-deep">
            ॥ अभियानाचा प्रभाव ॥
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-maroon mt-4">
            आपल्या सेवेची ताकद
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="group relative p-7 lg:p-9 rounded-3xl bg-card border border-border/60 hover:border-saffron/60 transition-all hover:-translate-y-2 shadow-soft hover:shadow-sacred overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-saffron opacity-0 group-hover:opacity-20 blur-2xl transition" />
              <div className="font-display text-3xl lg:text-5xl text-shimmer">{s.n}</div>
              <div className="font-serif-dev text-lg text-maroon mt-3">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide">{s.sub}</div>
              <div className="mt-5 h-px bg-gradient-to-r from-saffron/60 via-gold/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
