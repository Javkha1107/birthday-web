import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { UtensilsCrossed, Heart } from "lucide-react";

export function CurrySection() {
  const { t } = useLanguage();

  const textItems = [
    "curryText1",
    "curryText2",
    "curryText3",
    "curryText4",
    "curryText5",
  ];

  return (
    <section
      id="curry"
      className="py-20 px-6 bg-gradient-to-br from-[#2d1b3d] via-[#4a2c5a] to-[#6B4E71]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#D4A5A5] to-[#B8A4C9] mb-6"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            style={{
              boxShadow:
                "0 10px 30px rgba(212, 165, 165, 0.3), inset 0 2px 5px rgba(255, 255, 255, 0.2)",
            }}
          >
            <UtensilsCrossed className="text-white" size={40} />
          </motion.div>
          <h2
            className="text-4xl md:text-5xl text-white"
            style={{
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            {t("curryTitle")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Curry image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://images.unsplash.com/photo-1729824159986-376b49c6b7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJyeSUyMGRpc2glMjBmb29kfGVufDF8fHx8MTc2ODc4NDcyOHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Curry"
              className="w-full h-full object-cover aspect-square"
            />
            {/* Decorative overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#D4A5A5]/20 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Text cards */}
          <div className="space-y-4">
            {textItems.map((textKey, index) => (
              <motion.div
                key={textKey}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#D4A5A5]/20"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[#2d1b3d] leading-relaxed text-base font-medium">
                    {t(textKey)}
                  </p>
                </motion.div>

                {/* Decorative element for the last item */}
                {index === textItems.length - 1 && (
                  <motion.div
                    className="absolute -right-3 -bottom-3"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A5A5] to-[#E8B4B8] flex items-center justify-center shadow-lg">
                      <Heart className="text-white" size={20} fill="white" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="relative mt-12 flex justify-center gap-3">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#D4A5A5]"
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
