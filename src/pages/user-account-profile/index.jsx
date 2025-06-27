import React, { useEffect, useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import InfoCard from './components/InfoCard';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import api from 'utils/api';

const menuItems = [
  { key: 'info', label: 'My Orders', icon: 'Package' },
  { key: 'wishlist', label: 'Wishlist', icon: 'Heart' },
  { key: 'list', label: 'My List', icon: 'List' },
  { key: 'coupons', label: 'Coupons', icon: 'CreditCard' },
  { key: 'addresses', label: 'Delivery Addresses', icon: 'MapPin' },
];

const UserAccountProfile = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('info');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface p-6 flex flex-col gap-6">
      <div>
        <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <SidebarMenu
          user={user}
          items={menuItems}
          active={activeTab}
          onChange={setActiveTab}
        />

        {/* Content panel */}
        <div className="flex-1 max-w-2xl">
          {activeTab === 'info' && <InfoCard user={user} onEdit={() => {}} />}
          {activeTab === 'info' && (
            <div className="mt-8">
              <h2 className="text-xl font-heading font-bold mb-4 text-text-primary">My Orders</h2>
              {loading ? (
                <p className="text-text-secondary">Loading...</p>
              ) : orders.length === 0 ? (
                <p className="text-text-secondary">You have no orders yet.</p>
              ) : (
                <ul className="space-y-4">
                  {orders.map((o) => (
                    <li key={o.id} className="p-4 border rounded shadow-sm bg-white">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Order #{o.id}</span>
                        <span className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm mt-1">Status: {o.status}</p>
                      <p className="text-sm">Total: ₹{o.total.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {/* Other tabs placeholder */}
          {activeTab !== 'info' && (
            <div className="p-6 bg-white border border-border rounded-lg text-text-secondary">
              Feature coming soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccountProfile;