import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import {
  Inbox,
  Package,
  Grid3X3,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";

const AdminDashboard = () => {
  const { data: enquiryStats } = trpc.enquiry.stats.useQuery();
  const { data: categories } = trpc.category.listAll.useQuery();
  const { data: products } = trpc.product.listAll.useQuery({ limit: 1, offset: 0 });

  const statusData =
    enquiryStats?.byStatus.map((s) => ({
      name: STATUS_LABELS[s.status] || s.status,
      value: s._count.status,
      color: STATUS_COLORS[s.status] || "#8884d8",
    })) || [];

  const totalEnquiries = enquiryStats?.total ?? 0;
  const newEnquiries =
    enquiryStats?.byStatus.find((s) => s.status === "new")?._count.status ?? 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-normal tracking-tight mb-8">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Inbox className="w-5 h-5" />}
            label="Total Enquiries"
            value={totalEnquiries.toString()}
            link="/admin/enquiries"
            accent="bg-amber-50 border-amber-200"
          />
          <StatCard
            icon={<AlertCircle className="w-5 h-5" />}
            label="New Enquiries"
            value={newEnquiries.toString()}
            link="/admin/enquiries"
            accent="bg-blue-50 border-blue-200"
          />
          <StatCard
            icon={<Package className="w-5 h-5" />}
            label="Products"
            value={(products?.total ?? 0).toString()}
            link="/admin/products"
            accent="bg-emerald-50 border-emerald-200"
          />
          <StatCard
            icon={<Grid3X3 className="w-5 h-5" />}
            label="Categories"
            value={(categories?.length ?? 0).toString()}
            link="/admin/categories"
            accent="bg-purple-50 border-purple-200"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Enquiry Status Chart */}
          <div className="lg:col-span-2 bg-white border border-[#35020D]/10 rounded-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium">Enquiry Status Breakdown</h3>
              <TrendingUp className="w-4 h-4 opacity-40" />
            </div>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-sm opacity-40">
                No enquiry data yet
              </div>
            )}
          </div>

          {/* Status Pie Chart */}
          <div className="bg-white border border-[#35020D]/10 rounded-sm p-6">
            <h3 className="font-medium mb-6">Distribution</h3>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-sm opacity-40">
                No data
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-4">
              {statusData.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="opacity-70">
                    {s.name}: {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <AIInsightsCard
          totalEnquiries={totalEnquiries}
          newEnquiries={newEnquiries}
          enquiryStats={enquiryStats}
        />

        {/* Recent Enquiries */}
        <div className="bg-white border border-[#35020D]/10 rounded-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium">Recent Enquiries</h3>
            <Link
              to="/admin/enquiries"
              className="text-sm flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {enquiryStats?.recent && enquiryStats.recent.length > 0 ? (
            <div className="divide-y divide-[#35020D]/5">
              {enquiryStats.recent.map((e) => (
                <div key={e.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{e.customerName}</div>
                    <div className="text-xs opacity-50 mt-0.5">
                      {new Date(e.submittedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm opacity-40 py-8 text-center">
              No enquiries received yet
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  link,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
  accent: string;
}) => (
  <Link
    to={link}
    className={`p-5 border rounded-sm hover:shadow-sm transition-shadow ${accent}`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="opacity-60">{icon}</div>
      <ArrowRight className="w-4 h-4 opacity-30" />
    </div>
    <div className="text-3xl font-normal tracking-tight">{value}</div>
    <div className="text-xs font-semibold tracking-widest uppercase opacity-50 mt-1">
      {label}
    </div>
  </Link>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    new: "bg-amber-100 text-amber-700 border-amber-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    spam: "bg-red-100 text-red-700 border-red-200",
  };
  const labels: Record<string, string> = {
    new: "New",
    in_progress: "In Progress",
    resolved: "Resolved",
    spam: "Spam",
  };
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-sm border ${colors[status] || "bg-gray-100 text-gray-700 border-gray-200"}`}
    >
      {labels[status] || status}
    </span>
  );
};

export default AdminDashboard;

// ─── AI Insights Card ──────────────────────────────────────────────────────

function AIInsightsCard({
  totalEnquiries,
  newEnquiries,
  enquiryStats,
}: {
  totalEnquiries: number;
  newEnquiries: number;
  enquiryStats: { recent?: Array<{ customerName: string; status: string }>; byStatus?: Array<{ status: string; _count: { status: number } }> } | undefined;
}) {
  const [insights, setInsights] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const insightsMutation = trpc.ai.dashboardInsights.useMutation();

  useEffect(() => {
    const recentMessages = enquiryStats?.recent?.map((e) => e.customerName).slice(0, 5) || [];
    if (totalEnquiries === 0) return;

    insightsMutation
      .mutateAsync({
        totalEnquiries,
        newEnquiries,
        recentProducts: [],
        recentEnquiryMessages: recentMessages,
      })
      .then((res) => {
        setInsights(res.insights || []);
        setSummary(res.summary || "");
      })
      .catch(() => {});
  }, [totalEnquiries]);

  if (insights.length === 0) return null;

  return (
    <div className="mb-8 bg-white border border-[#35020D]/10 rounded-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-[#35020D]/50" />
        <h3 className="font-medium text-sm uppercase tracking-widest text-[#35020D]/60">AI Insights</h3>
      </div>
      {summary && (
        <p className="text-sm font-medium text-[#35020D] mb-4">{summary}</p>
      )}
      <ul className="space-y-2">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#35020D]/70">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#35020D]/30 shrink-0" />
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}
