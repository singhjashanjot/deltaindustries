import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
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
    </Layout>
  );
};

export default Quality;

