import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const stats = [
  { value: "27+", label: "Years of Craft" },
  { value: "1.5Cr+", label: "Trophies Delivered" },
  { value: "5,000", label: "Sq Ft Facility" },
];

const heroImages = [
  "/IMAGES/herosection/hero1.png",
  "/IMAGES/herosection/hero2.png",
  "/IMAGES/herosection/hero3.png",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#ffffe3] text-[#35020D] min-h-[700px] md:min-h-[800px] 2xl:min-h-[900px] flex flex-col pt-0 pb-8 md:pb-12 selection:bg-[#35020D] selection:text-[#fffff1] overflow-hidden justify-between font-sans relative">
      {/* Background Trophy 3D Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mt-20 md:mt-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 0.45, scale: 1, filter: "blur(2px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute h-[60%] md:h-[80%] max-h-[700px] w-auto object-contain mix-blend-multiply"
            alt="Trophy background"
          />
        </AnimatePresence>
      </div>

      {/* Top massive text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-screen-2xl mx-auto relative flex flex-col pt-4 md:pt-8 z-10"
      >
        <h1
          className="leading-[0.8] md:leading-[0.85] lg:leading-[0.85] w-full text-left line-clamp-2 text-[#35020D] px-6 md:px-12 font-black"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: '-0.06em', fontSize: 'clamp(4rem, 13vw, 15rem)' }}
        >
          Delta<br />Industries
        </h1>

        {/* Nav links */}
        <div className="flex justify-end items-center gap-6 md:gap-8 lg:gap-10 w-full mt-8 md:mt-12 px-6 md:px-12 relative z-10 text-sm md:text-base font-medium tracking-tight flex-wrap">
          <Link to="/products" className="group flex flex-col items-center">
            <span className="mb-0.5">Our Range</span>
            <div className="w-0 h-[1.5px] bg-[#35020D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
          <Link to="/custom-orders" className="group flex flex-col items-center">
            <span className="mb-0.5">Manufacturing</span>
            <div className="w-0 h-[1.5px] bg-[#35020D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
          <Link to="/about" className="group flex flex-col items-center">
            <span className="mb-0.5">Who We Are</span>
            <div className="w-0 h-[1.5px] bg-[#35020D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
          <Link to="/quality" className="group flex flex-col items-center">
            <span className="mb-0.5">Quality Focus</span>
            <div className="w-0 h-[1.5px] bg-[#35020D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
          <Link to="/testimonials" className="group flex flex-col items-center">
            <span className="mb-0.5">Reviews</span>
            <div className="w-0 h-[1.5px] bg-[#35020D] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
          <Link to="/contact" className="ml-2 py-2.5 px-6 bg-[#35020D] text-[#fffff1] rounded-full hover:bg-[rgb(35,2,13)] transition-colors shadow-sm font-semibold">
            Contact
          </Link>
        </div>
      </motion.div>

      {/* Bottom area — tagline + stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end px-6 md:px-12 mt-auto w-full max-w-screen-2xl mx-auto pb-2 md:pb-4 relative z-10">
        {/* Left: Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-4 md:space-y-6"
        >
          <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-sans font-normal leading-[1.05] tracking-tight text-[#35020D]">
            Crafting Recognition.<br /> Personally Guided.
          </h2>
          <p className="max-w-md text-[#35020D]/90 text-sm md:text-base font-medium leading-relaxed">
            A manufacturing firm architecting legacies since 1998 in Jalandhar, Punjab.
          </p>
        </motion.div>

        {/* Right: Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-start lg:justify-end"
        >
          <div className="flex gap-8 md:gap-12 border-t border-[#35020D]/20 pt-4 w-full max-w-[420px]">
            {stats.map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="text-xl md:text-2xl font-semibold text-[#35020D] tracking-tight">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-[#35020D]/60 font-medium tracking-wide uppercase mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
