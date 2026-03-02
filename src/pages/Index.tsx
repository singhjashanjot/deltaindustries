import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ManufacturingSection from "@/components/home/ManufacturingSection";
import WhyDeltaSection from "@/components/home/WhyDeltaSection";
import GallerySection from "@/components/home/GallerySection";
import CTABand from "@/components/home/CTABand";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustSection />
      <CategoriesSection />
      <ManufacturingSection />
      <WhyDeltaSection />
      <GallerySection />
      <CTABand />
    </Layout>
  );
};

export default Index;
