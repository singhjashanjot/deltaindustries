import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ManufacturingSection from "@/components/home/ManufacturingSection";
import WhyDeltaSection from "@/components/home/WhyDeltaSection";
import GallerySection from "@/components/home/GallerySection";
import CTABand from "@/components/home/CTABand";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
     
      <main className="flex-1">
        <HeroSection />
        <TrustSection />
        <CategoriesSection />
        <ManufacturingSection />
        <WhyDeltaSection />
        <GallerySection />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

