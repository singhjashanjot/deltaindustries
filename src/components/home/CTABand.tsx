import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTABand = () => {
  return (
    <section className="py-24 md:py-32 bg-[#EFECE1] text-[#1b1610] selection:bg-[#1b1610] selection:text-[#EFECE1]">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl w-full"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-normal tracking-tight leading-[1.05]">
            Architecting Legacies, <br className="hidden md:block"/>
            One Award at a Time
          </h2>
          <p className="mt-8 text-base md:text-xl font-medium text-[#1b1610]/70 max-w-2xl mx-auto leading-relaxed">
            Whether it&#39;s an annual sports day, corporate awards ceremony, or academic excellence program — we manufacture custom trophies tailored to your event.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="bg-[#1b1610] text-[#EFECE1] px-8 py-4 rounded-full uppercase text-xs md:text-sm tracking-widest font-semibold hover:bg-[#1b1610]/80 transition-colors">
              Request Custom Quote
            </Link>
            <Link to="/custom-orders" className="border border-[#1b1610]/30 text-[#1b1610] px-8 py-4 rounded-full uppercase text-xs md:text-sm tracking-widest font-semibold hover:bg-[#1b1610]/5 transition-colors">
              Learn Construction
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABand;

