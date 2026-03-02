import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "27+ years of continuous manufacturing operations",
  "Direct manufacturer — no middlemen, best pricing",
  "Consistent quality across every batch and order",
  "200+ products across wood, metal, acrylic, crystal & more",
  "Full customization: engraving, logos, sizes, materials",
  "Trusted by schools, colleges, corporates, and government bodies",
  "Pan-India delivery with reliable logistics",
  "GST registered, fully compliant business operations",
];

const WhyDeltaSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Differentiators</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Why Delta Industries
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 skeu-card rounded-xl p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-relaxed">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDeltaSection;
