import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", organization: "", email: "", phone: "", product: "", quantity: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setFormData({ name: "", organization: "", email: "", phone: "", product: "", quantity: "", message: "" });
  };

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Get In Touch</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-foreground">Contact & Enquiry</h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Ready to place a bulk order or need a custom quote? Reach out and our team will respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input value={formData.name} onChange={(e) => update("name", e.target.value)} required placeholder="Your name" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Organization</label>
                    <Input value={formData.organization} onChange={(e) => update("organization", e.target.value)} placeholder="Company / School / Institute" className="bg-background" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email *</label>
                    <Input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} required placeholder="email@example.com" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone *</label>
                    <Input type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} required placeholder="+91 98765 43210" className="bg-background" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Product Interest</label>
                    <Input value={formData.product} onChange={(e) => update("product", e.target.value)} placeholder="e.g., Wooden Trophies" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Estimated Quantity</label>
                    <Input value={formData.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder="e.g., 100 pieces" className="bg-background" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea value={formData.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your requirements, event details, customization needs..." rows={4} className="bg-background" />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">Submit Enquiry</Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
              {[
                { icon: MapPin, title: "Visit Us", lines: ["Delta Industries", "Industrial Area, Jalandhar", "Punjab 144004, India"] },
                { icon: Phone, title: "Call Us", lines: ["+91 98765 43210", "+91 98765 43211"] },
                { icon: Mail, title: "Email Us", lines: ["info@deltaindustries.in", "orders@deltaindustries.in"] },
                { icon: Clock, title: "Working Hours", lines: ["Mon — Sat: 9:00 AM — 6:00 PM", "Sunday: Closed"] },
              ].map((item) => (
                <div key={item.title} className="skeu-card rounded-xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                    {item.lines.map((line) => (
                      <p key={line} className="text-sm text-muted-foreground">{line}</p>
                    ))}
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

export default Contact;

