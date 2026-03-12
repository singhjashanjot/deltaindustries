import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1b1610] text-[#EFECE1] border-t border-[#EFECE1]/10 selection:bg-[#EFECE1] selection:text-[#1b1610]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-max">
              <div className="w-8 h-8 flex items-center justify-center border border-[#EFECE1]/30 rounded-sm group-hover:border-[#EFECE1] transition-colors">
                <span className="text-[#EFECE1] font-bold text-lg leading-none m-0 p-0">Δ</span>
              </div>
              <span className="font-semibold text-base text-[#EFECE1] tracking-wide uppercase">Delta</span>
            </Link>
            <p className="text-sm font-medium text-[#EFECE1]/60 leading-relaxed max-w-xs">
              India&#39;s trusted manufacturer of premium trophies, awards, medals, and recognition products. Serving institutions and corporates since 1998.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#EFECE1]/40">Menu</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Products", path: "/products" },
                { label: "Manufacturing", path: "/custom-orders" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm font-medium text-[#EFECE1]/80 hover:text-[#EFECE1] transition-colors w-max">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#EFECE1]/40">Categories</h4>
            <div className="flex flex-col gap-3">
              {["Wooden Trophies", "Crystal Awards", "Metal Cups", "Medals", "Shields & Plaques", "Corporate Gifts"].map((item) => (
                <Link key={item} to="/products" className="text-sm font-medium text-[#EFECE1]/80 hover:text-[#EFECE1] transition-colors w-max">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#EFECE1]/40">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm font-medium text-[#EFECE1]/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#EFECE1]/50" />
                <span>Industrial Area, Jalandhar, Punjab 144004, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-[#EFECE1]/80">
                <Phone className="w-4 h-4 shrink-0 text-[#EFECE1]/50" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-[#EFECE1]/80">
                <Mail className="w-4 h-4 shrink-0 text-[#EFECE1]/50" />
                <span>info@deltaindustries.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 pt-8 border-t border-[#EFECE1]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-[#EFECE1]/40">
            &copy; {new Date().getFullYear()} Delta Industries. All rights reserved. GST Registered Manufacturer.
          </p>
          <p className="text-xs font-medium text-[#EFECE1]/40">
            Manufacturer &amp; Supplier � Jalandhar, Punjab, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

