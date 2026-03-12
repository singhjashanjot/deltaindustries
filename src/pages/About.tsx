import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import manufacturingImg from "@/assets/manufacturing.jpg";
import galleryImg from "@/assets/gallery-collection.jpg";

const About = () => {
  return (
    <Layout>
      <section className="w-full py-24 md:py-32 font-sans bg-[#ffffe3] text-[#35020D] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70">Who We Are</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight mt-3 text-[#35020D]">
              A Legacy of Craftsmanship Since 1998
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <p className="text-[#35020D]/80 font-medium leading-relaxed md:text-lg">
                Established in the year 1998, at Jalandhar, (Punjab, India), we, Delta Industries, are engaged in manufacturing & supplying of an elegant collection of Corporate Promotional Gift Items and Trophies. These include Sport Trophies, Flat Trophies, Fancy Trophies, Golf Golden Trophies, Acrylic Trophies, Wooden Trophies, Plastic Trophy Cups, Metal Cups, Academic Cups, and much more.
              </p>
              <p className="text-[#35020D]/80 font-medium leading-relaxed md:text-lg">
                Our team of expert professionals has been the driving force that has enabled us to exceed the expectations of our customers by offering an unmatched range. We offer extensive customization facilities to our customers so that they can avail the products completely tailored to their specifications.
              </p>
              <p className="text-[#35020D]/80 font-medium leading-relaxed md:text-lg">
                The success that we are enjoying today is because of the efficient guidance of our mentor Mr. J. S. Bedi. Owing to his consistent efforts combined with dynamic leadership skills, we have been able to consistently grow in our business domain and achieve organizational goals continuously under the directorship of Mr. Gurdeep Singh.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { value: "1998", label: "Established" },
                  { value: "11-25", label: "Skilled Artisans" },
                  { value: "5000", label: "Sq Ft Facility" },
                  { value: "1.5Cr+", label: "Annual Turnover" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-[#35020D]/20 p-6 flex flex-col justify-center items-center rounded-sm bg-[#35020D]/5">
                    <div className="text-3xl md:text-4xl font-normal tracking-tight text-[#35020D]">{stat.value}</div>
                    <div className="text-xs font-semibold tracking-widest uppercase mt-2 opacity-70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="bg-[#35020D]/5 aspect-[4/5] object-cover mix-blend-multiply opacity-90 overflow-hidden rounded-sm border border-[#35020D]/10">
                <img src={manufacturingImg} alt="Manufacturing facility" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

