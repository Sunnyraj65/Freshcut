// Cart status constants
export const CART_STATUS = {
  EMPTY: 'empty',
  ACTIVE: 'active',
  PROCESSING: 'processing'
};

// Payment methods
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  UPI: 'upi'
};

// Order status constants
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Checkout steps
export const CHECKOUT_STEPS = {
  CART: 'cart',
  DELIVERY: 'checkout',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation'
};

// Tax percentage
export const TAX_PERCENTAGE = 0.05; // 5%

// Default delivery fee
export const DEFAULT_DELIVERY_FEE = 0;

// Express delivery fee
export const EXPRESS_DELIVERY_FEE = 50;