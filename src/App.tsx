import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ChatWidget from "@/components/chat/ChatWidget";
import { trpc, trpcClient } from "@/lib/trpc";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Quality from "./pages/Quality";
import Testimonial from "./pages/Testimonial";
import SearchPage from "./pages/Search";
import NotFound from "./pages/NotFound";
import CustomOrders from "./pages/CustomOrders";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";

const AdminNotFound = () => (
  <div className="flex items-center justify-center h-full min-h-[60vh]">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-normal text-[#35020D]">Page not found</h2>
      <p className="text-sm text-[#35020D]/60">This admin page does not exist.</p>
      <Link to="/admin/dashboard" className="inline-block text-sm font-medium text-[#35020D] underline hover:opacity-70">
        Back to Dashboard
      </Link>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <ChatWidget />
  </>
);

const App = () => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/testimonials" element={<Testimonial />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/custom-orders" element={<CustomOrders />} />
              <Route path="/manufacturing" element={<CustomOrders />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="*" element={<AdminNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </trpc.Provider>
);

export default App;

