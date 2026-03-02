import { motion } from "framer-motion";
import { Cog, Paintbrush, Layers, Zap } from "lucide-react";
import manufacturingImg from "@/assets/manufacturing.jpg";

const features = [
  { icon: Cog, title: "Advanced Machinery", desc: "CNC, laser engraving, and precision tools for consistent output." },
  { icon: Paintbrush, title: "Custom Designs", desc: "Fully personalized engravings, logos, and bespoke shapes." },
  { icon: Layers, title: "Material Expertise", desc: "Wood, metal, acrylic, crystal, marble — mastery across all." },
  { icon: Zap, title: "Bulk Production", desc: "Scalable manufacturing for orders of any volume." },
];

const ManufacturingSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={manufacturingImg} alt="Delta Industries manufacturing facility" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 shadow-premium hidden md:block">
              <div className="text-2xl font-serif font-bold text-primary">27+</div>
              <div className="text-xs text-muted-foreground">Years of Manufacturing</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Craftsmanship</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">
                In-House Manufacturing & Customization
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every trophy that leaves our Jalandhar facility is a product of precision engineering and artisan craftsmanship. From raw material to finished product — everything happens under one roof.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="skeu-card rounded-xl p-5 space-y-2">
                  <f.icon className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-sm text-foreground">{f.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingSection;
