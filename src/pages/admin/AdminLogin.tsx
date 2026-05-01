import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: async () => {
      await utils.admin.me.invalidate();
      navigate("/admin/dashboard");
    },
    onError: (err) => {
      setError(err.message || "Login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#35020D] text-[#ffffe3] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl font-normal tracking-tight">Admin Portal</h1>
          <p className="text-sm opacity-60 mt-2">Delta Industries Management Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-sm">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase opacity-70 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#ffffe3]/5 border border-[#ffffe3]/20 rounded-sm text-[#ffffe3] placeholder:text-[#ffffe3]/30 focus:outline-none focus:border-[#ffffe3]/40"
              placeholder="admin@deltaindustries.in"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase opacity-70 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-[#ffffe3]/5 border border-[#ffffe3]/20 rounded-sm text-[#ffffe3] placeholder:text-[#ffffe3]/30 focus:outline-none focus:border-[#ffffe3]/40"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 bg-[#ffffe3] text-[#35020D] font-semibold rounded-sm hover:bg-[#ffffe3]/90 disabled:opacity-50 transition-colors"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs opacity-40">
          Delta Industries — Authorized Personnel Only
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
