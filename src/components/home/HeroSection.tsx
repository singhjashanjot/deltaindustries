import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "/IMAGES/herosection/hero1.webp",
  "/IMAGES/herosection/hero2.webp",
  "/IMAGES/herosection/hero3.webp",
  "/IMAGES/wa/bgless1.webp",
  "/IMAGES/wa/bgless2.webp",
  "/IMAGES/wa/bgless3.webp",
];

const statsData = [
  { value: "27+", label: "Years of Craft" },
  { value: "1.5Cr+", label: "Trophies Delivered" },
  { value: "1998", label: "Established Year" },
  { value: "11-25", label: "Skilled Artisans" },
  { value: "5000+", label: "Sq Ft Facility" }
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    const statInterval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % statsData.length);
    }, 2500);
    return () => {
      clearInterval(interval);
      clearInterval(statInterval);
    };
  }, []);

  return (
    <section className="w-full bg-[#ffffe3] text-[#35020D] flex flex-col justify-center pt-28 pb-8 lg:pt-48 lg:pb-12 selection:bg-[#35020D] selection:text-white overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto px-6 md:px-12 scale-95 lg:scale-90 transform-gpu origin-top">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-8 lg:mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] text-[#35020D] leading-[1.15] tracking-tight mb-4 lg:mb-6 font-medium">
            Premium <span className="text-[#795900]">Recognition Awards</span><br className="hidden md:block" /> for Corporate, Sports & Academic Excellence
          </h1>
          <p className="text-base md:text-lg text-[#35020D]/80 max-w-2xl mx-auto mb-6 lg:mb-8 font-medium leading-relaxed">
            Since 1998, Delta Industries has been the trusted manufacturer of bespoke trophies and awards, architecting legacies for prestigious events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-10 lg:my-16 ">
            <Link 
              to="/products"
              className="px-8 py-3.5 rounded-full bg-[#35020D] text-white font-semibold text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Explore Products
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-[#35020D]/20 text-[#35020D] font-semibold text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-transform hover:bg-[#35020D]/5 w-full sm:w-auto"
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
          {/* Column 1: Showcase */}
          <div className="lg:col-span-5 flex flex-col h-[350px] lg:h-full">
            <div className="bg-[#e4e4c9] rounded-2xl p-6 lg:p-10 flex flex-col items-center justify-between relative overflow-hidden h-full shadow-sm group border border-[#35020D]/5">
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent z-0"></div>
              {/* Decorative elements to make it extra special */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] lg:text-[180px] font-bold font-serif text-[#35020D]/15 whitespace-nowrap pointer-events-none tracking-tighter z-0">
                DELTA
              </div>
              <div className="absolute top-[20%] left-[15%] text-[#35020D]/30 animate-pulse pointer-events-none">✦</div>
              <div className="absolute bottom-[25%] right-[15%] text-[#35020D]/30 animate-pulse [animation-delay:1s] pointer-events-none text-xl">✦</div>
              <div className="absolute top-[40%] right-[10%] text-[#35020D]/20 animate-pulse [animation-delay:0.5s] pointer-events-none text-sm">✦</div>
              
              {/* Top Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#35020D]/10 bg-white/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[#35020D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                  Trending
                </span>
              </div>
              
              <div className="z-10 text-center shrink-0">
                <h3 className="text-2xl lg:text-4xl font-medium text-[#35020D] mb-2 lg:mb-3 tracking-tight">Crafting Excellence</h3>
                <p className="text-base lg:text-lg text-[#35020D]/80 max-w-sm mx-auto font-medium hidden sm:block">
                  Premium trophies & custom awards designed for corporate events & more.
                </p>
              </div>
              
              <div className="w-full flex-1 relative min-h-0 my-4 z-10 transition-transform duration-700 ease-out group-hover:scale-105">
                <AnimatePresence>
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    alt="Premium custom award" 
                    className="absolute inset-0 object-contain drop-shadow-2xl w-full h-full scale-[1.15] origin-center" 
                    src={heroImages[currentImageIndex]} 
                  />
                </AnimatePresence>
              </div>
              
              <div className="z-10 shrink-0 relative">
                <div className="absolute inset-0 bg-[#35020D] blur-md opacity-10 rounded-full translate-y-1"></div>
                <Link 
                  to="/products"
                  className="relative px-6 py-2.5 rounded-full border border-[#35020D]/10 text-[#35020D] font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all bg-white/70 backdrop-blur-md shadow-sm inline-block hover:-translate-y-0.5"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: In-House Manufacturing */}
          <div className="lg:col-span-4 flex flex-col h-[300px] lg:h-full">
            <div className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center h-full shadow-sm group p-6 lg:p-10 text-center border border-[#35020D]/5 bg-[#e4e4c9]">
              {/* Clean Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('/IMAGES/herosection/cream_trophy_bg.webp')` }}
              ></div>
              {/* Light overlay to match theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#e4e4c9] via-[#e4e4c9]/60 to-transparent"></div>
              
              {/* Decorative Border Frame */}
              <div className="absolute inset-4 border border-[#35020D]/10 rounded-xl z-10 pointer-events-none transition-transform duration-700 group-hover:scale-[0.98]"></div>
              
              {/* Content */}
              <div className="relative z-20 flex flex-col items-center justify-end h-full w-full pb-2">
                <h3 className="text-2xl lg:text-3xl font-medium tracking-tight text-[#35020D] mb-2 drop-shadow-sm mt-auto">In-House<br/>Manufacturing</h3>
                <p className="text-xs lg:text-sm text-[#35020D]/80 font-medium max-w-[200px]">
                  Precision crafting in our advanced facilities.
                </p>
                <Link 
                  to="/custom-orders"
                  className="mt-5 px-6 py-2.5 rounded-full border border-[#35020D]/10 text-[#35020D] font-semibold text-[10px] tracking-widest uppercase hover:bg-white transition-colors shadow-sm backdrop-blur-md bg-white/70"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3: Stacked Items */}
          <div className="lg:col-span-3 flex lg:flex-col flex-row gap-4 lg:gap-6 h-[200px] lg:h-full">
            {/* Flexible Sizes Card */}
            <div className="bg-[#e4e4c9] rounded-2xl p-4 lg:p-6 flex flex-col items-center justify-between lg:h-1/2 flex-1 shadow-sm group relative overflow-hidden border border-[#35020D]/5">
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent z-0"></div>
              
              {/* Decorative radial glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/50 rounded-full blur-2xl z-0"></div>
              
              <div className="w-full flex-1 relative min-h-0 mt-6 mb-2 z-10 transition-transform duration-700 ease-out group-hover:scale-[1.15]">
                <img 
                  alt="Flexible Sizes Available" 
                  className="absolute inset-0 object-contain drop-shadow-lg w-full h-full scale-x-[2.00] scale-y-[1.65] origin-center" 
                  src="/IMAGES/herosection/image.webp" 
                />
              </div>
              <div className="z-10 w-full text-center shrink-0 relative mt-2">
                <div className="inline-block px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-[#35020D]/5 mb-1">
                  <p className="text-xs lg:text-sm font-semibold text-[#35020D]">Flexible Sizes</p>
                </div>
                <p className="text-[9px] lg:text-[10px] text-[#35020D]/60 uppercase tracking-widest">Custom Dimensions</p>
              </div>
            </div>
            
            {/* Stats Showcase Card */}
            <div className="bg-[#e4e4c9] rounded-2xl p-4 lg:p-6 flex flex-col items-center justify-center lg:h-1/2 flex-1 shadow-sm group border border-[#35020D]/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent z-0"></div>
              
              {/* Subtle background image texture */}
              <div 
                className="absolute inset-0 opacity-[0.03] bg-cover bg-center mix-blend-multiply"
                style={{ backgroundImage: `url('/IMAGES/herosection/hero1.webp')` }}
              ></div>

              <div className="z-10 w-full relative h-full flex flex-col items-center justify-center">
                 <p className="text-[9px] lg:text-[10px] font-bold text-[#35020D]/40 uppercase tracking-[0.2em] mb-auto mt-2">Delta Legacy</p>
                 
                 <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden min-h-[80px]">
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={currentStatIndex}
                       initial={{ opacity: 0, y: 15, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: -15, scale: 0.95 }}
                       transition={{ duration: 0.4, ease: "easeOut" }}
                       className="absolute inset-0 flex flex-col items-center justify-center w-full h-full"
                     >
                       <span className="text-4xl lg:text-5xl font-black text-[#35020D] tracking-tighter mb-1 font-serif drop-shadow-sm">
                         {statsData[currentStatIndex].value}
                       </span>
                       <span className="text-[10px] lg:text-xs font-bold text-[#35020D]/80 uppercase tracking-widest text-center px-4">
                         {statsData[currentStatIndex].label}
                       </span>
                     </motion.div>
                   </AnimatePresence>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>

     
      </div>
    </section>
  );
};

export default HeroSection;
