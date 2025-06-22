import { useEffect, useState } from 'react';
import api from 'utils/api';
import { useAuth } from 'contexts/AuthContext';

/**
 * Custom hook to fetch and expose the authenticated user's orders.
 *
 * Returns an object with:
 *  - orders: array|null  (null while loading, [] when no orders)
 *  - ordersCount: number (0 when none)
 *  - hasOrders: boolean
 */
export default function useOrders() {
  const { token } = useAuth() || {};
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    // If the user is not authenticated there are definitely no orders.
    if (!token) {
      setOrders([]);
      return;
    }

    let mounted = true;
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        if (mounted) {
          setOrders(Array.isArray(res.data) ? res.data : []);
        }
      } catch (e) {
        console.error('Failed to fetch orders', e);
        if (mounted) setOrders([]);
      }
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, [token]);

  return {
    orders,
    ordersCount: orders ? orders.length : 0,
    hasOrders: !!orders && orders.length > 0,
  };
}
