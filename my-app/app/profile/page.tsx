"use client";

import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { User, Settings, LogOut, ChevronRight, Bookmark, CircleCheck } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();

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
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <User size={40} className="text-gray-300" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name || "User"}</h2>
          <p className="text-gray-500 font-medium mb-1">{user?.state || "India"} · {user?.employmentStatus || "—"}</p>
          {user?.income ? (
            <p className="text-sm text-gray-400 mb-4">Monthly Income: ₹{user.income.toLocaleString()}</p>
          ) : null}
          <button className="px-6 py-2 bg-gray-50 text-gray-700 text-sm font-semibold rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Details */}
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

        {/* Account Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">Account Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium text-gray-800">{user?.phone || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Age</span>
              <span className="font-medium text-gray-800">{user?.age || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="font-medium text-gray-800">{user?.employmentStatus || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">State</span>
              <span className="font-medium text-gray-800">{user?.state || "—"}</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full bg-white rounded-2xl p-4 flex items-center justify-center gap-2 text-red-500 font-bold border border-red-50 hover:bg-red-50 transition-colors active:scale-95"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </AppLayout>
  );
}
