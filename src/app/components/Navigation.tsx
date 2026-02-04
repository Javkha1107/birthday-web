import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Heart, Clock, Mail, MessageSquare, Sparkles } from "lucide-react";

const navItems = [
  { id: "hero", icon: Heart, labelKey: "navHero" },
  { id: "timeline", icon: Clock, labelKey: "navTimeline" },
  { id: "letter", icon: Mail, labelKey: "navLetter" },
  // { id: "music", icon: Music, labelKey: "navMusic" },
  { id: "message", icon: MessageSquare, labelKey: "navMessage" },
  { id: "ending", icon: Sparkles, labelKey: "navEnding" },
];

export function Navigation() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <motion.div
        className="max-w-7xl mx-auto rounded-2xl overflow-hidden"
        animate={{
          backgroundColor: isScrolled
            ? "rgba(93, 78, 111, 0.95)"
            : "rgba(107, 78, 113, 0.7)",
          boxShadow: isScrolled
            ? "0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 5px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
        style={{
          backdropFilter: "blur(20px)",
          transform: "translateZ(0)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* 3D effect top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="flex items-center justify-center gap-2 md:gap-4 px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="relative px-3 md:px-4 py-2 md:py-2.5 rounded-xl flex items-center gap-2 overflow-hidden"
                  animate={{
                    backgroundColor: isActive
                      ? "rgba(212, 165, 165, 0.3)"
                      : "rgba(255, 255, 255, 0.05)",
                    boxShadow: isActive
                      ? "0 4px 15px rgba(212, 165, 165, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.2)"
                      : "0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transform: isActive ? "translateY(1px)" : "translateY(0)",
                  }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <Icon
                    size={16}
                    className={`relative z-10 transition-colors ${
                      isActive ? "text-[#D4A5A5]" : "text-white/80"
                    }`}
                  />
                  <span
                    className={`hidden md:block relative z-10 text-sm transition-colors ${
                      isActive ? "text-white" : "text-white/80"
                    }`}
                  >
                    {t(item.labelKey)}
                  </span>
                </motion.div>

                {/* Active indicator - 3D bottom line */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-[#D4A5A5] to-[#E8B4B8] rounded-full"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{ width: "80%", x: "-50%" }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: "0 2px 8px rgba(212, 165, 165, 0.6)",
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* 3D effect bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      </motion.div>
    </motion.nav>
  );
}
