import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-[#ffffe3] text-[#35020D] h-screen flex flex-col pt-0 pb-8 md:pb-12 selection:bg-[#35020D] selection:text-[#fffff1] overflow-hidden justify-between font-sans">
      {/* Top massive text */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-screen-2xl mx-auto relative flex flex-col pt-4 md:pt-8"
      >
        <h1 
          className="leading-[0.8] md:leading-[0.85] lg:leading-[0.85] w-full text-left line-clamp-2 text-[#35020D] px-6 md:px-12 font-black"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: '-0.06em', fontSize: 'clamp(4rem, 13vw, 15rem)' }}
        >
          Delta<br />Industries
        </h1> 
         
        {/* Nav links right under the text */}
        <div className="flex justify-end items-center gap-6 md:gap-10 lg:gap-14 w-full mt-8 md:mt-12 px-6 md:px-12 relative z-10 text-sm md:text-base font-medium tracking-tight flex-wrap">
          <Link to="/products" className="hover:opacity-70 transition-opacity">What We Do</Link>
          <Link to="/about" className="hover:opacity-70 transition-opacity">Who We Are</Link>
          <Link to="/contact" className="hover:opacity-70 transition-opacity">Our Perspectives</Link>
          <div className="flex items-center bg-[#35020D] text-[#fffff1] px-5 py-2.5 lg:px-6 lg:py-3 rounded-[2rem] hover:bg-[#35020D] transition-colors cursor-pointer shadow-sm ml-4">
            <span className="font-semibold text-sm md:text-base tracking-tight mr-2">Client Login</span>
            <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 border-[1.5px] border-[#fffff1] rounded-full mt-[1px]"></span>
          </div>
        </div>
      </motion.div>

      {/* Bottom text area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end px-6 md:px-12 mt-auto w-full max-w-screen-2xl mx-auto pb-2 md:pb-4">
        {/* Left: Huge tagline */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="lg:col-span-8 space-y-4 md:space-y-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-normal leading-[1.05] tracking-tight text-[#35020D]">
            Crafting Recognition.<br/> Personally Guided.
          </h2>
          <p className="max-w-md text-[#35020D]/90 text-sm md:text-base font-medium leading-relaxed">
            A manufacturing firm that architects legacies built to last.
          </p>
        </motion.div>

        {/* Right: Small card */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="lg:col-span-4 flex justify-start lg:justify-end"
        >
          <div className="border-t border-[#35020D]/30 pt-4 flex gap-6 max-w-[320px] w-full items-start">
            <p className="text-xs md:text-sm leading-relaxed text-[#35020D] font-medium mt-1">
              Delta Expands to New York<br />
              City and Welcomes New<br />
              Managing Partner
            </p>
            <div className="w-12 h-12 shrink-0 bg-[#35020D]/5 rounded-sm flex items-center justify-center p-1.5 ml-auto">
              <div className="w-full h-full border border-[#35020D]/20 rounded-sm" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;


