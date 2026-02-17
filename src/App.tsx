import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoSection } from "@/components/sections/LogoSection";
import { ColorSection } from "@/components/sections/ColorSection";
import { TypographySection } from "@/components/sections/TypographySection";
import { MotionSection } from "@/components/sections/MotionSection";
import { ComponentSection } from "@/components/sections/ComponentSection";
import { NavigationSection } from "@/components/sections/NavigationSection";
import { VendorLogosSection } from "@/components/sections/VendorLogosSection";
import { DataPatternsSection } from "@/components/sections/DataPatternsSection";
import { VoiceSection } from "@/components/sections/VoiceSection";
import { Footer } from "@/components/Footer";
import { ScrollBackground } from "@/components/effects";

function App() {
  return (
    <ScrollBackground>
      <div className="min-h-screen relative z-0">
        <Navigation />
        <main>
          <HeroSection />
          <LogoSection />
          <ColorSection />
          <TypographySection />
          <MotionSection />
          <ComponentSection />
          <NavigationSection />
          <VendorLogosSection />
          <DataPatternsSection />
          <VoiceSection />
        </main>
        <Footer />
      </div>
    </ScrollBackground>
  );
}

export default App;
