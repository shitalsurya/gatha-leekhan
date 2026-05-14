import { motion } from "framer-motion";

const symbols = ["ॐ", "॥", "श्री", "ॐ", "गाथा", "॥", "हरी"];

export const FloatingParticles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => {
        const sym = symbols[i % symbols.length];
        const size = 14 + Math.random() * 22;
        return (
          <motion.span
            key={i}
            initial={{ y: "110%", x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.5, 0.5, 0],
              rotate: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: 14 + Math.random() * 10,
              delay: i * 1.4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute font-display text-saffron-deep/40"
            style={{ fontSize: size }}
          >
            {sym}
          </motion.span>
        );
      })}
    </div>
  );
};
