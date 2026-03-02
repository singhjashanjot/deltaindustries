import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import manufacturingImg from "@/assets/manufacturing.jpg";
import galleryImg from "@/assets/gallery-collection.jpg";

const About = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">About Us</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">
              A Legacy of Craftsmanship Since 1998
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Delta Industries, also known as Delta Trophies, was established in 1998 in Jalandhar, Punjab — the heart of India's sports goods and awards manufacturing hub. What began as a small workshop has grown into one of the region's most trusted manufacturers of trophies, awards, medals, and recognition products.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For over 27 years, we have served thousands of schools, colleges, corporate organizations, government bodies, and sports federations across India. Our commitment to quality, consistency, and customer satisfaction has made us a preferred partner for institutions that value excellence in recognition.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a GST-registered manufacturer with our own production facility, we maintain complete control over quality, timelines, and costs. Every trophy that carries the Delta name is a testament to our dedication to craftsmanship and our clients' trust.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { value: "1998", label: "Established" },
                  { value: "27+", label: "Years of Experience" },
                  { value: "500+", label: "Cities Served" },
                  { value: "200+", label: "Product Types" },
                ].map((stat) => (
                  <div key={stat.label} className="skeu-card rounded-xl p-4 text-center">
                    <div className="font-serif text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img src={manufacturingImg} alt="Manufacturing facility" className="w-full h-auto" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-premium">
                <img src={galleryImg} alt="Product showcase" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
