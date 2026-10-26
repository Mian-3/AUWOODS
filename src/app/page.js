import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CollectionSection from "@/components/CollectionSection";
import BestSellers from "@/components/BestSellers";
import FinishStudio from "@/components/FinishStudio";
import HomeFaq from "@/components/HomeFaq";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import ShopMenu from "@/components/ShopMenu";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CollectionSection />
        <BestSellers />
        <FinishStudio />
        <HomeFaq />
        <InstagramFeed />
      </main>
      <Footer />
      <ShopMenu />
      <ScrollAnimations />
    </>
  );
}