import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { FloatingParticles } from "./FloatingParticles";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* background image */}
      <div className="absolute inset-0">
        <img src={hero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/85 via-cream/70 to-cream" />
        <div className="absolute inset-0 paper-texture opacity-60" />
      </div>

      {/* Glow orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-saffron/30 blur-[120px] animate-flicker" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/20 blur-[140px]" />

      <FloatingParticles />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 py-20 grid lg:grid-cols-12 gap-10 items-center w-full">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-saffron/40 bg-cream/70 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-saffron-deep animate-flicker" />
            <span className="font-serif-dev text-sm text-maroon tracking-wide">
              ॥ श्री संत तुकाराम महाराज गाथा अभियान ॥
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-maroon"
          >
            तुकोबांचे हात
            <br />
            <span className="text-shimmer italic">लिहिताती जें जें...</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif-dev text-lg lg:text-xl text-foreground/75 max-w-2xl leading-relaxed"
          >
            एक लाख गाथा हस्तलिखाण सेवेत सहभागी व्हा आणि भक्ती, सेवा व
            संस्कृतीच्या या महान उपक्रमाचा भाग बना.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#cta"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-saffron text-primary-foreground font-serif-dev text-base shadow-sacred hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              नोंदणी करा
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full border-2 border-maroon/30 bg-cream/60 backdrop-blur text-maroon font-serif-dev hover:border-maroon hover:bg-cream transition"
            >
              <BookOpen className="w-4 h-4" />
              उपक्रम जाणून घ्या
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex items-center gap-8 pt-6"
          >
            {[
              { n: "१,००,०००", l: "लक्ष्य गाथा" },
              { n: "५,०००+", l: "सहभागी भक्त" },
              { n: "१००+", l: "स्वयंसेवक" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl lg:text-3xl text-saffron-deep">{s.n}</div>
                <div className="text-xs text-muted-foreground tracking-wide">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right manuscript card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="absolute -inset-6 bg-gradient-saffron rounded-3xl blur-2xl opacity-30" />
          <div className="relative bg-cream rounded-3xl border border-saffron/30 shadow-sacred p-10 paper-texture">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-sm text-saffron-deep tracking-widest">॥ अभंग ॥</span>
              <span className="w-12 h-px bg-gold" />
            </div>
            <p className="font-display text-2xl text-maroon leading-relaxed">
              आम्हां घरीं धन शब्दांचींच रत्नें।
              <br />
              शब्दांचींच शस्त्रें यत्न करूं॥
              <br />
              <br />
              शब्दचि आमुच्या जीवांचें जीवन।
              <br />
              शब्दें वांटूं धन जनलोकां॥
            </p>
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-border/50">
            
              <div>
                <div className="font-serif-dev text-sm text-maroon">— संत तुकाराम महाराज</div>
                <div className="text-xs text-muted-foreground">अभंग गाथा</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-cream pointer-events-none" />
    </section>
  );
};
