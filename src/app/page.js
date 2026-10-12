import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import CategoryGrid from "@/components/CategoryGrid";
import CollectionSection from "@/components/CollectionSection";
import ServiceSlider from "@/components/ServiceSlider";
import BestSellers from "@/components/BestSellers";
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
<CollectionSection />
<ServiceSlider />
<BestSellers />
<FlagshipSection />
        <EditsSection />
      </main>
      <Footer />
      <ShopMenu />
      <ScrollAnimations />
    </>
  );
}