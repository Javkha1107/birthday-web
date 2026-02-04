import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { Navigation } from "@/app/components/Navigation";
import { HeroSection } from "@/app/components/HeroSection";
import { Timeline } from "@/app/components/Timeline";
import { LetterSection } from "@/app/components/LetterSection";
// import { MusicSection } from "@/app/components/MusicSection";
import { MessageForm } from "@/app/components/MessageForm";
import { EndingSection } from "@/app/components/EndingSection";
import { PasswordGate } from "@/app/components/PasswordGate";

export default function App() {
  return (
    <LanguageProvider>
      <PasswordGate>
        <div className="min-h-screen bg-[#2d1b3d]">
          <Navigation />
          <LanguageSwitcher />

          <HeroSection />
          <Timeline />
          <LetterSection />
          {/* <MusicSection /> */}
          <MessageForm />
          <EndingSection />
        </div>
      </PasswordGate>
    </LanguageProvider>
  );
}
