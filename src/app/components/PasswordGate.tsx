import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Lock, Unlock } from "lucide-react";

// ここでパスワードを設定してください
const SECRET_PASSWORD = "0205";

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword("");
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#2d1b3d] via-[#4a2c5a] to-[#6B4E71] flex items-center justify-center px-4 md:px-6">
      {/* 背景の装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-[#D4A5A5] rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-[#B8A4C9] rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.1, 1], y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* フローティングハート - モバイルでは非表示 */}
      <div className="hidden md:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + Math.sin(i) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart
              className="text-[#D4A5A5]/30"
              size={20 + i * 5}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-sm md:max-w-md px-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ロックアイコン */}
        <motion.div
          className="flex justify-center mb-6 md:mb-8"
          animate={isUnlocked ? { rotateY: 180 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#D4A5A5] to-[#B8A4C9] flex items-center justify-center shadow-2xl"
            whileHover={{ scale: 1.05 }}
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {isUnlocked ? (
              <Unlock className="text-white" size={32} />
            ) : (
              <Lock className="text-white" size={32} />
            )}
          </motion.div>
        </motion.div>

        {/* タイトル */}
        <motion.h1
          className="text-3xl md:text-4xl text-center text-white mb-2 font-bold"
          style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)" }}
        >
          우리 둘만의 공간
        </motion.h1>
        <motion.p className="text-center text-white/70 mb-6 md:mb-8 text-sm md:text-base">
          생일을 입력해주세요 (MMDD)
        </motion.p>

        {/* フォーム */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <motion.input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••"
              className={`w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl text-center text-xl md:text-2xl tracking-widest bg-white/10 backdrop-blur-sm border-2 ${
                error ? "border-red-400" : "border-white/20"
              } text-white placeholder-white/40 focus:outline-none focus:border-[#D4A5A5] transition-colors`}
              autoFocus
            />
            {error && (
              <motion.p
                className="text-red-400 text-sm text-center mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                비밀번호가 틀렸어요
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 md:py-4 rounded-2xl bg-gradient-to-r from-[#D4A5A5] to-[#B8A4C9] text-white font-medium text-base md:text-lg shadow-lg"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(212, 165, 165, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Heart size={20} fill="white" />
              들어가기
            </span>
          </motion.button>
        </motion.form>

        {/* 装飾的なハート */}
        <motion.div
          className="flex justify-center gap-2 mt-6 md:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              <Heart className="text-[#D4A5A5]" size={16} fill="#D4A5A5" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
