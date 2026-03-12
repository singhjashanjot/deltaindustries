import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-[#1b1610] text-[#EFECE1] min-h-[95vh] flex flex-col pt-24 pb-12 selection:bg-[#EFECE1] selection:text-[#1b1610] overflow-hidden justify-between">
      {/* Top massive text */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative flex flex-col items-center justify-center mt-4 md:-mt-8"
      >
        <h1 className="text-[28vw] leading-[0.75] font-bold tracking-tighter w-full text-center lowercase pr-[2vw] mb-4">
          delta
        </h1>
        
        {/* Nav links right under the text */}
        <div className="flex justify-center md:justify-end items-center gap-4 md:gap-8 lg:gap-12 w-full mt-4 md:mt-2 px-6 md:px-12 relative z-10 text-xs md:text-sm font-semibold tracking-wide flex-wrap">
          <Link to="/products" className="hover:opacity-70 transition-opacity">Categories</Link>
          <Link to="/about" className="hover:opacity-70 transition-opacity">Who We Are</Link>
          <Link to="/contact" className="hover:opacity-70 transition-opacity">Our Perspectives</Link>
          <Link to="/contact" className="bg-[#EFECE1] text-[#1b1610] px-6 py-2.5 rounded-full hover:bg-white transition-colors uppercase text-xs tracking-wider">
            Request Quote
          </Link>
        </div>
      </motion.div>

      {/* Bottom text area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end px-6 md:px-12 mt-16 md:mt-24 w-full">
        {/* Left: Huge tagline */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="lg:col-span-8 space-y-6 md:space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-normal leading-[1.05] tracking-tight">
            Crafting Recognition.<br/> Celebrating Excellence.
          </h2>
          <p className="max-w-md text-[#EFECE1]/80 text-base md:text-lg font-medium leading-relaxed">
            A manufacturing firm that architects trophies, medals, and awards built to honor enduring legacies.
          </p>
        </motion.div>

        {/* Right: Small card */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="lg:col-span-4 flex justify-start lg:justify-end"
        >
          <div className="border-t border-[#EFECE1]/30 pt-6 flex gap-6 max-w-sm w-full">
            <p className="text-sm leading-relaxed text-[#EFECE1]/90 font-medium">
              Delta expands manufacturing capacity with a new state-of-the-art facility in Mumbai to serve global clients.
            </p>
            <div className="w-16 h-16 shrink-0 bg-[#3a3226] rounded flex items-center justify-center p-2">
              <div className="w-full h-full border border-[#EFECE1]/20 rounded-sm bg-[#EFECE1]/5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
