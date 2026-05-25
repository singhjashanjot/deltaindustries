import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const milestones = [
  { year: "1998", label: "Founded in Jalandhar, Punjab as a small trophy workshop" },
  { year: "2010", label: "Expanded to 5,000 sq ft in-house manufacturing facility" },
  { year: "2018", label: "Introduced CNC machining and laser engraving capabilities" },
  { year: "2025", label: "Launched Delta Recognition Hub — replacing IndiaMART with our own digital platform" },
];

const TrustSection = () => {
  return (
    <section className="w-full min-h-[800px] md:min-h-[900px] flex items-center bg-[#ffffe3] text-[#35020D] border-t border-b border-[#35020D]/20 selection:bg-[#35020D] selection:text-[#fffff1] font-sans">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-40 md:py-64 w-full">
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
              className="text-[1.8rem] md:text-5xl lg:text-[4rem] font-sans font-normal leading-[1.05] tracking-tight text-[#35020D]"
            >
              For 27 years, we have manufactured trophies, awards, and recognition pieces — every single one made under one roof in Jalandhar, Punjab.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-[#35020D]/70 leading-relaxed max-w-2xl"
            >
              What began as a small workshop has grown into a full-capability manufacturing unit. Our team of 11 to 25 artisans and technicians handles everything in-house — woodworking, metal casting, acrylic fabrication, laser engraving, CNC machining, and finishing. No outsourcing. No middlemen. Just direct craftsmanship from our facility to your event.
            </motion.p>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-0 border-l-2 border-[#35020D]/15 ml-2"
            >
              {milestones.map((m, i) => (
                <div key={m.year} className="relative pl-8 pb-6 last:pb-0">
                  <div className="absolute left-0 top-0.5 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#35020D]/30 bg-[#ffffe3]" />
                  <span className="text-sm font-semibold text-[#35020D] tracking-wide">{m.year}</span>
                  <span className="text-sm text-[#35020D]/60 ml-3 font-normal">{m.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
