import { motion } from "framer-motion";
import { Factory, Calendar, Shield, MapPin, Package, Award } from "lucide-react";

const stats = [
  { icon: Calendar, label: "Established", value: "1998", desc: "27+ years of legacy" },
  { icon: Factory, label: "Manufacturer", value: "In-House", desc: "Own production facility" },
  { icon: Shield, label: "GST Registered", value: "Certified", desc: "Fully compliant business" },
  { icon: MapPin, label: "Pan-India", value: "500+", desc: "Cities served" },
  { icon: Package, label: "Bulk Orders", value: "10,000+", desc: "Orders fulfilled yearly" },
  { icon: Award, label: "Product Range", value: "200+", desc: "SKUs across categories" },
];

const TrustSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Why Trust Us</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Built on Decades of Trust
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="skeu-card rounded-xl p-5 text-center space-y-2"
            >
              <stat.icon className="w-6 h-6 mx-auto text-primary" />
              <div className="font-serif text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs font-medium text-foreground">{stat.label}</div>
              <div className="text-[11px] text-muted-foreground">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
