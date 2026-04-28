import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Grid3X3, Plus, Loader2, Pencil, Trash2, X, Package } from "lucide-react";
import { PAGINATION } from "@/lib/constants";
import type { EditingCategory, CategoryDisplay } from "@/lib/types";

const AdminCategories = () => {
  const [editing, setEditing] = useState<EditingCategory | null>(null);
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.category.listAll.useQuery();

  const createMutation = trpc.category.create.useMutation({
    onSuccess: () => {
      utils.category.listAll.invalidate();
      utils.category.getAll.invalidate();
      setEditing(null);
    },
  });
  const updateMutation = trpc.category.update.useMutation({
    onSuccess: () => {
      utils.category.listAll.invalidate();
      utils.category.getAll.invalidate();
      setEditing(null);
    },
  });
  const deleteMutation = trpc.category.delete.useMutation({
    onSuccess: () => {
      utils.category.listAll.invalidate();
      utils.category.getAll.invalidate();
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-normal tracking-tight flex items-center gap-3">
            <Grid3X3 className="w-7 h-7 opacity-60" />
            Categories
          </h1>
          <button
            onClick={() => setEditing({ isNew: true })}
            className="flex items-center gap-2 px-4 py-2 bg-[#35020D] text-[#ffffe3] text-sm font-medium rounded-sm hover:bg-[#35020D]/90"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin opacity-40" />
          </div>
        )}

        {!isLoading && data && (
          <div className="bg-white border border-[#35020D]/10 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#35020D]/10 bg-[#35020D]/[0.02]">
                  <th className="text-left px-4 py-3 font-medium opacity-60">Name</th>
                  <th className="text-left px-4 py-3 font-medium opacity-60 hidden md:table-cell">Slug</th>
                  <th className="text-left px-4 py-3 font-medium opacity-60 hidden sm:table-cell">Products</th>
                  <th className="text-left px-4 py-3 font-medium opacity-60">Active</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#35020D]/5">
                {data.map((c: CategoryDisplay) => (
                  <tr key={c.id} className="hover:bg-[#35020D]/[0.02]">
                    <td className="px-4 py-3">
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs opacity-50 mt-0.5 line-clamp-1 max-w-xs">{c.description}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs font-mono opacity-60">{c.slug}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-xs opacity-60">
                        <Package className="w-3.5 h-3.5" />
                        {c._count?.products ?? 0}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-sm border font-medium ${
                          c.isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditing({ ...c, isNew: false })}
                          className="p-1.5 hover:bg-[#35020D]/5 rounded-sm opacity-50 hover:opacity-100"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete this category?")) deleteMutation.mutate({ id: c.id });
                          }}
                          className="p-1.5 hover:bg-red-50 rounded-sm opacity-50 hover:opacity-100 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Drawer */}
        {editing && (
          <CategoryEditDrawer
            category={editing}
            onClose={() => setEditing(null)}
            onSave={(data) => {
              if (editing.isNew) {
                createMutation.mutate(data);
              } else {
                updateMutation.mutate({ id: editing.id, ...data });
              }
            }}
            isPending={createMutation.isPending || updateMutation.isPending}
          />
        )}
      </motion.div>
    </div>
  );
};

const CategoryEditDrawer = ({
  category,
  onClose,
  onSave,
  isPending,
}: {
  category: EditingCategory;
  onClose: () => void;
  onSave: (data: { name: string; slug: string; description?: string; sortOrder: number }) => void;
  isPending: boolean;
}) => {
  const isNew = category.isNew;
  const [name, setName] = useState(category.name || "");
  const [slug, setSlug] = useState(category.slug || "");
  const [description, setDescription] = useState(category.description || "");
  const [sortOrder, setSortOrder] = useState(category.sortOrder ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, slug, description: description || undefined, sortOrder: Number(sortOrder) });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 bg-white border border-[#35020D]/10 rounded-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{isNew ? "New Category" : "Edit Category"}</h3>
        <button onClick={onClose} className="p-1 opacity-40 hover:opacity-80">
          <X className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30"
          />
        </div>
        <div className="sm:col-span-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#35020D]/10 rounded-sm text-sm hover:bg-[#35020D]/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-[#35020D] text-[#ffffe3] rounded-sm text-sm font-medium hover:bg-[#35020D]/90 disabled:opacity-50"
          >
            {isNew ? "Create" : "Save"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminCategories;
