import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard,
  Inbox,
  Package,
  Grid3X3,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Grid3X3 },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const utils = trpc.useUtils();

  const { data: me, isLoading } = trpc.admin.me.useQuery();

  useEffect(() => {
    if (!isLoading && !me) {
      navigate("/admin/login", { replace: true });
    }
  }, [me, isLoading, navigate]);

  const logout = trpc.admin.logout.useMutation({
    onSuccess: () => {
      utils.admin.me.invalidate();
      navigate("/admin/login");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#35020D] text-[#ffffe3] flex items-center justify-center">
        <div className="animate-pulse text-sm opacity-60">Loading...</div>
      </div>
    );
  }

  if (!me) return null;

  return (
    <div className="min-h-screen bg-[#ffffe3] text-[#35020D] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#35020D] text-[#ffffe3] flex flex-col fixed h-screen">
        <div className="p-6 border-b border-[#ffffe3]/10">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 opacity-80" />
            <div>
              <h2 className="font-semibold text-sm tracking-tight">Delta Admin</h2>
              <p className="text-xs opacity-50">{me.name}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-[#ffffe3]/10 text-[#ffffe3] font-medium"
                    : "text-[#ffffe3]/60 hover:text-[#ffffe3] hover:bg-[#ffffe3]/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#ffffe3]/10">
          <button
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="flex items-center gap-3 px-4 py-2 text-sm text-[#ffffe3]/60 hover:text-red-300 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
