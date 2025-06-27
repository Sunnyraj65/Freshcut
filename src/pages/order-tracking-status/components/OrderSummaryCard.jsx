import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const OrderSummaryCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Package" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Order Summary
        </h2>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start space-x-4 p-4 bg-surface-50 rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-text-primary mb-1">
                {item.name}
              </h3>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary font-caption">Requested:</span>
                  <span className="font-data text-text-primary">{item.requestedWeight}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary font-caption">Actual:</span>
                  <span className="font-data font-semibold text-primary">{item.actualWeight}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary font-caption">Cut Style:</span>
                  <span className="font-medium text-text-primary">{item.cuttingStyle}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-data font-semibold text-lg text-text-primary">
                ₹{item.price.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Information */}
      <div className="border-t border-border pt-6 mb-6">
        <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="MapPin" size={18} />
          <span>Delivery Address</span>
        </h3>
        
        <div className="bg-surface-50 rounded-lg p-4">
          <div className="text-text-primary font-medium mb-1">
            {order.deliveryAddress.street}
          </div>
          <div className="text-text-secondary font-caption mb-3">
            {order.deliveryAddress.city} {order.deliveryAddress.zipCode}
          </div>
          
          {order.deliveryAddress.instructions && (
            <div className="border-t border-surface-200 pt-3">
              <div className="text-sm text-text-secondary font-caption">
                <span className="font-medium">Instructions:</span> {order.deliveryAddress.instructions}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Totals */}
      <div className="border-t border-border pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary font-caption">Subtotal</span>
            <span className="font-data text-text-primary">
              ₹{(order.totalAmount - order.deliveryFee).toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary font-caption">Delivery Fee</span>
            <span className="font-data text-text-primary">
              ₹{order.deliveryFee.toFixed(2)}
            </span>
          </div>
          
          <div className="border-t border-surface-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-semibold text-text-primary">Total</span>
              <span className="font-data font-bold text-lg text-primary">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Metadata */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary font-caption block">Order Date</span>
            <span className="font-data text-text-primary">
              {order.orderDate.toLocaleDateString()}
            </span>
          </div>
          
          <div>
            <span className="text-text-secondary font-caption block">Order Time</span>
            <span className="font-data text-text-primary">
              {order.orderDate.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;