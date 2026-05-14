import { motion } from "framer-motion";
import writing from "@/assets/writing.jpg";
import wari from "@/assets/wari.jpg";
import notebooks from "@/assets/notebooks.jpg";
import bhajan from "@/assets/bhajan.jpg";
import diya from "@/assets/diya.jpg";
import tukaram from "@/assets/tukaram.jpg";

const items = [
  { src: writing, label: "गाथा हस्तलिखाण", span: "md:col-span-2 md:row-span-2" },
  { src: wari, label: "वारी परंपरा", span: "" },
  { src: notebooks, label: "पवित्र वही", span: "" },
  { src: bhajan, label: "भजन सोहळा", span: "md:col-span-2" },
  { src: diya, label: "दीपोत्सव", span: "" },
  { src: tukaram, label: "तुकोबाराय", span: "" },
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-28 lg:py-36 bg-cream-deep/20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <span className="font-serif-dev text-sm tracking-[0.3em] uppercase text-saffron-deep">
              ॥ क्षणचित्रे ॥
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-maroon mt-3">
              भक्तीचे <span className="italic text-shimmer">दृश्य रूप</span>
            </h2>
          </div>
          <p className="font-serif-dev text-muted-foreground max-w-md">
            अभियानातील पवित्र क्षण — सेवा, वारी आणि लेखनाच्या सोहळ्यांची झलक.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {items.map((it, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl shadow-soft border border-border/50 ${it.span}`}
            >
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-maroon/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <figcaption className="absolute bottom-4 left-4 right-4 font-display text-cream translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                {it.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
