"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { Store, User, MapPin, MessageCircle, Plus } from "lucide-react";

interface ProductData {
  _id: string;
  title: string;
  price: number;
  seller: string;
  village: string;
  image: string;
  category: string;
}

export default function ProductsPage() {
  const { apiFetch, user } = useAuth();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"all" | "mine">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", category: "Handicrafts", description: "", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400&h=300" });
  const [adding, setAdding] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await apiFetch(`/content/products${viewMode === "mine" ? "?mine=true" : ""}`);
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [viewMode]);

  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await apiFetch("/content/products", {
        method: "POST",
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          village: user?.state || "Local",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewProduct({ title: "", price: "", category: "Handicrafts", description: "", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400&h=300" });
        fetchProducts();
      }
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <AppLayout>
      <div className="w-full">
        <div className="mb-6 px-1 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Store size={24} className="text-brand-pink" /> {viewMode === "all" ? "Local Marketplace" : "My Products"}
            </h1>
            <p className="text-gray-500 text-sm">
              {viewMode === "all" ? "Support small businesses led by women." : "Manage your listed products."}
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-brand-pink text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-brand-pink/20 hover:bg-pink-600 active:scale-95 transition-all"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6 px-1">
          <button 
            onClick={() => setViewMode("all")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              viewMode === "all" ? "bg-brand-pink/10 text-brand-pink border border-brand-pink/20" : "bg-white text-gray-500 border border-gray-100"
            }`}
          >
            All Products
          </button>
          <button 
            onClick={() => setViewMode("mine")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              viewMode === "mine" ? "bg-brand-pink/10 text-brand-pink border border-brand-pink/20" : "bg-white text-gray-500 border border-gray-100"
            }`}
          >
            My Products
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide px-1 -mx-4 md:mx-0 sm:px-0">
          <div className="w-4 md:hidden" />
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                activeCategory === cat ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="w-4 md:hidden" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-3 md:p-5 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-8 bg-gray-100 rounded-xl mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-2">
            {filtered.map((product, i) => (
              <motion.div key={product._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-900">
                    ₹{product.price}
                  </div>
                </div>
                <div className="p-3 md:p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mb-2 line-clamp-2">{product.title}</h3>
                  <div className="mt-auto space-y-1 md:space-y-2 mb-3 md:mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <User size={12} className="text-gray-400" />
                      <span className="truncate">{product.seller}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin size={12} className="text-gray-400" />
                      <span className="truncate">{product.village}</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-brand-pink/5 text-brand-pink font-semibold text-xs md:text-sm rounded-xl border border-brand-pink/20 hover:bg-brand-pink hover:text-white transition-colors flex items-center justify-center gap-1.5 active:scale-95">
                    <MessageCircle size={14} /> Contact
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <Store className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {viewMode === "mine" ? "You haven't listed any products yet." : "No products available in this category."}
            </p>
            {viewMode === "mine" && (
              <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-pink text-white font-bold rounded-xl shadow-lg shadow-brand-pink/20 active:scale-95 transition-all"
              >
                <Plus size={20} /> List Your First Product
              </button>
            )}
          </div>
        )}

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-md rounded-3xl p-6 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 px-1">Product Title</label>
                  <input required type="text" placeholder="e.g. Handmade Woolen Scarf" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink/20 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 px-1">Price (₹)</label>
                    <input required type="number" placeholder="499" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 px-1">Category</label>
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink/20 outline-none bg-white">
                      <option>Clothing</option>
                      <option>Home Decor</option>
                      <option>Food & Spices</option>
                      <option>Handicrafts</option>
                      <option>Jewelry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 px-1">Description</label>
                  <textarea rows={3} placeholder="Tell buyers about your product..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink/20 outline-none resize-none" />
                </div>
                <button disabled={adding} type="submit" className="w-full py-4 bg-brand-pink text-white font-bold rounded-xl shadow-lg shadow-brand-pink/20 hover:bg-pink-600 active:scale-95 transition-all disabled:opacity-50">
                  {adding ? "Listing..." : "List Product"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
