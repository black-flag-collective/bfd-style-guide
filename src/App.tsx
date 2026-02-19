import { useState } from "react";
import { StyleGuideSidebar } from "@/components/StyleGuideSidebar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoSection } from "@/components/sections/LogoSection";
import { ColorSection } from "@/components/sections/ColorSection";
import { TypographySection } from "@/components/sections/TypographySection";
import { MotionSection } from "@/components/sections/MotionSection";
import { ComponentSection } from "@/components/sections/ComponentSection";
import { FormPatternsSection } from "@/components/sections/FormPatternsSection";
import { SurfacePatternsSection } from "@/components/sections/SurfacePatternsSection";
import { FeedbackSection } from "@/components/sections/FeedbackSection";
import { NavigationSection } from "@/components/sections/NavigationSection";
import { VendorLogosSection } from "@/components/sections/VendorLogosSection";
import { DataPatternsSection } from "@/components/sections/DataPatternsSection";
import { VoiceSection } from "@/components/sections/VoiceSection";
import { EventCardsSection } from "@/components/sections/EventCardsSection";
import { PageLayoutsSection } from "@/components/sections/PageLayoutsSection";
import { ComplexComponentsSection } from "@/components/sections/ComplexComponentsSection";
import { Footer } from "@/components/Footer";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F4F4F5" }}>
      <StyleGuideSidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingLeft: "clamp(1.5rem, 3vw, 3.5rem)" }}>
          <HeroSection />
          <LogoSection />
          <ColorSection />
          <TypographySection />
          <MotionSection />
          <ComponentSection />
          <FormPatternsSection />
          <SurfacePatternsSection />
          <FeedbackSection />
          <NavigationSection />
          <VendorLogosSection />
          <DataPatternsSection />
          <VoiceSection />
          <EventCardsSection />
          <PageLayoutsSection />
          <ComplexComponentsSection />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
