import { motion } from "framer-motion";

const reasons = [
  "27+ years of continuous manufacturing operations.",
  "Direct manufacturer — no middlemen, best pricing.",
  "Consistent quality across every batch and order.",
  "200+ products across wood, metal, acrylic, crystal & more.",
  "Full customization: engraving, logos, sizes, materials.",
  "Trusted by schools, colleges, corporates, and associations.",
  "Pan-India delivery with reliable logstics.",
  "GST registered, fully compliant business operations."
];

const WhyDeltaSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#EFECE1] text-[#1b1610] selection:bg-[#1b1610] selection:text-[#EFECE1]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.1] sticky top-32">
              The Delta Advantage
            </h2>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col pt-2 lg:pt-0">
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 border-b border-[#1b1610]/10 first:border-t flex items-start gap-6 group hover:translate-x-2 transition-transform duration-500 ease-out"
              >
                <div className="text-xs font-semibold tracking-widest text-[#1b1610]/40 w-8 pt-1">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div className="text-base md:text-lg font-medium text-[#1b1610]/90">
                  {reason}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDeltaSection;

