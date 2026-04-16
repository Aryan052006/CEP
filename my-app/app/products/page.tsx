"use client";

import { motion } from "framer-motion";
import { AppLayout } from "../components/AppLayout";
import { Store, User, MapPin, MessageCircle, Plus } from "lucide-react";

const PRODUCTS = [
  { id: 1, title: "Handwoven Cotton Saree", price: "₹1,200", seller: "Meera Devi", village: "Phulia, WB", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: 2, title: "Terracotta Clay Pots", price: "₹350", seller: "Sita Kumhar", village: "Khurja, UP", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: 3, title: "Organic Turmeric Powder", price: "₹180", seller: "Laxmi SHG", village: "Erode, TN", image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: 4, title: "Bamboo Storage Baskets", price: "₹450", seller: "Asha Craft", village: "Bongaigaon, AS", image: "https://images.unsplash.com/photo-1596041695509-3286bf556488?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: 5, title: "Hand-painted Diya Set", price: "₹200", seller: "Jyoti Art", village: "Jaipur, RJ", image: "https://images.unsplash.com/photo-1542451313066-1c25cb10170a?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: 6, title: "Homemade Mango Pickle", price: "₹250", seller: "Kamla Auntie", village: "Ratnagiri, MH", image: "https://images.unsplash.com/photo-1610574229656-7883d6cb75b1?auto=format&fit=crop&q=80&w=400&h=300" },
];

export default function ProductsPage() {
  return (
    <AppLayout>
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 px-1 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Store size={24} className="text-brand-pink" /> 
              Local Marketplace
            </h1>
            <p className="text-gray-500 text-sm">Support small businesses led by women.</p>
          </div>
          <button className="bg-brand-pink text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-brand-pink/20 hover:bg-pink-600 active:scale-95 transition-all">
            <Plus size={20} />
          </button>
        </div>

        {/* Categories (Scrollable) */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide px-1 -mx-4 md:mx-0 sm:px-0">
          <div className="w-4" /> {/* Spacer */}
          {["All", "Handicrafts", "Food & Spices", "Clothing", "Home Decor", "Beauty"].map((cat, i) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                i === 0 
                  ? "bg-gray-900 text-white border-gray-900" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="w-4" /> {/* Spacer */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-2">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-900">
                  {product.price}
                </div>
              </div>
              
              <div className="p-3 md:p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mb-2 line-clamp-2">
                  {product.title}
                </h3>
                
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
      </div>
    </AppLayout>
  );
}
