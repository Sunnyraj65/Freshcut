import { useState, useEffect } from 'react';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('freshcut_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
      }
    }
    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      if (cartItems.length > 0) {
        localStorage.setItem('freshcut_cart', JSON.stringify(cartItems));
      } else {
        localStorage.removeItem('freshcut_cart');
      }
    }
  }, [cartItems, loading]);

  // Add item to cart
  const addItem = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => 
        i.id === item.id && 
        i.customization?.cuttingStyle === item.customization?.cuttingStyle
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = (updatedItems[existingItemIndex].quantity || 1) + quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  // Update item quantity
  const updateItemQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart totals
  const getCartSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.pricing?.total || 0) * (item.quantity || 1);
    }, 0);
    
    const deliveryFee = cartItems.reduce((sum, item) => {
      return sum + (item.pricing?.deliveryFee || 0);
    }, 0);
    
    const cuttingFee = cartItems.reduce((sum, item) => {
      return sum + (item.pricing?.cuttingFee || 0) * (item.quantity || 1);
    }, 0);
    
    const tax = subtotal * 0.05; // 5% tax
    
    return {
      subtotal,
      deliveryFee,
      cuttingFee,
      tax,
      total: subtotal + deliveryFee + tax,
      itemCount: cartItems.reduce((count, item) => count + (item.quantity || 1), 0)
    };
  };

  return {
    cartItems,
    loading,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    getCartSummary
  };
};

export default useCart;