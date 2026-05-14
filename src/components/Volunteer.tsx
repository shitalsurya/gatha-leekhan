import { motion } from "framer-motion";
import { HandHeart, MapPin, Users } from "lucide-react";
import bhajan from "@/assets/bhajan.jpg";

export const Volunteer = () => {
  return (
    <section id="volunteer" className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[480px] rounded-[2rem] overflow-hidden shadow-sacred border-4 border-cream"
        >
          <img src={bhajan} alt="स्वयंसेवक" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
            {[
              { i: MapPin, t: "३६", l: "जिल्हे" },
              { i: Users, t: "१००+", l: "प्रचारक" },
              { i: HandHeart, t: "२४x७", l: "सेवा" },
            ].map((b, i) => {
              const Icon = b.i;
              return (
                <div key={i} className="p-3 rounded-2xl bg-cream/95 backdrop-blur text-center">
                  <Icon className="w-4 h-4 mx-auto text-saffron-deep" />
                  <div className="font-display text-lg text-maroon mt-1">{b.t}</div>
                  <div className="text-[10px] text-muted-foreground tracking-wider uppercase">{b.l}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-7"
        >
          <span className="font-serif-dev text-sm tracking-[0.3em] uppercase text-saffron-deep">
            ॥ सेवेची हाक ॥
          </span>
          <h2 className="font-display text-4xl lg:text-6xl text-maroon leading-tight">
            सेवेसाठी
            <br />
            <span className="italic text-shimmer">स्वयंसेवक व्हा</span>
          </h2>
          <p className="font-serif-dev text-lg text-foreground/80 leading-relaxed">
            जिल्हा व तालुका स्तरावर गाथालिखाण प्रचारक म्हणून कार्य करण्याची संधी.
            भक्तांना जोडा, गाथा वहीचे वाटप करा आणि अभियानाला पुढे नेण्यात
            पवित्र भागीदार बना.
          </p>
          <ul className="space-y-3 pt-2">
            {[
              "तालुका समन्वयकाची भूमिका",
              "गाथा वहीचे विनामूल्य वितरण",
              "मासिक भक्ती सोहळ्यांचे आयोजन",
              "डिजिटल प्रचार साहित्य उपलब्ध",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 font-serif-dev text-foreground/85">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-saffron flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
          <a
            href="#cta"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-maroon text-cream font-serif-dev shadow-sacred hover:bg-maroon/90 transition hover:-translate-y-0.5"
          >
            <HandHeart className="w-4 h-4" />
            प्रचारक म्हणून सहभागी व्हा
          </a>
        </motion.div>
      </div>
    </section>
  );
};
