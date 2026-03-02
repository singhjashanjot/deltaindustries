import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-trophy.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Premium trophy award" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-medium tracking-widest uppercase text-gold-light">
                Manufacturing Excellence Since 1998
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-primary-foreground">
              Crafting Recognition,{" "}
              <span className="text-gradient-gold">Celebrating Excellence</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/70 max-w-xl">
              India's trusted manufacturer and bulk supplier of premium trophies, awards, medals, and mementos. Serving schools, corporates, sports events, and institutions across the nation.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact">
                <Button variant="hero" size="xl">Request Bulk Quote</Button>
              </Link>
              <Link to="/products">
                <Button variant="hero-outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Explore Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
