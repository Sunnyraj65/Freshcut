import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const Layout = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link className="block hover:bg-gray-700 px-2 py-1 rounded" to="/admin/categories">Categories</Link>
          <Link className="block hover:bg-gray-700 px-2 py-1 rounded" to="/admin/products">Products</Link>
        </nav>
        <button onClick={logout} className="mt-10 text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Logout</button>
      </aside>
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
