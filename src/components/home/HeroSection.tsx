import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import catWooden from "@/assets/cat-wooden.jpg";
import catCrystal from "@/assets/cat-crystal.jpg";
import catMetal from "@/assets/cat-metal.jpg";
import catAcrylic from "@/assets/cat-acrylic.jpg";
import catShields from "@/assets/cat-shields.jpg";
import catMedals from "@/assets/cat-medals.jpg";

const slides = [
  { src: catWooden, label: "Wooden Trophies" },
  { src: catCrystal, label: "Crystal Awards" },
  { src: catMetal, label: "Metal Cups" },
  { src: catAcrylic, label: "Acrylic Trophies" },
  { src: catShields, label: "Shields & Plaques" },
  { src: catMedals, label: "Medals" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prev = (current - 1 + slides.length) % slides.length;
  const next = (current + 1) % slides.length;

  return (
    <section className="relative min-h-[85vh] flex items-center bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Since 1998
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-foreground">
              Crafting
              <br />
              Recognition,{" "}
              <span className="text-primary">Celebrating&nbsp;Excellence</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
              India's trusted manufacturer &amp; bulk supplier of premium
              trophies, awards, medals, and mementos — serving institutions
              across the nation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Request Bulk Quote
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="hero-outline" size="lg">
                  Explore Products
                </Button>
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex gap-8 pt-4 border-t border-border">
              {[
                { value: "25+", label: "Years" },
                { value: "10K+", label: "Clients" },
                { value: "500+", label: "Designs" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-serif font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Revolving product showcase */}
          <div className="relative flex items-center justify-center h-[420px] md:h-[500px]">
            {/* Subtle decorative ring */}
            <div className="absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full border border-border/60" />

            <AnimatePresence mode="popLayout">
              {/* Background card (previous) */}
              <motion.div
                key={`bg-${prev}`}
                className="absolute w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden opacity-20 -translate-x-12 translate-y-8 scale-75"
              >
                <img
                  src={slides[prev].src}
                  alt={slides[prev].label}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Main card */}
              <motion.div
                key={`main-${current}`}
                initial={{ opacity: 0, x: 80, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.85 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-elevated border border-border bg-card">
                  <img
                    src={slides[current].src}
                    alt={slides[current].label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass rounded-full px-5 py-2">
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {slides[current].label}
                  </span>
                </div>
              </motion.div>

              {/* Peek card (next) */}
              <motion.div
                key={`peek-${next}`}
                className="absolute w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden opacity-30 translate-x-16 -translate-y-6 scale-75"
              >
                <img
                  src={slides[next].src}
                  alt={slides[next].label}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-0 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-6" : "bg-border"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
