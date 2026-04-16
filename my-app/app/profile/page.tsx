"use client";

import { AppLayout } from "../components/AppLayout";
import { User, Settings, LogOut, ChevronRight, Bookmark, CircleCheck } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="mb-6 px-1 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Settings size={24} />
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-brand-pink to-brand-purple rounded-full p-1 mb-4">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
              <User size={40} className="text-gray-300" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Radhika Sharma</h2>
          <p className="text-gray-500 font-medium mb-4">Maharashtra • Self-employed</p>
          <button className="px-6 py-2 bg-gray-50 text-gray-700 text-sm font-semibold rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Saved & Tracking */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 mb-6">
          <div className="p-4 flex items-center gap-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors rounded-t-2xl">
            <div className="w-10 h-10 bg-brand-pink/10 text-brand-pink rounded-xl flex items-center justify-center shrink-0">
              <Bookmark size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">Saved Schemes & Jobs</h3>
              <p className="text-xs text-gray-500">2 items saved</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          
          <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors rounded-b-2xl">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
              <CircleCheck size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">My Applications</h3>
              <p className="text-xs text-gray-500">1 pending review</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Logout */}
        <Link 
          href="/"
          className="w-full bg-white rounded-2xl p-4 flex items-center justify-center gap-2 text-red-500 font-bold border border-red-50 hover:bg-red-50 transition-colors active:scale-95"
        >
          <LogOut size={20} /> Logout
        </Link>
      </div>
    </AppLayout>
  );
}
