import { motion } from "framer-motion";
import tukaram from "@/assets/tukaram.jpg";
import writing from "@/assets/writing.jpg";
import notebooks from "@/assets/notebooks.jpg";

export const About = () => {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-7"
        >
          <span className="font-serif-dev text-sm tracking-[0.3em] uppercase text-saffron-deep">
            ॥ परिचय ॥
          </span>
          <h2 className="font-display text-4xl lg:text-6xl text-maroon leading-tight">
            गाथालिखाण
            <br />
            <span className="italic text-shimmer">म्हणजे काय?</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-saffron" />
          <p className="font-serif-dev text-lg text-foreground/80 leading-relaxed">
            संत तुकाराम महाराजांच्या गाथेचे हस्तलिखाण करून भक्तीभावाने सेवा करण्याचा
            हा सामूहिक आध्यात्मिक उपक्रम आहे. लाखो भक्तांना गाथेशी जोडणे आणि
            वारकरी परंपरेचे संवर्धन करणे हे या अभियानाचे उद्दिष्ट आहे.
          </p>
          <div className="grid grid-cols-2 gap-5 pt-4">
            {[
              { t: "भक्ती", d: "हृदयापासून सेवा" },
              { t: "परंपरा", d: "वारकरी संस्कृती" },
              { t: "हस्तलिखाण", d: "अक्षरांतून ध्यान" },
              { t: "संवर्धन", d: "पिढ्यांसाठी जतन" },
            ].map((b) => (
              <div
                key={b.t}
                className="p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur hover:border-saffron/50 hover:shadow-soft transition"
              >
                <div className="font-display text-xl text-maroon">{b.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-saffron rounded-[2rem] blur-3xl opacity-20" />
          <div className="absolute top-0 left-0 w-[58%] h-[68%] rounded-3xl overflow-hidden shadow-sacred border-4 border-cream rotate-[-3deg]">
            <img src={tukaram} alt="संत तुकाराम महाराज" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[30%] right-0 w-[55%] h-[45%] rounded-3xl overflow-hidden shadow-sacred border-4 border-cream rotate-[2deg]">
            <img src={writing} alt="गाथा हस्तलिखाण" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-[15%] w-[55%] h-[42%] rounded-3xl overflow-hidden shadow-sacred border-4 border-cream rotate-[-1deg]">
            <img src={notebooks} alt="गाथा वही" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
