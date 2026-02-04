import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music, Volume2 } from "lucide-react";

// 音楽ファイルを追加するには:
// 1. public/music/ フォルダに音楽ファイル（mp3など）を配置
// 2. 以下の配列に曲情報を追加
const songs = [
  { titleKey: "song1", artistKey: "artist", file: "/music/song1.mp3" },
  { titleKey: "song2", artistKey: "artist", file: "/music/song2.mp3" },
  { titleKey: "song3", artistKey: "artist", file: "/music/song3.mp3" },
  { titleKey: "song4", artistKey: "artist", file: "/music/song4.mp3" },
  { titleKey: "song5", artistKey: "artist", file: "/music/song5.mp3" },
];

function SongCard({
  song,
  index,
  isPlaying,
  onPlay,
}: {
  song: (typeof songs)[0];
  index: number;
  isPlaying: boolean;
  onPlay: () => void;
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPlay}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl shadow-lg aspect-square flex items-center justify-center ${
          isPlaying
            ? "bg-gradient-to-br from-[#E8B4B8] to-[#D4A5A5]"
            : "bg-gradient-to-br from-[#D4A5A5] to-[#B8A4C9]"
        }`}
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ duration: 0.3 }}
        animate={
          isPlaying
            ? {
                boxShadow: "0 0 30px rgba(212, 165, 165, 0.6)",
              }
            : {}
        }
      >
        {/* 再生中のアニメーション */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* 音楽アイコン */}
        <motion.div
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.8, repeat: isPlaying ? Infinity : 0 }}
        >
          {isPlaying ? (
            <Volume2 className="text-white/80" size={48} />
          ) : (
            <Music className="text-white/30" size={64} />
          )}
        </motion.div>

        {/* 再生/一時停止ボタン */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isHovered || isPlaying ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isPlaying ? "bg-white" : "bg-white"
            }`}
            initial={{ scale: 0 }}
            animate={isHovered || isPlaying ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="text-[#D4A5A5]" size={32} fill="#D4A5A5" />
            ) : (
              <Play className="text-[#D4A5A5] ml-1" size={32} fill="#D4A5A5" />
            )}
          </motion.div>
        </motion.div>

        {/* 再生中インジケーター */}
        {isPlaying && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-white rounded-full"
                animate={{ height: [8, 20, 8] }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* 曲情報 */}
      <div className="mt-4 text-center">
        <h3
          className={`text-lg mb-1 transition-colors ${
            isPlaying ? "text-[#E8B4B8]" : "text-white/90"
          }`}
        >
          {t(song.titleKey)}
        </h3>
        <p className="text-sm text-white/60">{t(song.artistKey)}</p>
      </div>
    </motion.div>
  );
}

export function MusicSection() {
  const { t } = useLanguage();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (index: number, file: string) => {
    // 同じ曲をクリックした場合は停止
    if (currentlyPlaying === index) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setCurrentlyPlaying(null);
      return;
    }

    // 別の曲が再生中なら停止
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // 新しい曲を再生
    const audio = new Audio(file);
    audio.volume = 0.7;

    audio.play().catch((error) => {
      console.log("音楽ファイルが見つかりません:", file);
      // ファイルがない場合でもUIは更新（デモ用）
    });

    audio.onended = () => {
      setCurrentlyPlaying(null);
      audioRef.current = null;
    };

    audioRef.current = audio;
    setCurrentlyPlaying(index);
  };

  // コンポーネントがアンマウントされたら音楽を停止
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <section id="music" className="py-20 px-6 relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f28] to-[#2d1b3d]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1709731191876-899e32264420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbGlnaHRzJTIwc3RhZ2V8ZW58MXx8fHwxNzY4Nzg0NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4A5A5] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B8A4C9] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl mb-4 text-white"
            style={{
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(212, 165, 165, 0.4)",
            }}
          >
            {t("musicTitle")}
          </h2>
          <p
            className="text-lg text-white/80"
            style={{
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            {t("musicSubtitle")}
          </p>
          <p className="text-sm text-white/50 mt-2">クリックして再生 🎵</p>
        </motion.div>

        {/* 曲カード */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {songs.map((song, index) => (
            <SongCard
              key={index}
              song={song}
              index={index}
              isPlaying={currentlyPlaying === index}
              onPlay={() => handlePlay(index, song.file)}
            />
          ))}
        </div>

        {/* 音符デコレーション */}
        <motion.div
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Music className="text-white/30" size={20} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
