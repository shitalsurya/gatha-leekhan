import { motion } from "framer-motion";
import { UserPlus, Book, PenLine, HandHeart } from "lucide-react";

const steps = [
  { icon: UserPlus, t: "नोंदणी करा", d: "मोफत ऑनलाइन फॉर्म भरून सेवेत प्रवेश घ्या." },
  { icon: Book, t: "गाथा वही प्राप्त करा", d: "विशेष तयार केलेली पवित्र गाथा वही घरपोच मिळवा." },
  { icon: PenLine, t: "भक्तीभावाने गाथा लिहा", d: "रोज काही ओव्या हाताने लिहून ध्यान साधना करा." },
  { icon: HandHeart, t: "सेवेत सहभागी व्हा", d: "पूर्ण झालेली गाथा अर्पण करून सामूहिक यज्ञात भाग घ्या." },
];

export const Process = () => {
  return (
    <section id="process" className="relative py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif-dev text-sm tracking-[0.3em] uppercase text-saffron-deep">
            ॥ सहभागाची वाट ॥
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-maroon mt-4">
            चार पावलांत <span className="italic text-shimmer">सेवेकडे</span>
          </h2>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="group relative p-8 rounded-3xl bg-card border border-border/60 hover:border-saffron transition-all hover:-translate-y-2 shadow-soft hover:shadow-sacred"
              >
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-saffron flex items-center justify-center text-primary-foreground shadow-sacred group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-cream border-2 border-saffron-deep text-saffron-deep font-display text-sm flex items-center justify-center">
                    {["०१", "०२", "०३", "०४"][i]}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-maroon mt-6">{s.t}</h3>
                <p className="font-serif-dev text-sm text-muted-foreground mt-3 leading-relaxed">{s.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
