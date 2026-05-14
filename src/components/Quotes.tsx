import { motion } from "framer-motion";
import diya from "@/assets/diya.jpg";

const quotes = [
  { q: "तुकोबांचे हात लिहिताती जें जें", a: "अभंग वाणी" },
  { q: "गाथा लेखन हीच खरी सेवा", a: "वारकरी विचार" },
  { q: "॥ राम कृष्ण हरी ॥", a: "महामंत्र" },
];

export const Quotes = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={diya} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/85 via-maroon/80 to-maroon/90" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-10 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif-dev text-sm tracking-[0.3em] uppercase text-gold"
        >
          ॥ संतवाणी ॥
        </motion.span>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={q.q}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="relative p-8 rounded-3xl border border-gold/30 bg-cream/5 backdrop-blur-sm"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-saffron flex items-center justify-center font-display text-primary-foreground shadow-glow">
                ॥
              </div>
              <p className="font-display text-2xl lg:text-3xl text-cream leading-snug italic">
                {q.q}
              </p>
              <div className="mt-5 h-px w-12 mx-auto bg-gold/60" />
              <cite className="block mt-4 not-italic text-sm tracking-widest text-gold/90">
                — {q.a}
              </cite>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
