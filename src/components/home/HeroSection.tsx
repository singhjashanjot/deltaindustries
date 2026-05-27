import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const heroImages = [
  "/IMAGES/herosection/hero1.png",
  "/IMAGES/herosection/hero2.png",
  "/IMAGES/herosection/hero3.png",
];

const HeroSection = () => {
  return (
    <section className="w-full bg-[#ffffe3] text-[#1a1c14] flex flex-col justify-center pt-28 pb-8 lg:pt-32 lg:pb-12 selection:bg-[#3c0612] selection:text-white font-sans overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-8 lg:mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] text-[#3c0612] leading-[1.15] tracking-tight mb-4 lg:mb-6 font-semibold">
            Premium <span className="text-[#795900]">Recognition Awards</span><br className="hidden md:block" /> for Corporate, Sports & Academic Excellence
          </h1>
          <p className="text-base md:text-lg text-[#534344] max-w-2xl mx-auto mb-6 lg:mb-8 font-medium leading-relaxed">
            Since 1998, Delta Industries has been the trusted manufacturer of bespoke trophies and awards, architecting legacies for prestigious events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/products"
              className="px-8 py-3.5 rounded-full bg-[#3c0612] text-white font-semibold text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Explore Products
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-[#3c0612]/20 text-[#3c0612] font-semibold text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-transform hover:bg-[#f4f4e7] w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Asymmetrical Grid Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 lg:h-[500px]"
        >
          {/* Column 1: Powering Agriculture Showcase */}
          <div className="lg:col-span-5 flex flex-col h-[350px] lg:h-full">
            <div className="bg-[#e4e4c9] rounded-2xl p-6 lg:p-10 flex flex-col items-center justify-between relative overflow-hidden h-full shadow-sm group">
              <div className="z-10 text-center shrink-0">
                <h3 className="text-xl lg:text-3xl font-medium text-[#1a1c14] mb-2 lg:mb-3">Crafting Excellence</h3>
                <p className="text-sm text-[#534344] max-w-xs mx-auto font-medium hidden sm:block">
                  Premium trophies & custom awards designed for corporate events & more.
                </p>
              </div>
              <div className="w-full flex-1 relative min-h-0 my-4 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <img 
                  alt="Premium custom award" 
                  className="absolute inset-0 object-contain drop-shadow-xl w-full h-full" 
                  src={heroImages[0]} 
                />
              </div>
              <div className="z-10 shrink-0">
                <Link 
                  to="/products"
                  className="px-6 py-2.5 rounded-full border border-[#3c0612]/20 text-[#3c0612] font-semibold text-xs tracking-widest uppercase hover:bg-white transition-colors bg-white/80 backdrop-blur-sm shadow-sm inline-block"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: 4 HP Water Cooled Diesel Engine */}
          <div className="lg:col-span-4 flex flex-col h-[300px] lg:h-full">
            <div className="bg-[#f4f4e7] rounded-2xl p-6 lg:p-10 flex flex-col items-center justify-between h-full shadow-sm group">
              <div className="w-full flex-1 relative min-h-0 mb-4 transition-transform duration-700 ease-out group-hover:scale-105">
                <img 
                  alt="Premium corporate trophy" 
                  className="absolute inset-0 object-contain drop-shadow-xl w-full h-full" 
                  src={heroImages[1]} 
                />
              </div>
              <p className="text-sm lg:text-base font-medium text-[#1a1c14] text-center shrink-0">Premium Corporate Trophy</p>
            </div>
          </div>

          {/* Column 3: Stacked Items */}
          <div className="lg:col-span-3 flex lg:flex-col flex-row gap-4 lg:gap-6 h-[200px] lg:h-full">
            <div className="bg-[#f4f4e7] rounded-2xl p-4 lg:p-8 flex flex-col items-center justify-between lg:h-1/2 flex-1 shadow-sm group">
              <div className="w-full flex-1 relative min-h-0 mb-3 transition-transform duration-700 ease-out group-hover:scale-105">
                <img 
                  alt="Crystal Award" 
                  className="absolute inset-0 object-contain drop-shadow-xl w-full h-full" 
                  src={heroImages[2]} 
                />
              </div>
              <p className="text-xs lg:text-sm font-medium text-[#1a1c14] text-center shrink-0">Crystal Award</p>
            </div>
            <div className="bg-[#f4f4e7] rounded-2xl p-4 lg:p-8 flex flex-col items-center justify-between lg:h-1/2 flex-1 shadow-sm group">
              <div className="w-full flex-1 relative min-h-0 mb-3 transition-transform duration-700 ease-out group-hover:scale-105">
                <img 
                  alt="Metal Cup Trophy" 
                  className="absolute inset-0 object-contain drop-shadow-xl w-full h-full" 
                  src={heroImages[0]} 
                />
              </div>
              <p className="text-xs lg:text-sm font-medium text-[#1a1c14] text-center shrink-0">Metal Cup Trophy</p>
            </div>
          </div>
        </motion.div>

        {/* Carousel Indicators Mock */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-2 justify-center mt-8 shrink-0"
        >
          <div className="w-8 h-2 bg-[#534344] rounded-full opacity-80"></div>
          <div className="w-8 h-2 bg-[#534344] rounded-full opacity-30"></div>
          <div className="w-8 h-2 bg-[#534344] rounded-full opacity-30"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
