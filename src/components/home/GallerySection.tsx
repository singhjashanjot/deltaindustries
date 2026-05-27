import { motion } from "framer-motion";
import galleryImg from "@/assets/gallery-collection.jpg";
import catWooden from "@/assets/cat-wooden.jpg";
import catCrystal from "@/assets/cat-crystal.jpg";
import catMetal from "@/assets/cat-metal.jpg";
import catShields from "@/assets/cat-shields.jpg";
import catCorporate from "@/assets/cat-corporate.jpg";
import catAcrylic from "@/assets/cat-acrylic.jpg";

const images = [
  { src: galleryImg, alt: "Trophy collection", span: "md:col-span-2 md:row-span-2" },
  { src: catWooden, alt: "Wooden trophy" },
  { src: catCrystal, alt: "Crystal award" },
  { src: catMetal, alt: "Metal trophy cup" },
  { src: catShields, alt: "Shield plaque" },
  { src: catCorporate, alt: "Corporate gifts" },
  { src: catAcrylic, alt: "Acrylic award" },
];

const GallerySection = () => {
  return (
    <section className="w-full min-h-[800px] md:min-h-[900px] flex items-center py-20 md:py-32 bg-[#35020D] text-[#ffffe3] selection:bg-[#ffffe3] selection:text-[#35020D]">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.1]">
            Our Craftsmanship
          </h2>
          <p className="text-sm tracking-widest uppercase font-semibold text-[#ffffe3]/50 mb-2">
            Selected Works
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`${img.span || ""} overflow-hidden bg-[#ffffe3]/5 aspect-square`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-\[0.16\,1\,0.3\,1\] grayscale hover:grayscale-0" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;



