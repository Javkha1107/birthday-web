import { useLanguage } from "@/app/contexts/LanguageContext";
import { motion } from "motion/react";
import { useState } from "react";
import { Send } from "lucide-react";

export function MessageForm() {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/mpqlvbjw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section
      id="message"
      className="py-20 px-6 bg-gradient-to-b from-[#6B4E71] to-[#4a2c5a]"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          {t("formTitle")}
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="bg-[#FAF5F7] rounded-3xl p-8 md:p-12 space-y-6"
            style={{
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Message field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("formPlaceholder")}
                rows={6}
                required
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full px-6 py-4 rounded-2xl border-2 border-[#D4A5A5]/30 bg-white/50 text-[#4A4A4A] placeholder-[#9A9A9A] focus:outline-none focus:border-[#D4A5A5] transition-colors resize-none"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                animate={isFocused ? { borderColor: "#D4A5A5" } : {}}
              />
            </motion.div>

            {/* Submit button */}
            <motion.div
              className="flex justify-center pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                type="submit"
                className="group relative px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-[#4a2c5a] to-[#6B4E71] text-white rounded-full shadow-lg flex items-center gap-2 md:gap-3 overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(74, 44, 90, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                disabled={isSubmitted}
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#6B4E71] to-[#4a2c5a]"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 text-sm md:text-lg">
                  {!isSubmitted ? t("formSuccess") : t("formSubmit")}
                </span>
                <motion.div
                  className="relative z-10"
                  animate={isSubmitted ? { rotate: 360 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Send size={16} className="md:w-5 md:h-5" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Success message */}
            {/* {isSubmitted && (
              <motion.div
                className="text-center text-[#4a2c5a] mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg font-medium">{t("formSuccess")}</p>
              </motion.div>
            )} */}
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A5A5] to-[#E8B4B8] opacity-20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#B8A4C9] to-[#D4A5A5] opacity-20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.form>
      </div>
    </section>
  );
}
