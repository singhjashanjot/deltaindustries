import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

const dotVariants = {
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    transition: {
      duration: 1.4,
      repeat: Infinity,
      delay: i * 0.3,
      ease: "easeInOut" as const,
    },
  }),
};

const ComingSoon = () => {
  return (
    <Layout hideFooter>
      <section className="w-full bg-[#ffffe3] text-[#35020D] min-h-screen flex flex-col items-center justify-center font-sans selection:bg-[#35020D] selection:text-[#fffff1] px-6">
        <div className="flex flex-col items-center text-center">
          {/* Bouncing Trophy */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <img
              src="https://em-content.zobj.net/source/apple/391/trophy_1f3c6.png"
              alt="Trophy"
              width={64}
              height={64}
              className="drop-shadow-md"
            />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#35020D] mb-1 flex items-baseline">
            <span>Coming Soon</span>
            <span className="inline-flex ml-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={dotVariants}
                  animate="animate"
                  className="text-4xl md:text-6xl lg:text-7xl"
                >
                  .
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg font-medium text-[#35020D]/60 tracking-wide max-w-md mt-5">
            Our devs are cooking something crazy.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ComingSoon;
