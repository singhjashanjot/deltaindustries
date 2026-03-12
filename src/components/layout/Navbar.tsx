import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Our Range", path: "/products" },
  { label: "Manufacturing", path: "/custom-orders" },
  { label: "Who We Are", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1b1610]/90 backdrop-blur-md border-b border-[#EFECE1]/10 py-4" : "bg-transparent py-6"}`}>
      <div className="px-6 md:px-12 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center border border-[#EFECE1]/30 rounded-sm group-hover:border-[#EFECE1] transition-colors">
            <span className="text-[#EFECE1] font-bold text-lg leading-none m-0 p-0">Δ</span>
          </div>
          <span className="font-semibold text-sm md:text-base text-[#EFECE1] tracking-wide uppercase">Delta</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                location.pathname === link.path
                  ? "text-[#EFECE1]"
                  : "text-[#EFECE1]/60 hover:text-[#EFECE1]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="ml-4 bg-[#EFECE1] text-[#1b1610] px-6 py-2.5 rounded-full hover:bg-white transition-colors uppercase text-xs tracking-wider font-semibold">
            Inquire Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#EFECE1] hover:opacity-70 transition-opacity"
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
            className="lg:hidden absolute top-full left-0 w-full bg-[#1b1610] border-t border-[#EFECE1]/10 overflow-hidden flex flex-col"
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-normal tracking-tight ${
                    location.pathname === link.path
                      ? "text-[#EFECE1]"
                      : "text-[#EFECE1]/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-8 mt-4 border-t border-[#EFECE1]/10">
                <Link to="/contact" onClick={() => setIsOpen(false)} className="inline-block bg-[#EFECE1] text-[#1b1610] px-8 py-3 rounded-full uppercase text-sm tracking-wider font-semibold w-full text-center">
                  Inquire Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

