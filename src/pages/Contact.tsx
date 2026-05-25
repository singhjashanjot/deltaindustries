import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { trpc } from "@/lib/trpc";

const emptyForm = { name: "", organization: "", email: "", phone: "", product: "", quantity: "", message: "" };

const Contact = () => {
  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get("product");
  const productId = productIdParam ? parseInt(productIdParam, 10) : undefined;
  const { data: product } = trpc.product.getById.useQuery({ id: productId! }, { enabled: !!productId });
  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    product: product?.name || "",
  }));

  const submitEnquiry = trpc.enquiry.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setFormData(emptyForm);
    },
    onError: (err) => {
      toast.error(err.message || "Submission failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry.mutate({
      productId: productId,
      customerName: formData.name,
      organization: formData.organization || undefined,
      email: formData.email,
      phone: formData.phone,
      message: formData.message || undefined,
      quantity: formData.quantity ? parseInt(formData.quantity, 10) : undefined,
    });
  };

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({ ...prev, product: product.name }));
    }
  }, [product]);

  return (
    <Layout>
      <section className="w-full py-24 md:py-32 font-sans bg-[#ffffe3] text-[#35020D] min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.05] tracking-tight mt-3 text-[#35020D]">Contact & Enquiry</h1>
            <p className="mt-6 text-[#35020D]/80 font-medium leading-relaxed md:text-lg max-w-2xl">
              Ready to place a bulk order or need a custom quote? Reach out and our team will respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-24 items-start">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="border border-[#35020D]/20 bg-[#35020D]/5 p-8 md:p-12 space-y-8 rounded-sm">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#35020D]">Full Name *</label>
                    <input value={formData.name} onChange={(e) => update("name", e.target.value)} required placeholder="Your name" className="w-full bg-transparent border-b border-[#35020D]/30 py-2 focus:outline-none focus:border-[#35020D] transition-colors placeholder:text-[#35020D]/30" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#35020D]">Organization</label>
                    <input value={formData.organization} onChange={(e) => update("organization", e.target.value)} placeholder="Company / School" className="w-full bg-transparent border-b border-[#35020D]/30 py-2 focus:outline-none focus:border-[#35020D] transition-colors placeholder:text-[#35020D]/30" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#35020D]">Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} required placeholder="email@example.com" className="w-full bg-transparent border-b border-[#35020D]/30 py-2 focus:outline-none focus:border-[#35020D] transition-colors placeholder:text-[#35020D]/30" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#35020D]">Phone *</label>
                    <input type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} required placeholder="10-digit mobile number" className="w-full bg-transparent border-b border-[#35020D]/30 py-2 focus:outline-none focus:border-[#35020D] transition-colors placeholder:text-[#35020D]/30" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#35020D]">Product Interest</label>
                    <input value={formData.product} onChange={(e) => update("product", e.target.value)} placeholder="e.g., Wooden Trophies" className="w-full bg-transparent border-b border-[#35020D]/30 py-2 focus:outline-none focus:border-[#35020D] transition-colors placeholder:text-[#35020D]/30" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#35020D]">Estimated Qty</label>
                    <input value={formData.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder="e.g., 100 pieces" className="w-full bg-transparent border-b border-[#35020D]/30 py-2 focus:outline-none focus:border-[#35020D] transition-colors placeholder:text-[#35020D]/30" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#35020D]">Message</label>
                  <textarea value={formData.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your requirements..." rows={4} className="w-full bg-transparent border-b border-[#35020D]/30 py-2 focus:outline-none focus:border-[#35020D] transition-colors placeholder:text-[#35020D]/30 resize-none" />
                </div>
                
                <button type="submit" disabled={submitEnquiry.isPending} className="inline-flex flex-1 w-full justify-center items-center gap-3 text-sm md:text-base font-semibold tracking-normal hover:bg-transparent hover:text-[#35020D] bg-[#35020D] border-2 border-[#35020D] text-[#fffff1] px-8 py-4 rounded-[2rem] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  <span>{submitEnquiry.isPending ? "Submitting…" : "Submit Enquiry"}</span>
                  <span className="inline-block w-1.5 h-1.5 border-[1.5px] border-current rounded-full"></span>
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-12">
              {[
                { title: "Visit Us", lines: ["Delta Industries", "No. 111, Janta Colony,", "G. T. Road, Jalandhar - 144008,", "Punjab, India"] },
                { title: "Call Us", lines: ["08048954176"] },
                { title: "Working Hours", lines: ["Mon — Sat: 9:00 AM — 6:00 PM", "Sunday: Closed"] },
              ].map((item) => (
                <div key={item.title} className="border-b border-[#35020D]/20 pb-6 flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#35020D]/70">{item.title}</h4>
                  <div className="space-y-1">
                    {item.lines.map((line) => (
                      <p key={line} className="text-lg font-medium text-[#35020D]">{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* WhatsApp Quick Connect */}
              <div className="pt-2">
                <a
                  href="https://wa.me/918048954176?text=Hello%20Delta%20Industries%2C%20I%20am%20interested%20in%20your%20trophy%20and%20awards%20products.%20Could%20you%20please%20share%20more%20details%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#35020D] border border-[#35020D]/20 rounded-sm px-4 py-2.5 hover:bg-[#35020D]/5 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  Quick Connect on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

