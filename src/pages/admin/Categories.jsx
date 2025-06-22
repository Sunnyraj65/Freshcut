import React, { useEffect, useState } from "react";
import api from "utils/api";
import { useAuth } from "contexts/AuthContext";

const Categories = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await api.get("/categories", { headers: { Authorization: `Bearer ${token}` } });
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post(
      "/categories",
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setName("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchCategories();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <form onSubmit={addCategory} className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-60"
          placeholder="New category name"
        />
        <button className="bg-green-600 text-white px-4 rounded">Add</button>
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-3 border-b">ID</th>
            <th className="py-2 px-3 border-b">Name</th>
            <th className="py-2 px-3 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="py-2 px-3">{c.id}</td>
              <td className="py-2 px-3">{c.name}</td>
              <td className="py-2 px-3 text-right">
                <button
                  onClick={() => deleteCategory(c.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
