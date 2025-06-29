import React, { useEffect, useState } from "react";
import api from "utils/api";
import { useAuth } from "contexts/AuthContext";

const Products = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    targetWeight: "",
    pricePerKg: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    const [prodRes, catRes] = await Promise.all([
      api.get("/products", { headers }),
      api.get("/categories", { headers }),
    ]);
    setProducts(prodRes.data);
    setCategories(catRes.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.name || !form.targetWeight || !form.pricePerKg || !form.categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    const fd = new FormData();
    const weight = parseFloat(form.targetWeight);
    const price = parseFloat(form.pricePerKg);
    fd.append("data", JSON.stringify({
      ...form,
      targetWeight: weight,
      actualWeight: weight,
      pricePerKg: price,
      totalPrice: +(weight * price).toFixed(2),
      categoryId: Number(form.categoryId),
      images: [],
    }));
    await api.post("/products", fd, { headers });
    setForm({ name: "", targetWeight: "", pricePerKg: "", categoryId: "" });
    fetchData();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`, { headers });
    fetchData();
  };

  return (
    <div className="p-6 overflow-auto">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <form onSubmit={addProduct} className="grid grid-cols-5 gap-3 mb-6 items-end">
        <input 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          placeholder="Name" 
          className="border px-3 py-2 rounded" 
          required 
        />
        <input 
          name="targetWeight" 
          value={form.targetWeight} 
          onChange={handleChange} 
          placeholder="Target Weight" 
          className="border px-3 py-2 rounded" 
          type="number"
          step="0.01"
          min="0"
          required 
        />
        <input 
          name="pricePerKg" 
          value={form.pricePerKg} 
          onChange={handleChange} 
          placeholder="Price/kg" 
          className="border px-3 py-2 rounded" 
          type="number"
          step="0.01"
          min="0"
          required 
        />
        <select 
          name="categoryId" 
          value={form.categoryId} 
          onChange={handleChange} 
          className="border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-3 border-b">ID</th>
            <th className="py-2 px-3 border-b">Name</th>
            <th className="py-2 px-3 border-b">Weight</th>
            <th className="py-2 px-3 border-b">Price/kg</th>
            <th className="py-2 px-3 border-b">Category</th>
            <th className="py-2 px-3 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2 px-3">{p.id}</td>
              <td className="py-2 px-3">{p.name}</td>
              <td className="py-2 px-3">{p.targetWeight}</td>
              <td className="py-2 px-3">{p.pricePerKg}</td>
              <td className="py-2 px-3">{p.category?.name}</td>
              <td className="py-2 px-3 text-right">
                <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;