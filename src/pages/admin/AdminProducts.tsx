import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Package, Search, Plus, ArrowLeft, ArrowRight, Loader2, Eye, EyeOff, Pencil, Trash2, X, Upload } from "lucide-react";
import { PAGINATION, CLOUDINARY } from "@/lib/constants";
import type { EditingProduct } from "@/lib/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [editing, setEditing] = useState<EditingProduct | null>(null);
  const editDrawerRef = useRef<HTMLDivElement>(null);
  const limit = PAGINATION.DEFAULT_LIMIT;

  const { data, isLoading } = trpc.product.listAll.useQuery(
    (search ? { search, limit, offset } : { limit, offset }) as any
  );

  const utils = trpc.useUtils();
  const toggleMutation = trpc.product.toggleActive.useMutation({
    onSuccess: () => utils.product.listAll.invalidate(),
  });
  const deleteMutation = trpc.product.delete.useMutation({
    onSuccess: () => utils.product.listAll.invalidate(),
  });

  // Scroll to edit drawer when it opens
  useEffect(() => {
    if (editing && editDrawerRef.current) {
      editDrawerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-normal tracking-tight flex items-center gap-3">
            <Package className="w-7 h-7 opacity-60" />
            Products
          </h1>
          <button
            onClick={() => setEditing({ isNew: true })}
            className="flex items-center gap-2 px-4 py-2 bg-[#35020D] text-[#ffffe3] text-sm font-medium rounded-sm hover:bg-[#35020D]/90"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 opacity-30" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOffset(0); }}
            placeholder="Search products..."
            className="flex-1 px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30 bg-white"
          />
          {search && (
            <button onClick={() => { setSearch(""); setOffset(0); }} className="p-1 opacity-40 hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          )}
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
                    <th className="text-left px-4 py-3 font-medium opacity-60">Name</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60 hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60 hidden sm:table-cell">Sizes</th>
                    <th className="text-left px-4 py-3 font-medium opacity-60">Active</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#35020D]/5">
                  {data.items.map((p) => (
                    <tr key={p.id} className="hover:bg-[#35020D]/[0.02]">
                      <td className="px-4 py-3">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs opacity-50 font-mono">{p.slug}</div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-xs opacity-60">{p.category?.name}</td>
                      <td className="px-4 py-3 hidden sm:table-cell text-xs opacity-60">
                        {p.sizes.map((s: any) => s.label).join(", ") || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleMutation.mutate({ id: p.id, isActive: !p.isActive })}
                          disabled={toggleMutation.isPending}
                          className={`p-1.5 rounded-sm border transition-colors ${
                            p.isActive
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                              : "bg-gray-50 border-gray-200 text-gray-400"
                          }`}
                        >
                          {p.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditing({ ...p, isNew: false } as EditingProduct)}
                            className="p-1.5 hover:bg-[#35020D]/5 rounded-sm opacity-50 hover:opacity-100"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this product?")) deleteMutation.mutate({ id: p.id });
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
              {data.items.length === 0 && (
                <div className="text-center py-16 text-sm opacity-40">
                  No products found
                </div>
              )}
            </div>

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

        {/* Edit Drawer */}
        {editing && (
          <div ref={editDrawerRef}>
            <ProductEditDrawer product={editing} onClose={() => setEditing(null)} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

const ProductEditDrawer = ({ product, onClose }: { product: EditingProduct; onClose: () => void }) => {
  const isNew = product.isNew;
  const [name, setName] = useState(product.name || "");
  const [slug, setSlug] = useState(product.slug || "");
  const [material, setMaterial] = useState(product.material || "");
  const [shortDesc, setShortDesc] = useState(product.shortDesc || "");
  const [description, setDescription] = useState(product.description || "");
  const [categoryId, setCategoryId] = useState(product.categoryId || "");
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const [availableSizes, setAvailableSizes] = useState(product.sizes?.map((s: any) => s.label).join(", ") || "");
  const [minOrderQty, setMinOrderQty] = useState(product.sizes?.[0]?.moq || 1);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        // Convert image to base64 for local storage
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImageUrl(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const utils = trpc.useUtils();
  const { data: categories } = trpc.category.listAll.useQuery();
  const updateMutation = trpc.product.update.useMutation({
    onSuccess: () => {
      utils.product.listAll.invalidate();
      onClose();
    },
  });
  const createMutation = trpc.product.create.useMutation({
    onSuccess: () => {
      utils.product.listAll.invalidate();
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Parse available sizes into array
    const sizesArray = availableSizes
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(label => ({
        label,
        moq: minOrderQty,
        inStock: true,
      }));

    const data = {
      name,
      slug,
      material,
      shortDesc,
      description,
      categoryId: Number(categoryId),
      imageUrl,
      sizes: sizesArray.length > 0 ? sizesArray : undefined,
    };
    if (isNew) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate({ id: product.id, ...data });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 bg-white border border-[#35020D]/10 rounded-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{isNew ? "New Product" : "Edit Product"}</h3>
        <button onClick={onClose} className="p-1 opacity-40 hover:opacity-80">
          <X className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30" required />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30" required />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30 bg-white" required>
            <option value="">Select...</option>
            {categories?.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Material</label>
          <input value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Available Sizes</label>
          <input
            value={availableSizes}
            onChange={(e) => setAvailableSizes(e.target.value)}
            placeholder="e.g. Small, Medium, Large"
            className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Min. Order Qty</label>
          <input
            type="number"
            min="1"
            value={minOrderQty}
            onChange={(e) => setMinOrderQty(Number(e.target.value))}
            className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Short Description</label>
          <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1 block">Image</label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="w-full px-3 py-2 border border-[#35020D]/10 rounded-sm text-sm focus:outline-none focus:border-[#35020D]/30 disabled:opacity-50"
              />
              {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
            </div>
            {imageUrl && (
              <div className="relative">
                <img src={imageUrl} alt="Product" className="w-32 h-32 object-cover rounded-sm border border-[#35020D]/10" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="sm:col-span-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-[#35020D]/10 rounded-sm text-sm hover:bg-[#35020D]/5">Cancel</button>
          <button
            type="submit"
            disabled={updateMutation.isPending || createMutation.isPending}
            className="px-4 py-2 bg-[#35020D] text-[#ffffe3] rounded-sm text-sm font-medium hover:bg-[#35020D]/90 disabled:opacity-50"
          >
            {isNew ? "Create" : "Save"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminProducts;
