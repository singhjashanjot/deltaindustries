import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Our Range", path: "/products" },
  { label: "Manufacturing", path: "/custom-orders" },
  { label: "Who We Are", path: "/about" },
  { label: "Quality Focus", path: "/quality" },
  { label: "Reviews", path: "/testimonials" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Show immediately if not on home, otherwise wait until user scrolls down 250px
      setScrolled(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = !isHome || scrolled || isOpen;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={isHome ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 bg-[#ffffe3]/90 backdrop-blur-md border-b border-[#35020D]/10 py-4 font-sans text-[#35020D]"
        >
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between w-full"> 
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 flex items-center justify-center border border-[#35020D]/30 rounded-sm group-hover:border-[#35020D] transition-colors">
                <span className="text-[#35020D] font-bold text-lg leading-none m-0 p-0">Δ</span>
              </div>
              <span className="font-semibold text-sm md:text-base text-[#35020D] tracking-wide uppercase">Delta</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex flex-col items-center text-sm md:text-base font-medium tracking-tight"
                >
                  <span className="mb-0.5">{link.label}</span>
                  <div className="w-0 h-[1.5px] bg-[#35020D] group-hover:w-full transition-all duration-300 ease-out" />
                </Link>
              ))}
              <Link to="/search" className="p-2 hover:bg-[#35020D]/5 rounded-sm transition-colors" title="Search">
                <Search className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="ml-4 bg-[#35020D] text-[#fffff1] px-5 py-2.5 lg:px-6 lg:py-3 rounded-full hover:bg-[rgb(35,2,13)] transition-colors text-sm md:text-base tracking-tight font-semibold shadow-sm">
                Contact
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#35020D] hover:opacity-70 transition-opacity"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100vh" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden absolute top-full left-0 w-full bg-[#ffffe3] border-t border-[#35020D]/10 overflow-hidden flex flex-col"
              >
                <nav className="px-6 py-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-normal tracking-tight text-[#35020D]`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link to="/search" onClick={() => setIsOpen(false)} className="text-2xl font-normal tracking-tight text-[#35020D] flex items-center gap-2">
                    <Search className="w-5 h-5" /> Search
                  </Link>
                  <div className="pt-8 mt-4 border-t border-[#35020D]/10">
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="inline-block bg-[#35020D] text-[#fffff1] px-8 py-3 rounded-full text-lg tracking-tight font-semibold w-full text-center">
                      Contact
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;


