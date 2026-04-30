import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Inbox, Search, ArrowLeft, ArrowRight, Loader2, X, Mail, Phone, Eye } from "lucide-react";
import { STATUS_FILTERS, PAGINATION, STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";

const AdminEnquiries = () => {
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [offset, setOffset] = useState(0);
  const limit = PAGINATION.DEFAULT_LIMIT;
  const [selected, setSelected] = useState<number | null>(null);

  const { data, isLoading } = trpc.enquiry.list.useQuery(
    (filter && filter !== "all" ? { status: filter as "new" | "in_progress" | "resolved" | "spam", limit, offset } : { limit, offset })
  );

  const utils = trpc.useUtils();
  const updateMutation = trpc.enquiry.updateStatus.useMutation({
    onSuccess: () => {
      utils.enquiry.list.invalidate();
      utils.enquiry.stats.invalidate();
    },
  });

  const selectedEnquiry = data?.items.find((e) => e.id === selected);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-normal tracking-tight flex items-center gap-3">
            <Inbox className="w-7 h-7 opacity-60" />
            Enquiries
          </h1>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 opacity-40" />
            {STATUS_FILTERS.map((s) => (
              <button
                key={s.value}
                onClick={() => {
                  setFilter(s.value === "all" ? undefined : s.value);
                  setOffset(0);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
                  (s.value === "all" && !filter) || filter === s.value
                    ? "bg-[#35020D] text-[#ffffe3] border-[#35020D]"
                    : "bg-white text-[#35020D] border-[#35020D]/20 hover:border-[#35020D]/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin opacity-40" />
          </div>
        )}

        {!isLoading && data && (
          <>
            <div className="bg-white border border-[#35020D]/10 rounded-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#35020D]/10 bg-[#35020D]/[0.02]">
                    <th className="text-left px-4 py-3 font-medium opacity-60">ID</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60">Customer</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60 hidden md:table-cell">Contact</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60 hidden lg:table-cell">Product</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60 hidden xl:table-cell">Qty</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60">Status</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60 hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#35020D]/5">
                  {data.items.map((e) => (
                    <tr
                      key={e.id}
                      className={`hover:bg-[#35020D]/[0.02] transition-colors cursor-pointer ${
                        selected === e.id ? "bg-[#35020D]/[0.04]" : ""
                      }`}
                      onClick={() => setSelected(e.id)}
                    >
                      <td className="px-4 py-3 opacity-60 font-mono text-xs">#{e.id}</td>
                      <td className="px-4 py-3 font-medium">{e.customerName}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center gap-1 text-xs opacity-60">
                          <Mail className="w-3 h-3" /> {e.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs opacity-60">
                        {e.product?.name || "—"}
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell text-xs opacity-60">
                        {e.quantity || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={e.status} />
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-xs opacity-50">
                        {new Date(e.submittedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <Eye className="w-4 h-4 opacity-30" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.items.length === 0 && (
                <div className="text-center py-16 text-sm opacity-40">
                  No enquiries found
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs opacity-50">
                Showing {offset + 1}–{Math.min(offset + limit, data.total)} of {data.total}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOffset(Math.max(0, offset - limit))}
                  disabled={offset === 0}
                  className="p-2 border border-[#35020D]/10 rounded-sm hover:bg-[#35020D]/5 disabled:opacity-30"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOffset(offset + limit)}
                  disabled={offset + limit >= data.total}
                  className="p-2 border border-[#35020D]/10 rounded-sm hover:bg-[#35020D]/5 disabled:opacity-30"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Detail Drawer */}
        {selectedEnquiry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white border border-[#35020D]/10 rounded-sm p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Enquiry #{selectedEnquiry.id}</h3>
                <p className="text-xs opacity-50 mt-1">
                  {new Date(selectedEnquiry.submittedAt).toLocaleString("en-IN")}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-xs opacity-40 hover:opacity-80">
                Close
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">Customer</div>
                <div className="font-medium">{selectedEnquiry.customerName}</div>
                {selectedEnquiry.organization && (
                  <div className="text-sm opacity-60">{selectedEnquiry.organization}</div>
                )}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">Contact</div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-3.5 h-3.5 opacity-40" /> {selectedEnquiry.email}
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Phone className="w-3.5 h-3.5 opacity-40" /> {selectedEnquiry.phone}
                </div>
              </div>
            </div>

            {selectedEnquiry.product && (
              <div className="mb-4 p-3 bg-[#35020D]/[0.02] rounded-sm border border-[#35020D]/5">
                <div className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">Linked Product</div>
                <div className="font-medium text-sm">{selectedEnquiry.product.name}</div>
              </div>
            )}

            {selectedEnquiry.quantity && (
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">Quantity</div>
                <div className="font-medium text-sm">{selectedEnquiry.quantity} pieces</div>
              </div>
            )}

            {selectedEnquiry.message && (
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">Message</div>
                <p className="text-sm opacity-80 leading-relaxed">{selectedEnquiry.message}</p>
              </div>
            )}

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-2">Update Status</div>
              <div className="flex items-center gap-2">
                {(["new", "in_progress", "resolved", "spam"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateMutation.mutate({ id: selectedEnquiry.id, status: s })}
                    disabled={updateMutation.isPending}
                    className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
                      selectedEnquiry.status === s
                        ? "bg-[#35020D] text-[#ffffe3] border-[#35020D]"
                        : "bg-white text-[#35020D] border-[#35020D]/20 hover:border-[#35020D]/40"
                    }`}
                  >
                    {s === "in_progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    new: "bg-amber-100 text-amber-700 border-amber-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    spam: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-sm border ${colors[status] || "bg-gray-100 text-gray-700 border-gray-200"}`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
};

export default AdminEnquiries;
