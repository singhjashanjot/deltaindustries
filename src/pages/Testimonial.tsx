import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <Layout>
      <section className="w-full py-24 md:py-32 font-sans bg-[#35020D] text-[#ffffe3] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70">Ratings & Reviews</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight mt-3">
              Trusted Across India.
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5 space-y-6">
              <div className="border border-[#ffffe3]/20 p-8 rounded-sm bg-[#ffffe3]/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl font-normal tracking-tight">4.3</div>
                  <div className="flex flex-col">
                    <span className="text-xl">★★★★☆</span>
                    <span className="text-xs opacity-70 tracking-widest uppercase mt-1">Based on 37 Users</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-6">5★</span>
                    <div className="flex-1 h-1.5 bg-[#ffffe3]/10 rounded-full overflow-hidden"><div className="h-full bg-[#ffffe3] w-[65%]" /></div>
                    <span className="w-8 text-right opacity-70">65%</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-6">4★</span>
                    <div className="flex-1 h-1.5 bg-[#ffffe3]/10 rounded-full overflow-hidden"><div className="h-full bg-[#ffffe3] w-[11%]" /></div>
                    <span className="w-8 text-right opacity-70">11%</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-6">3★</span>
                    <div className="flex-1 h-1.5 bg-[#ffffe3]/10 rounded-full overflow-hidden"><div className="h-full bg-[#ffffe3] w-[5%]" /></div>
                    <span className="w-8 text-right opacity-70">5%</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-6">2★</span>
                    <div className="flex-1 h-1.5 bg-[#ffffe3]/10 rounded-full overflow-hidden"><div className="h-full bg-[#ffffe3] w-[5%]" /></div>
                    <span className="w-8 text-right opacity-70">5%</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-6">1★</span>
                    <div className="flex-1 h-1.5 bg-[#ffffe3]/10 rounded-full overflow-hidden"><div className="h-full bg-[#ffffe3] w-[14%]" /></div>
                    <span className="w-8 text-right opacity-70">14%</span>
                  </div>
                </div>

                <div className="border-t border-[#ffffe3]/20 pt-6">
                  <h4 className="text-xs font-semibold tracking-widest uppercase opacity-70 mb-4">User Satisfaction</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm"><span className="opacity-90">Company Response</span> <span className="font-semibold">91%</span></div>
                    <div className="flex justify-between items-center text-sm"><span className="opacity-90">Product Quality</span> <span className="font-semibold">100%</span></div>
                    <div className="flex justify-between items-center text-sm"><span className="opacity-90">Delivery Speed</span> <span className="font-semibold">100%</span></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 space-y-6">
              {[
                { name: "Mr. Shahnawaz Sir", loc: "Katihar, Bihar", product: "Trophies", date: "09-January-26", stars: "★★★★★", review: "Outstanding quality. The finish on the trophies was much better than we anticipated for our corporate awards." },
                { name: "Vijay", loc: "Agartala, Tripura", product: "Metal Mementos", date: "03-November-25", stars: "★★★★★", review: "Timely delivery and excellently packaged. Highly recommend Delta Industries." },
                { name: "Sonali", loc: "Guwahati, Assam", product: "Trophy Cup", date: "30-September-22", stars: "★★★★★", review: "So good. Received exactly what was discussed and the customization was spot on." }
              ].map((rev, i) => (
                <div key={i} className="border-b border-[#ffffe3]/20 pb-6 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium">{rev.name}</h4>
                      <p className="text-xs opacity-70 uppercase tracking-widest mt-1">{rev.loc}</p>
                    </div>
                    <div className="text-[#ffffe3] tracking-widest">{rev.stars}</div>
                  </div>
                  <p className="opacity-90 text-sm mt-2 leading-relaxed">&ldquo;{rev.review}&rdquo;</p>
                  <div className="flex items-center gap-4 mt-2 text-xs opacity-60">
                    <span>Product: {rev.product}</span>
                    <span>•</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonial;

