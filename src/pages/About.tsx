import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy, Calendar, Users, Maximize } from "lucide-react";
const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/IMAGES/factory/factory1.JPG", 
    "/IMAGES/factory/factory2.JPG", 
    "/IMAGES/factory/factory3.JPG"
  ];

  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const teamImages = [
    "/IMAGES/factory/factory4.JPG",
    "/IMAGES/factory/factory5.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const teamInterval = setInterval(() => {
      setCurrentTeamIndex((prev) => (prev + 1) % teamImages.length);
    }, 3800);
    return () => clearInterval(teamInterval);
  }, [teamImages.length]);

  return (
    <Layout>
      <main className="bg-[#ffffe3] text-[#35020D] min-h-screen w-full font-sans">
        {/* NEW HERO SECTION: Centered Minimal */}
        <section className="w-full pt-24 md:pt-32 pb-8 md:pb-16 bg-[#ffffe3]">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
            
            {/* Centered Heading */}
            <div className="text-center mb-12 md:mb-16">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                 <span className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 opacity-60 text-[#35020D]">Who We Are</span>
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#35020D] max-w-3xl">
                   About Delta Industries
                 </h1>
               </motion.div>
            </div>

            {/* Horizontal Image Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-[4/5] md:aspect-[21/9] lg:aspect-[2.5/1] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-[#35020D]/10"
            >
              {/* Animated Background Images inside card */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#35020D]/50 backdrop-blur-[1px] z-10" />
                <AnimatePresence>
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt="Delta Industries Showcase"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>
              </div>

              {/* Card Content Overlay */}
              <div className="relative z-20 w-full h-full p-8 md:p-12 lg:p-16 flex flex-col justify-end text-[#ffffe3]">
                {/* Content Layout inside Card */}
                <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16">
                  
                  {/* Left Side Text */}
                  <div className="md:w-3/5 space-y-4">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-medium leading-snug md:leading-relaxed text-white/95">
                      Delta Industries is a renowned manufacturer of high-quality Trophies, Mementos, Medals etc. proudly serving wholesalers and shopkeepers worldwide for 27 years with a legacy built on exceptional craftsmanship, innovative designs, and unwavering commitment to excellence, we have established a strong reputation for delivering outstanding products that exceed expectations.
                    </h2>
                  </div>
                  
                  {/* Right Side Text/Stats */}
                  <div className="md:w-2/5 flex flex-col gap-4">
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                      Our team of expert professionals has been the driving force that enables us to exceed expectations, offering extensive customization tailored to exact specifications.
                    </p>
                    <p className="text-white/60 text-xs md:text-sm font-medium tracking-wide uppercase mt-2">
                      Guided by Mr. J. S. Bedi & Mr. Gurdeep Singh
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Visuals Section (Bento Grid) */}
        <section className="w-full py-20 md:py-32 border-b border-[#35020D]/10">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 w-full">
            <div className="mb-12 md:mb-16">
               <span className="text-xs font-semibold tracking-widest uppercase opacity-50 block mb-2 text-[#35020D]">Delta by the numbers</span>
               <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-[#35020D]">Our Impact & Scale</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              
              {/* Stat 1: 27+ Years of Craft */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="md:col-span-7 bg-[#35020D]/5 rounded-2xl md:rounded-[2rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group"
              >
                <div className="absolute -right-8 -top-8 text-[#35020D]/5 group-hover:text-[#35020D]/10 transition-colors duration-500">
                   <Award size={180} strokeWidth={1} />
                </div>
                <div className="text-xs md:text-sm font-bold tracking-widest uppercase opacity-60 text-[#35020D] mb-12">Legacy</div>
                <div>
                  <div className="text-6xl md:text-8xl font-medium tracking-tighter text-[#35020D] mb-2">27+</div>
                  <div className="text-xl md:text-2xl text-[#35020D]/80 font-normal">Years of Craft</div>
                </div>
              </motion.div>

              {/* Stat 2: 1.5Cr+ Trophies */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="md:col-span-5 bg-[#35020D] text-[#ffffe3] rounded-2xl md:rounded-[2rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group"
              >
                <div className="absolute -right-6 -bottom-6 text-white/5 group-hover:text-white/10 transition-colors duration-500">
                   <Trophy size={160} strokeWidth={1} />
                </div>
                <div className="text-xs md:text-sm font-bold tracking-widest uppercase opacity-60 mb-12">Production</div>
                <div>
                  <div className="text-6xl md:text-7xl font-medium tracking-tighter mb-2">1.5Cr+</div>
                  <div className="text-xl md:text-2xl opacity-90 font-normal">Trophies Delivered</div>
                </div>
              </motion.div>

              {/* Row 2 */}
              {/* Stat 3: Established */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="md:col-span-4 bg-[#35020D]/5 rounded-2xl p-8 flex flex-col justify-between"
              >
                <div className="text-[#35020D]/40 mb-6"><Calendar size={32} strokeWidth={1.5} /></div>
                <div>
                  <div className="text-4xl md:text-5xl font-medium tracking-tight text-[#35020D] mb-1">1998</div>
                  <div className="text-sm font-bold tracking-widest uppercase opacity-60 text-[#35020D]">Established Year</div>
                </div>
              </motion.div>

              {/* Stat 4: Artisans */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="md:col-span-4 bg-[#35020D]/5 rounded-2xl p-8 flex flex-col justify-between"
              >
                <div className="text-[#35020D]/40 mb-6"><Users size={32} strokeWidth={1.5} /></div>
                <div>
                  <div className="text-4xl md:text-5xl font-medium tracking-tight text-[#35020D] mb-1">11-25</div>
                  <div className="text-sm font-bold tracking-widest uppercase opacity-60 text-[#35020D]">Skilled Artisans</div>
                </div>
              </motion.div>

              {/* Stat 5: Facility */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="md:col-span-4 bg-[#35020D]/5 rounded-2xl p-8 flex flex-col justify-between"
              >
                <div className="text-[#35020D]/40 mb-6"><Maximize size={32} strokeWidth={1.5} /></div>
                <div>
                  <div className="text-4xl md:text-5xl font-medium tracking-tight text-[#35020D] mb-1">5000+</div>
                  <div className="text-sm font-bold tracking-widest uppercase opacity-60 text-[#35020D]">Sq Ft Facility</div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      {/* Philosophy Section */}
      <section className="w-full py-20 md:py-32 border-t border-[#35020D]/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto space-y-8">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-[#35020D]">
              Precision in every detail.<br />Pride in every piece.
            </h2>
            <p className="text-[#35020D]/80 font-medium leading-relaxed md:text-lg max-w-2xl mx-auto">
              We believe that a trophy is more than just material. It is a symbol of hard work, a memory frozen in time, and a testament to excellence. That is why every piece we manufacture goes through a rigorous process of design, material selection, and hand-finished craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-20 md:py-32 border-t border-[#35020D]/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70 block">The People Behind Delta</span>
            <h2 className="text-4xl md:text-5xl font-normal leading-[1.05] tracking-tight mt-3 text-[#35020D]">
              Craftsmen, Designers, and Visionaries
            </h2>
            <p className="text-[#35020D]/80 font-medium leading-relaxed md:text-lg mt-6">
              Our work is made possible by a dedicated collective of artisans and engineers. We bring decades of combined experience to the factory floor, ensuring every cut, polish, and engraving meets our exacting standards.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full max-w-5xl">
            <div className="bg-[#35020D]/5 aspect-[21/9] relative mix-blend-multiply opacity-90 overflow-hidden rounded-sm border border-[#35020D]/10 shadow-sm">
              <AnimatePresence>
                <motion.img
                  key={currentTeamIndex}
                  src={teamImages[currentTeamIndex]}
                  alt="The Delta Industries team at work"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                {teamImages.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentTeamIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      currentTeamIndex === idx ? "w-8 bg-white opacity-90" : "w-2 bg-white opacity-40 hover:opacity-70"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="w-full rounded-[2rem] border border-[#35020D]/10 bg-white/40 p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-left shadow-sm"
          >
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70 block text-[#35020D]">Work With Us</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight mb-6 text-[#35020D]">
                Ready to create something exceptional?
              </h2>
              <p className="text-[#35020D]/70 md:text-lg max-w-xl font-light leading-relaxed">
                Partner with us to craft premium recognition awards and corporate gifts that truly reflect your brand's excellence.
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <a 
                href="/contact" 
                className="group relative inline-flex items-center justify-center px-8 py-5 md:px-10 md:py-6 bg-[#35020D] text-[#ffffe3] text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-full overflow-hidden hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative flex items-center gap-3">
                  Get in Touch
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    </Layout>
  );
};

export default About;

