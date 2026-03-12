import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#ffffe3] text-[#35020D] h-[700px] md:h-[800px] 2xl:h-[900px] flex flex-col pt-0 pb-8 md:pb-12 selection:bg-[#35020D] selection:text-[#fffff1] overflow-hidden justify-between font-sans">
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
         
        {/* Nav links right under the text - They fade out when scrolled and Global Navbar takes over */}
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

      {/* Bottom text area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end px-6 md:px-12 mt-auto w-full max-w-screen-2xl mx-auto pb-2 md:pb-4">
        {/* Left: Huge tagline */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="lg:col-span-8 space-y-4 md:space-y-6"
        >
          <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-sans font-normal leading-[1.05] tracking-tight text-[#35020D]">
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


