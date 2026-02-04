import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-responsive-masonry";

const photos = [
  // 彼女との写真を追加してください
  // public/photos/ フォルダに画像を配置
  { url: "/photos/flower.jpeg", captionKey: "photoCaption1" },
  { url: "/photos/darhan.jpeg", captionKey: "photoCaption2" },
  { url: "/photos/curry.jpeg", captionKey: "photoCaption3" },
  { url: "/photos/uwul.jpeg", captionKey: "photoCaption4" },
  { url: "/photos/curry.jpg", captionKey: "photoCaptionCurry" },
];

function PhotoCard({
  photo,
  index,
}: {
  photo: (typeof photos)[0];
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
      { threshold: 0.1 },
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative overflow-hidden rounded-2xl group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      style={{
        boxShadow: isHovered
          ? "0 20px 40px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(212, 165, 165, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          : "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      }}
    >
      <motion.img
        src={photo.url}
        alt={t(photo.captionKey)}
        className="w-full h-auto min-h-[200px] object-cover"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      />
      {/* 改善されたオーバーレイ - より読みやすく */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        initial={{ opacity: 0.5 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
      {/* 改善されたキャプション - 背景付きで読みやすく */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        initial={{ opacity: 0.9, y: 0 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.9, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p
          className="text-white text-sm md:text-base font-medium"
          style={{
            textShadow:
              "0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          {t(photo.captionKey)}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function PhotoGallery() {
  const { t } = useLanguage();

  return (
    <section
      id="gallery"
      className="py-20 px-6 bg-gradient-to-b from-[#FAF8F5] to-[#E8D5E0]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-center mb-16 text-[#4A4A4A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {t("photoGalleryTitle")}
        </motion.h2>

        {/* Desktop: Masonry layout */}
        <div className="hidden md:block">
          <Masonry columnsCount={3} gutter="20px">
            {photos.map((photo, index) => (
              <PhotoCard key={index} photo={photo} index={index} />
            ))}
          </Masonry>
        </div>

        {/* Mobile: Single column */}
        <div className="md:hidden space-y-6">
          {photos.map((photo, index) => (
            <PhotoCard key={index} photo={photo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
