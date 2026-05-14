import { motion } from "framer-motion";

const steps = [
  {
    num: "१",
    icon: "📝",
    t: "नोंदणी करा",
    d: "ऑनलाईन किंवा स्थानिक केंद्रावर आपली नोंदणी करा आणि सेवेचा आरंभ करा.",
  },
  {
    num: "२",
    icon: "📚",
    t: "गाथा वही प्राप्त करा",
    d: "नोंदणीनंतर आपल्याला विशेष गाथालिखाण वही व मार्गदर्शन पाठवले जाईल.",
  },
  {
    num: "३",
    icon: "✍️",
    t: "भक्तीभावाने गाथा लिहा",
    d: "आपल्या वेळेनुसार शांतपणे, भक्तीभावाने तुकोबांची गाथा हस्तलिखित करा.",
  },
  {
    num: "४",
    icon: "🙏",
    t: "सेवेत सहभागी व्हा",
    d: "पूर्ण झालेली वही समर्पित करा आणि या दिव्य सामूहिक सेवेचा भाग बना.",
  },
];

export const Process = () => {
  return (
    <section id="process" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Soft glowing background */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full bg-saffron/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full bg-gold/15 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif-dev text-sm tracking-[0.3em] uppercase text-saffron-deep">
            ॥ सेवेतील सहभागाची प्रक्रिया ॥
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-maroon mt-4 leading-tight">
            कसे <span className="italic text-shimmer">सहभागी</span> व्हाल?
          </h2>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />
          {steps.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative p-8 rounded-3xl bg-card/80 backdrop-blur border border-border/60 hover:border-saffron transition-all hover:-translate-y-2 shadow-soft hover:shadow-sacred"
            >
              {/* glow on hover */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-saffron opacity-0 group-hover:opacity-20 blur-xl transition-opacity pointer-events-none" />

              <div className="relative flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-gradient-saffron flex items-center justify-center text-3xl shadow-sacred group-hover:scale-110 transition-transform">
                  <span aria-hidden>{s.icon}</span>
                </div>
                <span className="font-display text-5xl text-saffron-deep/30 group-hover:text-saffron-deep/60 transition-colors leading-none">
                  {s.num}
                </span>
              </div>

              <h3 className="relative font-display text-2xl text-maroon mt-6 leading-snug">
                {s.t}
              </h3>
              <p className="relative font-serif-dev text-sm text-muted-foreground mt-3 leading-[1.9]">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
