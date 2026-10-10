import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ServiceSlider from "@/components/ServiceSlider";
import FlagshipSection from "@/components/FlagshipSection";
import EditsSection from "@/components/EditsSection";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import ShopMenu from "@/components/ShopMenu";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <CategoryGrid />
        <ServiceSlider />
        <FlagshipSection />
        <EditsSection />
      </main>
      <Footer />
      <ShopMenu />
      <ScrollAnimations />
    </>
  );
}