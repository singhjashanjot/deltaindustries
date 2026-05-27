import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cog, Paintbrush, Layers, Zap } from "lucide-react";
import manufacturingImg from "@/assets/manufacturing.jpg";

const features = [
  { icon: Cog, title: "Advanced Machinery", desc: "CNC, laser engraving, and precision tools for consistent output." },
  { icon: Paintbrush, title: "Custom Designs", desc: "Fully personalized engravings, logos, and bespoke shapes." },
  { icon: Layers, title: "Material Expertise", desc: "Wood, metal, acrylic, crystal, marble � mastery across all." },
  { icon: Zap, title: "Bulk Production", desc: "Scalable manufacturing for orders of any volume." },
];

const ManufacturingSection = () => {
  return (
    <section className="w-full min-h-[800px] md:min-h-[900px] flex items-center py-20 md:py-32 bg-[#35020D] text-[#ffffe3] selection:bg-[#ffffe3] selection:text-[#35020D]">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="overflow-hidden bg-[#ffffe3]/5 rounded-sm">
              <img src={manufacturingImg} alt="Delta Industries manufacturing facility" className="w-full h-[600px] object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 ease-\[0.16\,1\,0.3\,1\]" />
            </div>
            {/* Absolute minimalist data tag */}
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-[#ffffe3] text-[#35020D] p-6 md:p-8 flex flex-col gap-1 w-48 shadow-2xl">
              <div className="text-4xl font-normal tracking-tight">27+</div>
              <div className="text-xs font-semibold tracking-widest uppercase">Years</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 lg:pl-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.1]">
                In-House Manufacturing &amp; Customization
              </h2>
              <p className="text-base md:text-lg font-medium text-[#ffffe3]/70 leading-relaxed max-w-lg">
                Every trophy that leaves our Jalandhar facility is a product of precision engineering and artisan craftsmanship. From raw material to finished product � everything happens under one roof.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 border-t border-[#EFECE1]/10 pt-10">
              {features.map((f, i) => (
                <div key={f.title} className="space-y-3 group">
                  <f.icon className="w-6 h-6 text-[#ffffe3]/50 group-hover:text-[#ffffe3] transition-colors" />
                  <h4 className="font-semibold text-sm tracking-wide uppercase">{f.title}</h4>
                  <p className="text-sm text-[#ffffe3]/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
               <Link to="/custom-orders" className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-widest hover:opacity-70 transition-opacity uppercase border-b border-[#EFECE1] pb-1 w-max">
                 <span>Learn About Manufacturing</span>
                 <span className="text-lg leading-none font-light">&rarr;</span>
               </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingSection;



