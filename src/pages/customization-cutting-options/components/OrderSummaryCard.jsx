import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const OrderSummaryCard = ({ product }) => {
  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Package" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Order Summary
        </h2>
      </div>

      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-100 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary mb-1">
            {product.name}
          </h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Weight" size={14} />
              <span className="font-caption">
                Selected: {product.selectedWeight}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Scale" size={14} />
              <span className="font-caption">
                Actual: {product.actualWeight}kg
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="IndianRupee" size={14} />
              <span className="font-caption">
                ₹{product.pricePerKg}/kg
              </span>
            </div>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2 px-2 py-1 bg-success-50 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full pulse-availability"></div>
            <span className="text-xs font-medium text-success font-caption">
              Live
            </span>
          </div>
          <div className="text-sm font-data font-medium text-primary">
            ₹{(product.actualWeight * product.pricePerKg).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Weight Guarantee Badge */}
      <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            Weight Guarantee
          </span>
        </div>
        <p className="text-xs text-primary-700 mt-1 font-caption">
          Exact weight confirmed before cutting. Pay only for actual weight delivered.
        </p>
      </div>
    </div>
  );
};

export default OrderSummaryCard;