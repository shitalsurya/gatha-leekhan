import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { FloatingParticles } from "./FloatingParticles";

export const CTA = () => {
  return (
    <section id="cta" className="relative py-28 px-5 lg:px-10">
      <div className="relative max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-sacred">
        <div className="absolute inset-0 bg-gradient-saffron" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(1_0_0/0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,oklch(0.34_0.12_25/0.4),transparent_50%)]" />
        <FloatingParticles />

        <div className="relative px-8 py-20 lg:py-28 lg:px-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-serif-dev text-sm tracking-[0.3em] uppercase text-cream/90"
          >
            ॥ श्री तुकोबाराय ॥
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl text-cream mt-5 leading-[1.05] text-glow"
          >
            आजच गाथा हस्तलिखाण
            <br />
            <span className="italic">सेवेत सहभागी व्हा</span>
          </motion.h2>
          <p className="font-serif-dev text-lg lg:text-xl text-cream/90 mt-7 max-w-2xl mx-auto leading-relaxed">
            भक्ती, सेवा आणि संस्कृती जपण्याच्या या दिव्य उपक्रमात आपला सहभाग नोंदवा.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cream text-maroon font-serif-dev shadow-glow hover:scale-105 transition-transform"
            >
              मोफत नोंदणी
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-maroon text-cream font-serif-dev hover:bg-maroon/90 transition hover:-translate-y-0.5 border border-cream/20"
            >
              <MessageCircle className="w-4 h-4" />
              व्हॉट्सअ‍ॅप ग्रुप जॉईन करा
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
