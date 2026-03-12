import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TrustSection = () => {
  return (
    <section className="bg-[#ffffe3] text-[#35020D] border-t border-b border-[#35020D]/20 selection:bg-[#35020D] selection:text-[#fffff1] font-sans">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start w-full">
          {/* Left Title */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-sm md:text-base font-semibold tracking-tight mt-2 text-[#35020D]">
              Who We Are
            </h3>
          </div>

          {/* Right Content */}
          <div className="md:col-span-8 lg:col-span-8 space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2rem] md:text-5xl lg:text-[4.5rem] font-sans font-normal leading-[1.05] tracking-tight text-[#35020D]"
            >
              Your life evolves. So do we. We deliver forward-looking, adaptive wealth solutions built to anticipate what's next, not react to it.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/about" className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-normal hover:opacity-70 transition-opacity">
                <span className="inline-block w-1.5 h-1.5 border-[1.5px] border-[#35020D] rounded-full"></span>
                <span>More about Who We Are</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;


