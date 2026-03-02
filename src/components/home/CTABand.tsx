import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTABand = () => {
  return (
    <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto space-y-6"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground">
            Planning an Event or Ceremony?
          </h2>
          <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed">
            Whether it's an annual sports day, corporate awards ceremony, or academic excellence program — we manufacture custom trophies tailored to your event.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/contact">
              <Button variant="gold" size="xl">Request Custom Trophies</Button>
            </Link>
            <Link to="/custom-orders">
              <Button variant="hero-outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Learn About Custom Orders
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABand;
