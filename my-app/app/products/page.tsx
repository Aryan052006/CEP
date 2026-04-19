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
  const { apiFetch } = useAuth();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await apiFetch("/content/products");
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  return (
    <AppLayout>
      <div className="w-full">
        <div className="mb-6 px-1 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Store size={24} className="text-brand-pink" /> Local Marketplace
            </h1>
            <p className="text-gray-500 text-sm">Support small businesses led by women.</p>
          </div>
          <button className="bg-brand-pink text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-brand-pink/20 hover:bg-pink-600 active:scale-95 transition-all">
            <Plus size={20} />
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
        ) : (
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
        )}
      </div>
    </AppLayout>
  );
}
