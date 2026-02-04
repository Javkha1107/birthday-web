import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Heart, Calendar } from "lucide-react";

// 画像・動画付きタイムラインアイテム
// public/photos/ に画像、public/video/ に動画を配置
const timelineItems = [
  {
    dateKey: "timeline1Date",
    placeKey: "timeline1Place",
    memoryKey: "timeline1Memory",
    media: "/photos/flower.jpeg",
    type: "image" as const,
    showDate: true,
  },
  {
    dateKey: "timeline2Date",
    placeKey: "timeline2Place",
    memoryKey: "timeline2Memory",
    media: "/photos/darhan.jpeg",
    type: "image" as const,
    showDate: false,
  },
  {
    dateKey: "timeline3Date",
    placeKey: "timeline3Place",
    memoryKey: "timeline3Memory",
    media: "/photos/curry.jpeg",
    type: "image" as const,
    showDate: false,
  },
  {
    dateKey: "timeline4Date",
    placeKey: "timeline4Place",
    memoryKey: "timeline4Memory",
    media: "/video/cooking.mp4",
    type: "video" as const,
    showDate: false,
  },
  {
    dateKey: "timeline5Date",
    placeKey: "timeline5Place",
    memoryKey: "timeline5Memory",
    media: "/photos/uwul.jpeg",
    type: "image" as const,
    showDate: false,
  },
  {
    dateKey: "timeline6Date",
    placeKey: "timeline6Place",
    memoryKey: "timeline6Memory",
    media: "/video/2.mp4",
    type: "video" as const,
    showDate: false,
  },
  {
    dateKey: "timeline7Date",
    placeKey: "timeline7Place",
    memoryKey: "timeline7Memory",
    media: "/video/3.mp4",
    type: "video" as const,
    showDate: false,
  },
  {
    dateKey: "timeline8Date",
    placeKey: "timeline8Place",
    memoryKey: "timeline8Memory",
    media: "/video/1.mp4",
    type: "video" as const,
    showDate: false,
  },
];

function TimelineCard({
  item,
  index,
}: {
  item: (typeof timelineItems)[0];
  index: number;
}) {
  const { t } = useLanguage();
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* カード */}
      <motion.div
        className="relative overflow-hidden rounded-3xl cursor-pointer"
        whileHover={{ scale: 1.02, y: -10 }}
        transition={{ duration: 0.4 }}
        style={{
          boxShadow: isHovered
            ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 165, 165, 0.2)"
            : "0 20px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* 画像または動画 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {item.type === "video" ? (
            <video
              src={item.media}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <motion.img
              src={item.media}
              alt={t(item.placeKey)}
              className="w-full h-full object-cover"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* 日付バッジ - showDateがtrueの場合のみ表示 */}
          {item.showDate && (
            <motion.div
              className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            >
              <Calendar size={14} className="text-[#4a2c5a]" />
              <span className="text-sm font-semibold text-[#4a2c5a]">
                {t(item.dateKey)}
              </span>
            </motion.div>
          )}

          {/* ハートアイコン */}
          <motion.div
            className="absolute top-4 right-4"
            animate={
              isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.3 }}
          >
            <Heart
              size={24}
              className="text-[#D4A5A5] drop-shadow-lg"
              fill={isHovered ? "#D4A5A5" : "transparent"}
            />
          </motion.div>
        </div>

        {/* テキストコンテンツ */}
        <div className="relative bg-[#FAF5F7] p-6">
          {/* 装飾的な上部ライン */}
          <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#D4A5A5] via-[#B8A4C9] to-[#D4A5A5] rounded-full" />

          {/* <motion.h3
            className="text-xl md:text-2xl font-bold text-[#2d1b3d] mb-3 mt-2"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {t(item.placeKey)}
          </motion.h3> */}

          <p className="text-[#5a5a5a] leading-relaxed">{t(item.memoryKey)}</p>

          {/* 装飾的なドット */}
          <div className="flex gap-1 mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#D4A5A5]"
                animate={isHovered ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* 接続ライン（最後以外） */}
      {index < timelineItems.length - 1 && (
        <motion.div
          className="hidden md:block absolute left-1/2 -bottom-8 w-px h-16 bg-gradient-to-b from-[#D4A5A5] to-transparent"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
          style={{ transformOrigin: "top" }}
        />
      )}
    </motion.div>
  );
}

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section
      id="timeline"
      className="py-20 px-6 bg-gradient-to-b from-[#2d1b3d] via-[#4a2c5a] to-[#4a2c5a] relative overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-[#D4A5A5] rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-[#B8A4C9] rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* タイトル */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="text-[#D4A5A5]" size={32} fill="#D4A5A5" />
            <h2
              className="text-4xl md:text-5xl text-white font-bold"
              style={{
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              {t("timelineTitle")}
            </h2>
            <Heart className="text-[#D4A5A5]" size={32} fill="#D4A5A5" />
          </motion.div>
        </motion.div>

        {/* カードグリッド */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {timelineItems.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* 終わりのハート */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="text-[#D4A5A5]" size={40} fill="#D4A5A5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
