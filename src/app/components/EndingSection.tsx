import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { Heart, Sparkles, Star } from "lucide-react";
import { useState } from "react";

export function EndingSection() {
  const { t } = useLanguage();
  const [heartClicked, setHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setHeartClicked(true);
    setTimeout(() => setHeartClicked(false), 1500);
  };

  return (
    <section id="ending" className="relative py-24 px-6 overflow-hidden">
      {/* 美しいグラデーション背景 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b3d] via-[#4a2c5a] to-[#FAF8F5]" />

        {/* 柔らかい光のエフェクト */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4A5A5] rounded-full blur-3xl"
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#B8A4C9] rounded-full blur-3xl"
          animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* 星のデコレーション */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${5 + i * 8}%`,
                top: `${10 + Math.sin(i * 0.8) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + i * 0.3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {i % 2 === 0 ? (
                <Star
                  className="text-[#D4A5A5]/60"
                  size={12}
                  fill="currentColor"
                />
              ) : (
                <Sparkles className="text-[#E8B4B8]/50" size={14} />
              )}
            </motion.div>
          ))}
        </div>

        {/* メインメッセージ */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p
            className="text-xl md:text-2xl leading-relaxed px-4"
            style={{
              color: "#FAF8F5",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)",
            }}
          >
            {t("endingMessage")}
          </p>
        </motion.div>

        {/* インタラクティブハート */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            onClick={handleHeartClick}
            className="relative p-6 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(212, 165, 165, 0.2), rgba(184, 164, 201, 0.2))",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* ハートのグロー */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={
                heartClicked
                  ? {
                      boxShadow: [
                        "0 0 20px rgba(212, 165, 165, 0.3)",
                        "0 0 60px rgba(212, 165, 165, 0.6)",
                        "0 0 20px rgba(212, 165, 165, 0.3)",
                      ],
                    }
                  : {
                      boxShadow: "0 0 20px rgba(212, 165, 165, 0.2)",
                    }
              }
              transition={{ duration: 1 }}
            />

            {/* ハートアイコン */}
            <motion.div
              animate={
                heartClicked
                  ? {
                      scale: [1, 1.4, 1],
                      rotate: [0, -15, 15, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
            >
              <Heart
                className="text-[#D4A5A5] drop-shadow-lg"
                size={56}
                fill="#D4A5A5"
              />
            </motion.div>

            {/* クリック時のパーティクル */}
            {heartClicked && (
              <>
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos((i * 2 * Math.PI) / 16) * 100,
                      y: Math.sin((i * 2 * Math.PI) / 16) * 100,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    {i % 2 === 0 ? (
                      <Heart
                        className="text-[#D4A5A5]"
                        size={12}
                        fill="#D4A5A5"
                      />
                    ) : (
                      <Star
                        className="text-[#E8B4B8]"
                        size={10}
                        fill="#E8B4B8"
                      />
                    )}
                  </motion.div>
                ))}
              </>
            )}
          </motion.button>
        </motion.div>

        {/* 感謝のメッセージ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-2"
        >
          <p
            className="text-lg font-medium"
            style={{
              color: "#4a2c5a",
            }}
          >
            {t("thankYou")}
          </p>
          <Heart className="text-[#4a2c5a]" size={20} fill="#4a2c5a" />
        </motion.div>
      </div>
    </section>
  );
}
