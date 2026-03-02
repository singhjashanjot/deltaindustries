import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">Δ</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-lg text-foreground">Delta Industries</span>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">Since 1998</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's trusted manufacturer of premium trophies, awards, medals, and recognition products. Serving institutions and corporates since 1998.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Products", path: "/products" },
                { label: "Custom Orders", path: "/custom-orders" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-foreground">Products</h4>
            <div className="flex flex-col gap-2">
              {["Wooden Trophies", "Crystal Awards", "Metal Cups", "Medals", "Shields & Plaques", "Corporate Gifts"].map((item) => (
                <Link key={item} to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-foreground">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>Industrial Area, Jalandhar, Punjab 144004, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <span>info@deltaindustries.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Delta Industries. All rights reserved. GST Registered Manufacturer.
          </p>
          <p className="text-xs text-muted-foreground">
            Manufacturer & Supplier — Jalandhar, Punjab, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
