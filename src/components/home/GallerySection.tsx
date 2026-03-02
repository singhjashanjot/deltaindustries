import { motion } from "framer-motion";
import galleryImg from "@/assets/gallery-collection.jpg";
import catWooden from "@/assets/cat-wooden.jpg";
import catCrystal from "@/assets/cat-crystal.jpg";
import catMetal from "@/assets/cat-metal.jpg";
import catShields from "@/assets/cat-shields.jpg";
import catCorporate from "@/assets/cat-corporate.jpg";
import catAcrylic from "@/assets/cat-acrylic.jpg";

const images = [
  { src: galleryImg, alt: "Trophy collection", span: "col-span-2 row-span-2" },
  { src: catWooden, alt: "Wooden trophy" },
  { src: catCrystal, alt: "Crystal award" },
  { src: catMetal, alt: "Metal trophy cup" },
  { src: catShields, alt: "Shield plaque" },
  { src: catCorporate, alt: "Corporate gifts" },
  { src: catAcrylic, alt: "Acrylic award" },
];

const GallerySection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Showcase</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Our Craftsmanship
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`${img.span || ""} rounded-xl overflow-hidden shadow-premium`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
