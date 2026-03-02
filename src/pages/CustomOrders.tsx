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
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Custom Orders</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">Bulk & Personalized Orders</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
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
                  className="skeu-card rounded-xl p-6 space-y-3 relative"
                >
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <step.icon className="w-8 h-8 text-primary" />
                  <h3 className="font-serif text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 glass rounded-2xl p-8 md:p-12 text-center space-y-4"
            >
              <h3 className="font-serif text-2xl font-bold text-foreground">Ready to Place a Custom Order?</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Share your requirements and our team will get back to you with a detailed quote within 24 hours.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="xl">Get Custom Quote</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CustomOrders;
