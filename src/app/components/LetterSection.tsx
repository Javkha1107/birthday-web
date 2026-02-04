import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";

export function LetterSection() {
  const { t } = useLanguage();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          setTimeout(() => {
            setIsEnvelopeOpen(true);
          }, 500);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="letter"
      className="py-20 px-6 bg-gradient-to-b from-[#4a2c5a] to-[#2d1b3d]"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-center mb-8 text-white relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          style={{
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          {t("letterTitle")}
        </motion.h2>

        {/* Envelope Animation - 消えた後は高さ0 */}
        <motion.div
          className="relative flex justify-center overflow-hidden"
          animate={
            isEnvelopeOpen
              ? { height: 0, marginBottom: 0 }
              : { height: 140, marginBottom: 32 }
          }
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            className="relative w-32 h-32"
            initial={{ scale: 0, rotate: -10 }}
            animate={
              isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Envelope */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#D4A5A5] to-[#B8A4C9] rounded-lg shadow-xl flex items-center justify-center"
              animate={
                isEnvelopeOpen
                  ? { rotateX: 180, opacity: 0 }
                  : { rotateX: 0, opacity: 1 }
              }
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Mail className="text-white" size={48} />
            </motion.div>

            {/* Envelope flap */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-16 bg-[#E8B4B8] origin-top"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transformStyle: "preserve-3d",
              }}
              animate={isEnvelopeOpen ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Letter Content */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={
            isEnvelopeOpen
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 50, scale: 0.9 }
          }
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{
            background: "linear-gradient(to bottom, #FAF5F7, #F0E8EC)",
          }}
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#D4A5A5] rounded-tr-3xl" />
          </div>

          {/* Letter text */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={isEnvelopeOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="prose prose-lg max-w-none text-[#4A4A4A] leading-relaxed whitespace-pre-line">
              {t("letterContent")}
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="mt-8 flex justify-end"
            initial={{ opacity: 0 }}
            animate={isEnvelopeOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#D4A5A5]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.5 + i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
