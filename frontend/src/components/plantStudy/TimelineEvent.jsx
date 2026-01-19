import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TimelineEvent({ event, index, isActive, onHover, scrollY }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const parallaxOffset = (scrollY * 0.02 * (index + 1)) % 30;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative mb-24"
      onMouseEnter={onHover}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className={`flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`w-5/12 ${isEven ? "text-right" : "text-left"}`}
        >
          <motion.div
            className={`relative p-6 rounded-2xl glass-botanical border transition-all duration-500 ${
              isActive ? "border-primary glow-emerald" : "border-border hover:border-primary/50"
            }`}
          >
            <div
              className={`absolute top-0 ${
                isEven ? "right-0 rounded-tr-2xl" : "left-0 rounded-tl-2xl"
              } w-20 h-1 bg-gradient-to-r from-primary to-accent`}
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4"
            >
              <span className="text-sm font-semibold text-primary">{event.year}</span>
            </motion.div>

            <h3 className="text-xl font-display font-bold text-foreground mb-3">{event.title}</h3>

            <p className="text-muted-foreground leading-relaxed text-sm">{event.description}</p>

            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              style={{
                background:
                  "radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </motion.div>

        <div className="w-2/12 flex justify-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              delay: index * 0.15 + 0.2,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
              isActive ? "animate-pulse-glow" : ""
            }`}
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
              boxShadow: isActive
                ? "0 0 30px hsl(var(--primary) / 0.5)"
                : "0 8px 32px hsl(var(--background) / 0.5)",
            }}
          >
            <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
              <span className="text-2xl">{event.icon}</span>
            </div>

            {isActive && (
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
            )}
          </motion.div>
        </div>

        <div className="w-5/12" />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        className={`absolute top-1/2 h-0.5 bg-gradient-to-r ${
          isEven
            ? "right-1/2 left-[41.666%] origin-right from-transparent to-primary"
            : "left-1/2 right-[41.666%] origin-left from-primary to-transparent"
        } -translate-y-1/2`}
        style={{ width: "8.334%" }}
      />
    </motion.div>
  );
}
