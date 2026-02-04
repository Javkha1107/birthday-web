import { useLanguage, Language } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "mn", label: "MN" },
    { code: "kr", label: "KR" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex gap-1.5 bg-white/95 backdrop-blur-md rounded-full px-2 py-1.5 shadow-lg border border-gray-200">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            language === lang.code
              ? "bg-[#4a2c5a] text-white shadow-md"
              : "text-gray-600 hover:text-[#4a2c5a] hover:bg-[#4a2c5a]/10"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
}
