import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TrustSection = () => {
  return (
    <section className="bg-[#1b1610] text-[#EFECE1] border-t border-[#EFECE1]/10 selection:bg-[#EFECE1] selection:text-[#1b1610]">
      <div className="mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start w-full">
          {/* Left Title */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-lg md:text-xl font-medium tracking-tight mt-2 text-[#EFECE1]">
              Who We Are
            </h3>
          </div>
          
          {/* Right Content */}
          <div className="md:col-span-8 lg:col-span-9 space-y-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2rem] md:text-5xl lg:text-[4.5rem] font-normal leading-[1.1] tracking-tight text-[#EFECE1]"
            >
              Your recognition needs evolve. So do we. We deliver forward-looking manufacturing solutions built to anticipate what&#39;s next, not react to it.
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/about" className="inline-flex items-center gap-4 text-xs md:text-sm font-semibold tracking-widest hover:opacity-70 transition-opacity uppercase border-b border-[#EFECE1] pb-2">
                <span>More about Who We Are</span>
                <span className="text-xl leading-none font-light">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
