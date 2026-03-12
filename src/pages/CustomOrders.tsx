import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardList, Palette, Factory, Truck } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Share Requirements", desc: "Tell us your event type, quantity, budget, material preference, and any customization details." },
  { icon: Palette, title: "Design & Approval", desc: "Our team creates design mockups with your logo, text, and specifications for your review." },
  { icon: Factory, title: "Production", desc: "Once approved, we manufacture your order in our Jalandhar facility with quality checks at every stage." },
  { icon: Truck, title: "Delivery", desc: "Carefully packaged and shipped pan-India with tracking. Bulk orders get priority handling." },
];

const CustomOrders = () => {
  return (
    <Layout>
      <section className="w-full py-24 md:py-32 font-sans bg-[#ffffe3] text-[#35020D] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70">Custom Orders</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight mt-3 text-[#35020D]">Bulk & Personalized Orders</h1>
            <p className="mt-6 text-[#35020D]/80 font-medium leading-relaxed md:text-lg">
              From 10 pieces to 10,000 — we manufacture custom trophies, awards, and mementos tailored to your exact specifications. Every order is crafted in-house at our facility.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-[#35020D]/20 bg-[#35020D]/5 rounded-sm p-8 space-y-4 relative"
                >
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#35020D]/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#35020D]">{i + 1}</span>
                  </div>
                  <step.icon className="w-8 h-8 text-[#35020D]" strokeWidth={1.5} />
                  <h3 className="text-xl font-medium tracking-tight text-[#35020D]">{step.title}</h3>
                  <p className="text-sm font-medium text-[#35020D]/70 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 border border-[#35020D]/20 bg-[#fffff1] rounded-sm p-8 md:p-16 text-center space-y-8"
            >
              <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-[#35020D]">Ready to Place a Custom Order?</h3>
              <p className="text-[#35020D]/70 font-medium max-w-lg mx-auto">
                Share your requirements and our team will get back to you with a detailed quote within 24 hours.
              </p>
              <div className="flex justify-center pt-4">
                <Link to="/contact" className="inline-flex items-center gap-3 text-sm md:text-base font-semibold tracking-normal hover:bg-[#35020D] hover:text-[#fffff1] bg-transparent border-2 border-[#35020D] text-[#35020D] px-8 py-4 rounded-[2rem] transition-colors w-fit">
                  <span>Get Custom Quote</span>
                  <span className="inline-block w-1.5 h-1.5 border-[1.5px] border-current rounded-full"></span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CustomOrders;

