import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Floating petal component
function FloatingPetal({ delay }: { delay: number }) {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 10;

  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full bg-[#D4A5A5]/30"
      style={{ left: `${randomX}%`, top: "-5%" }}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, Math.sin(delay) * 50, 0],
        rotate: [0, 360],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
}

export function HeroSection() {
  const { t } = useLanguage();
  const [petals] = useState(() => Array.from({ length: 20 }, (_, i) => i));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2d1b3d] via-[#4a2c5a] to-[#6B4E71]"
    >
      {/* Floating petals */}
      {petals.map((i) => (
        <FloatingPetal key={i} delay={i * 0.5} />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          className="text-5xl md:text-7xl mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow:
              "0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(212, 165, 165, 0.3)",
          }}
        >
          {t("heroTitle")}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/90 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          {t("heroSubtitle")}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
        }}
      >
        <div className="w-6 h-10 border-2 border-[#D4A5A5] rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-[#D4A5A5] rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
