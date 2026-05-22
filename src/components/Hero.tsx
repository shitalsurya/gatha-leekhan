import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Phone, MessageCircle, Heart, BookOpen, Flame, Star } from "lucide-react";

/* ── Animated counter ── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/[^0-9]/g, ""), 10);
    if (!numeric) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(numeric);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  const formatted = count.toLocaleString("mr-IN");
  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

/* ── Floating diya sparks ── */
function DivaParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4,
    size: 2 + Math.random() * 3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-saffron/60"
          style={{ left: `${p.left}%`, bottom: "-8px", width: p.size, height: p.size }}
          animate={{ y: [-10, -160, -280], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ── Decorative OM divider ── */
function SacredDivider({ label }) {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />
      <span className="font-display text-saffron-deep text-sm tracking-widest opacity-80">{label}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />
    </div>
  );
}

/* ── Donation info card ── */
function DonationCard({ icon: Icon, text, accent = false }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl border p-5 paper-texture overflow-hidden group ${
        accent
          ? "border-saffron/50 bg-gradient-to-br from-saffron/10 via-cream to-gold/10"
          : "border-saffron/25 bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-saffron/5 to-transparent rounded-2xl" />
      <div className="relative flex items-start gap-4">
        <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${accent ? "bg-saffron/20" : "bg-saffron/10"}`}>
          <Icon className="w-4 h-4 text-saffron-deep" />
        </div>
        <p className="font-serif-dev text-base text-foreground/80 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════ */
export const GathaInitiative = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: "easeOut" },
  });

  return (
    <section
      ref={sectionRef}
      id="gatha-initiative"
      className="relative py-24 lg:py-32 overflow-hidden bg-cream"
    >
      {/* ── ambient glow blobs ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-saffron/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-40 -left-32 w-[400px] h-[400px] bg-maroon/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 paper-texture opacity-50 pointer-events-none" />
      <DivaParticles />

      <div className="relative max-w-5xl mx-auto px-5 lg:px-10 space-y-20">

        {/* ══ HEADER ══ */}
        <div className="text-center space-y-5">
          <motion.p {...fadeUp(0)} className="font-serif-dev text-sm text-maroon/60 tracking-widest uppercase">
            वारकरी प्रस्थानत्रयी सेवा समिती, पुणे आयोजीत
          </motion.p>

          <motion.div {...fadeUp(0.1)}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/15 border border-saffron/30 mb-4">
              <Flame className="w-3.5 h-3.5 text-saffron-deep animate-flicker" />
              <span className="font-display text-xs text-saffron-deep tracking-[0.2em]">॥ श्रीतुकाराम ॥</span>
              <Flame className="w-3.5 h-3.5 text-saffron-deep animate-flicker" />
            </div>
          </motion.div>

          <motion.h2 {...fadeUp(0.15)} className="font-display text-4xl sm:text-5xl lg:text-6xl text-maroon leading-[1.1]">
            संत तुकाराम गाथा
            <br />
            <span className="text-shimmer">एक लाख लेखी पारायण</span>
          </motion.h2>

          <motion.div {...fadeUp(0.25)} className="flex justify-center">
            <SacredDivider label="॥ भक्ती · सेवा · संस्कृती ॥" />
          </motion.div>

          {/* stats */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-wrap justify-center gap-10 pt-6"
          >
            {[
              { raw: "10000", suffix: "+", label: "यशस्वी गाथा वही वाटपानंतर" },
              { raw: "5000", suffix: "+", label: "वह्या" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="relative inline-block">
                  <div className="absolute -inset-3 bg-saffron/20 blur-xl rounded-full" />
                  <div className="relative font-display text-4xl lg:text-5xl text-saffron-deep">
                    <AnimatedCounter target={s.raw} suffix={s.suffix} />
                  </div>
                </div>
                <div className="font-serif-dev text-sm text-maroon/70 mt-2 max-w-[160px]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══ DONATION INFO ══ */}
        <motion.div {...fadeUp(0.1)} className="space-y-6">
          <h3 className="font-display text-2xl lg:text-3xl text-maroon text-center">देणगी माहिती</h3>
          <SacredDivider label="— ॐ —" />

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <DonationCard
              icon={Heart}
              text="१ वही साठी समिती कोणाचेही पैसे घेत नाही."
              accent
            />
            <DonationCard
              icon={BookOpen}
              text="१ वही ना नफा-ना तोटा या तत्त्वावर ३५०/- रुपये पडते."
            />
            <DonationCard
              icon={Star}
              text="५०, ७५, १००, २००, ३०० अशा पटीत देणगी स्वीकार."
            />
            <DonationCard
              icon={Flame}
              text="एक वही ३५० × ५०/१०० वह्या = देणगी"
              accent
            />
            <div className="sm:col-span-2">
              <DonationCard
                icon={Heart}
                text="दान देण्याची ज्याची शक्ती, इच्छा, त्यांनी तसे दान द्यावे."
                accent
              />
            </div>
          </div>
        </motion.div>

        {/* ══ SPECIAL MESSAGE ══ */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* glow border */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-saffron/60 via-gold/40 to-maroon/30 opacity-70" />
          <div className="absolute -inset-6 bg-saffron/10 blur-2xl rounded-full" />

          <div className="relative bg-cream/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 paper-texture border border-saffron/20 space-y-5">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-saffron-deep animate-flicker" />
              <h3 className="font-display text-2xl lg:text-3xl text-maroon">अधिक जेष्ठ मास</h3>
            </div>
            <SacredDivider label="— पर्व काळ —" />
            <p className="font-serif-dev text-lg lg:text-xl text-foreground/80 leading-loose">
              या पर्व काळात संत वाङ्गयाची साधना व्हावी म्हणून समिती पुन्हा वह्या वाटप करत आहे...
              त्यासाठी आम्हाला काही रक्कम दान द्यायची आहे म्हणून भाविक चौकशी करत आहेत.
            </p>
          </div>
        </motion.div>

        {/* ══ CONTACT ══ */}
        <motion.div {...fadeUp(0.1)} className="space-y-6">
          <h3 className="font-display text-2xl lg:text-3xl text-maroon text-center">संपर्क</h3>
          <SacredDivider label="॥ सेवा ॥" />

          <div className="grid sm:grid-cols-2 gap-5 mt-4">
            {/* Phone card */}
            <div className="relative group rounded-2xl border border-saffron/30 bg-cream/70 backdrop-blur paper-texture p-6 space-y-3 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-saffron/8 to-transparent transition-opacity duration-500" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-saffron/15 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-saffron-deep" />
                </div>
                <span className="font-serif-dev text-sm text-maroon/60 tracking-wide">देणगीसाठी संपर्क</span>
              </div>
              <p className="relative font-display text-2xl text-maroon pl-1">9881858024</p>
              <a
                href="tel:9881858024"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-saffron text-primary-foreground font-serif-dev text-sm shadow-sacred hover:shadow-glow transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-3.5 h-3.5" />
                देणगी माहिती
              </a>
            </div>

            {/* WhatsApp card */}
            <div className="relative group rounded-2xl border border-saffron/30 bg-cream/70 backdrop-blur paper-texture p-6 space-y-3 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-saffron/8 to-transparent transition-opacity duration-500" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-saffron/15 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-saffron-deep" />
                </div>
                <span className="font-serif-dev text-sm text-maroon/60 tracking-wide">अधिक माहितीसाठी WhatsApp</span>
              </div>
              <p className="relative font-display text-xl text-maroon pl-1 leading-relaxed">
                7030542255
                <br />
                9960355522
              </p>
              <a
                href="https://wa.me/917030542255"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-saffron text-primary-foreground font-serif-dev text-sm shadow-sacred hover:shadow-glow transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp संपर्क
              </a>
            </div>
          </div>
        </motion.div>

        {/* ══ BOTTOM MESSAGE ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-center space-y-6 pt-4"
        >
          <SacredDivider label="॥ उद्देश ॥" />
          <p className="font-serif-dev text-lg lg:text-xl text-foreground/70 leading-loose max-w-3xl mx-auto">
            उपक्रमाचा उद्देश — संत वाङ्गय प्रसार व्हावा, स्क्रीन टाइम कमी व्हावा.
            पुढच्या पिढीला लेखन, वाचन, पारायण संस्कृतिची जाणीव असावी.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            {["॥", "श्री", "तुकाराम", "महाराज", "की", "जय", "॥"].map((w, i) => (
              <motion.span
                key={i}
                className="font-display text-saffron-deep text-sm"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 1, 0.6] } : {}}
                transition={{ delay: 0.8 + i * 0.1, duration: 1.2 }}
              >
                {w}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
