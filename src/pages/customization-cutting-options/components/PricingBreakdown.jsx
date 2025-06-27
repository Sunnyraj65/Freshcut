import React from 'react';
import Icon from 'components/AppIcon';

const PricingBreakdown = ({ product, customization, pricing }) => {
  const selectedCuttingOption = customization.cuttingStyle;
  const isExpressDelivery = customization.deliveryTime === 'express';

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calculator" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Price Breakdown
        </h3>
      </div>

      <div className="space-y-4">
        {/* Product Base Price */}
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="font-medium text-text-primary">
              {product.name}
            </div>
            <div className="text-sm text-text-secondary font-caption">
              {product.actualWeight}kg × ₹{product.pricePerKg}/kg
            </div>
          </div>
          <div className="text-right">
            <div className="font-data font-medium text-text-primary">
              ₹{pricing.basePrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Cutting Fee */}
        {selectedCuttingOption && (
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div>
              <div className="font-medium text-text-primary">
                {selectedCuttingOption === 'whole' ? 'Whole' : 'Curry Cut'} Processing
              </div>
              <div className="text-sm text-text-secondary font-caption">
                {selectedCuttingOption === 'whole' ? 'No cutting required' : 'Professional cutting service'}
              </div>
            </div>
            <div className="text-right">
              <div className="font-data font-medium text-text-primary">
                {pricing.cuttingFee > 0 ? `₹${pricing.cuttingFee.toFixed(2)}` : 'Free'}
              </div>
            </div>
          </div>
        )}

        {/* Delivery Fee */}
        <div className="flex items-center justify-between py-2 border-t border-border">
          <div>
            <div className="font-medium text-text-primary">
              {isExpressDelivery ? 'Express Delivery' : 'Standard Delivery'}
            </div>
            <div className="text-sm text-text-secondary font-caption">
              {isExpressDelivery ? 'Within 1 hour' : 'Within 2 hours'}
            </div>
          </div>
          <div className="text-right">
            <div className="font-data font-medium text-text-primary">
              {pricing.deliveryFee > 0 ? `₹${pricing.deliveryFee.toFixed(2)}` : 'Free'}
            </div>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between py-2 border-t border-border">
          <div className="font-medium text-text-primary">
            Subtotal
          </div>
          <div className="font-data font-medium text-text-primary">
            ₹{(pricing.basePrice + pricing.cuttingFee + pricing.deliveryFee).toFixed(2)}
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-3 border-t-2 border-primary bg-primary-50 rounded-lg px-3">
          <div>
            <div className="font-heading font-semibold text-primary">
              Total Amount
            </div>
            <div className="text-sm text-primary-700 font-caption">
              Including all charges
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-heading font-bold text-primary">
              ₹{pricing.total.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Savings Indicator */}
        {!isExpressDelivery && (
          <div className="flex items-center space-x-2 p-2 bg-success-50 rounded-lg">
            <Icon name="Percent" size={14} className="text-success" />
            <span className="text-sm text-success-700 font-caption">
              You saved ₹50 with standard delivery
            </span>
          </div>
        )}

        {/* Payment Methods */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-text-primary mb-3">
            Payment Options
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface-50 transition-smooth">
              <Icon name="CreditCard" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary font-caption">
                Credit/Debit Cards
              </span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface-50 transition-smooth">
              <Icon name="Smartphone" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary font-caption">
                UPI & Digital Wallets
              </span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface-50 transition-smooth">
              <Icon name="Banknote" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary font-caption">
                Cash on Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Price Guarantee */}
        <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-primary-700 font-caption">
              <strong>Price Lock Guarantee:</strong> The price shown here is final. No hidden charges or weight adjustments after confirmation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBreakdown;