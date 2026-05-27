import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Ruler, Focus } from "lucide-react";
import galleryImg from "@/assets/gallery-collection.jpg";

const Quality = () => {
  return (
    <Layout>
      <section className="w-full py-24 md:py-32 font-sans bg-[#ffffe3] text-[#35020D] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70">Delta Industries</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight mt-3 text-[#35020D]">
              Our Quality Mantra
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <p className="text-[#35020D]/80 font-medium leading-relaxed md:text-lg">
                Being our motivating force for growth, quality has always been our topmost priority. Our unmatched quality Corporate Promotional Gift Items and Trophies are designed for ensuring complete customer satisfaction. We always ensure that our customers are offered items that are of world-class quality and match up with their very highest expectations.
              </p>
              <p className="text-[#35020D]/80 font-medium leading-relaxed md:text-lg">
                In order to ensure the same, we have with us a team of expert quality inspectors, who are responsible for the optimum quality of our offered range. They rigorously check our entire range on the basis of crucial parameters such as design accuracy, surface finish, polish, and material robustness.
              </p>
              
              <div className="mt-12">
                <h3 className="text-2xl font-normal mb-4 font-sans tracking-tight">Customer Satisfaction</h3>
                <p className="text-[#35020D]/80 font-medium leading-relaxed md:text-lg">
                  We always believe in the philosophy of attaining success in our business operations by meeting the exact requirements of the customers and thus offer them a unique range of pieces. Being assisted by a team of expert and creative professionals, we continually come up with exquisite designs which are highly appreciated by our clients across India. We always strive hard to understand the vision of the organizers and carefully incorporate all technical specifications in designing our final range.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 mt-8">
                {[
                  { value: "100%", label: "Quality Checks" },
                  { value: "ISO", label: "Industry Standards" },
                  { value: "CNC", label: "Precision Tooling" },
                  { value: "0", label: "Compromises" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-[#35020D]/20 p-6 flex flex-col justify-center items-center rounded-sm bg-[#35020D]/5">
                    <div className="text-3xl md:text-4xl font-normal tracking-tight text-[#35020D]">{stat.value}</div>
                    <div className="text-xs font-semibold tracking-widest uppercase mt-2 opacity-70 text-center">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="bg-[#35020D]/5 aspect-[4/5] object-cover mix-blend-multiply opacity-90 overflow-hidden rounded-sm border border-[#35020D]/10">
                <img src={galleryImg} alt="Delta manufacturing inspection" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 4-Step Quality Assurance Process */}
      <section className="w-full py-24 md:py-32 border-t border-[#35020D]/10 relative overflow-hidden bg-[#ffffe3]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <div className="mb-16 md:mb-24 max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70 block text-[#35020D]">The Delta Standard</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#35020D]">
              Our 4-Step Assurance Process
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: "01", icon: <Focus size={24} />, title: "Material Selection", desc: "Rigorous sourcing of premium metals, woods, and acrylics to ensure durability and a flawless finish from the very beginning." },
              { step: "02", icon: <Ruler size={24} />, title: "Precision Crafting", desc: "Utilizing advanced CNC and laser technology to achieve exact specifications, perfect symmetry, and intricate detailing." },
              { step: "03", icon: <CheckCircle2 size={24} />, title: "Hand Finishing", desc: "Expert artisans meticulously polish, assemble, and refine every piece by hand to give it a premium, luxurious feel." },
              { step: "04", icon: <ShieldCheck size={24} />, title: "Final Inspection", desc: "A comprehensive multi-point quality check by our dedicated inspectors before any product is carefully packaged." }
            ].map((item, idx) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 md:p-10 rounded-2xl bg-[#35020D]/[0.03] border border-[#35020D]/5 shadow-sm hover:shadow-xl hover:border-[#35020D]/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-9xl font-bold text-[#35020D]/5 group-hover:text-[#35020D]/10 transition-colors duration-500 z-0">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#35020D]/5 flex items-center justify-center text-[#35020D] mb-8 group-hover:bg-[#35020D] group-hover:text-[#ffffe3] transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium mb-4 text-[#35020D]">{item.title}</h3>
                  <p className="opacity-70 text-sm md:text-base leading-relaxed text-[#35020D] font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden bg-[#ffffe3]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="w-full rounded-[2rem] border border-[#35020D]/10 bg-white/40 p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-left shadow-sm"
          >
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70 block text-[#35020D]">Work With Us</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight mb-6 text-[#35020D]">
                Ready to create something exceptional?
              </h2>
              <p className="text-[#35020D]/70 md:text-lg max-w-xl font-light leading-relaxed">
                Partner with us to craft premium recognition awards and corporate gifts that truly reflect your brand's excellence.
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <a 
                href="/contact" 
                className="group relative inline-flex items-center justify-center px-8 py-5 md:px-10 md:py-6 bg-[#35020D] text-[#ffffe3] text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-full overflow-hidden hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative flex items-center gap-3">
                  Get in Touch
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Quality;

