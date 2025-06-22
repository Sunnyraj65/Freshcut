import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import ProgressIndicator from 'components/ui/ProgressIndicator';
import CartStatusIndicator from 'components/ui/CartStatusIndicator';

// Import components
import OrderSummaryCard from './components/OrderSummaryCard';
import CuttingOptionsSelector from './components/CuttingOptionsSelector';
import WeightConfirmation from './components/WeightConfirmation';
import SpecialInstructions from './components/SpecialInstructions';
import DeliveryPreferences from './components/DeliveryPreferences';
import PricingBreakdown from './components/PricingBreakdown';

const CustomizationCuttingOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get selected product from previous page or use default
  // Support multi-selection from previous page
  let selectedProduct = null;
  const selectedAnimals = location.state?.selectedAnimals;

  if (Array.isArray(selectedAnimals) && selectedAnimals.length > 0) {
    const totalWeight = selectedAnimals.reduce((sum, a) => sum + parseFloat(a.actualWeight), 0);
    const category = selectedAnimals[0].category;
    selectedProduct = {
      id: Date.now(),
      type: category,
      name: `${selectedAnimals.length} x ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      selectedWeight: selectedAnimals.map(a => a.targetWeight).join(', '),
      actualWeight: parseFloat(totalWeight.toFixed(2)),
      image: selectedAnimals[0].image,
      pricePerKg: 180 // default rate
    };
  }

  // Fallback to single selection legacy state
  if (!selectedProduct) selectedProduct = location.state?.selectedProduct || {
    id: 1,
    type: 'chicken',
    name: 'Farm Fresh Chicken',
    selectedWeight: '1.6kg',
    actualWeight: 1.58,
    image: 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=800',
    basePrice: 280,
    pricePerKg: 180
  };

  const [customization, setCustomization] = useState({
    cuttingStyle: '',
    specialInstructions: '',
    deliveryTime: '2-hours',
    deliveryNotes: ''
  });

  const [isExpanded, setIsExpanded] = useState({
    instructions: false,
    delivery: false
  });

  const [pricing, setPricing] = useState({
    basePrice: 0,
    cuttingFee: 0,
    deliveryFee: 0,
    total: 0
  });

  // Mock cutting options data
  const cuttingOptions = [
    {
      id: 'whole',
      name: 'Whole',
      description: 'Complete bird delivered as-is, perfect for roasting or traditional cooking methods',
      image: 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=400',
      fee: 0,
      features: ['No cutting required', 'Ideal for roasting', 'Traditional preparation', 'Maximum freshness']
    },
    {
      id: 'curry-cut',
      name: 'Curry Cut',
      description: 'Medium-sized pieces perfect for curries, stews, and everyday cooking',
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
      fee: 20,
      features: ['Medium-sized pieces', 'Ready to cook', 'Perfect for curries', 'Bone-in cuts']
    }
  ];

  // Calculate pricing based on selections
  useEffect(() => {
    const basePrice = selectedProduct.actualWeight * selectedProduct.pricePerKg;
    const selectedCutting = cuttingOptions.find(option => option.id === customization.cuttingStyle);
    const cuttingFee = selectedCutting ? selectedCutting.fee : 0;
    const deliveryFee = customization.deliveryTime === 'express' ? 50 : 0;
    
    setPricing({
      basePrice: basePrice,
      cuttingFee: cuttingFee,
      deliveryFee: deliveryFee,
      total: basePrice + cuttingFee + deliveryFee
    });
  }, [customization, selectedProduct]);

  const handleCuttingStyleChange = (styleId) => {
    setCustomization(prev => ({
      ...prev,
      cuttingStyle: styleId
    }));
  };

  const handleSpecialInstructionsChange = (instructions) => {
    setCustomization(prev => ({
      ...prev,
      specialInstructions: instructions
    }));
  };

  const handleDeliveryChange = (preferences) => {
    setCustomization(prev => ({
      ...prev,
      ...preferences
    }));
  };

  const toggleExpanded = (section) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddToCart = () => {
    const orderItem = {
      ...selectedProduct,
      animals: selectedAnimals || [],
      customization,
      pricing,
      id: Date.now()
    };

    // In a real app, this would be added to cart state/context
    navigate('/shopping-cart-checkout', { 
      state: { 
        newItem: orderItem,
        fromCustomization: true 
      } 
    });
  };

  const canProceed = customization.cuttingStyle !== '';

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <ProgressIndicator />
      
      <main className="pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
              <Link to="/homepage" className="hover:text-primary transition-smooth">
                Home
              </Link>
              <Icon name="ChevronRight" size={16} />
              <Link to="/product-selection" className="hover:text-primary transition-smooth">
                Products
              </Link>
              <Icon name="ChevronRight" size={16} />
              <span className="text-primary">Customization</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Customize Your Order
            </h1>
            <p className="text-text-secondary font-caption">
              Choose cutting style and delivery preferences for your fresh {selectedProduct.type}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Summary */}
              <OrderSummaryCard product={selectedProduct} />

              {/* Cutting Options */}
              <CuttingOptionsSelector
                options={cuttingOptions}
                selectedStyle={customization.cuttingStyle}
                onStyleChange={handleCuttingStyleChange}
              />

              {/* Weight Confirmation */}
              <WeightConfirmation
                selectedWeight={selectedProduct.selectedWeight}
                actualWeight={selectedProduct.actualWeight}
                productType={selectedProduct.type}
              />

              {/* Special Instructions - Expandable */}
              <div className="card p-6">
                <button
                  onClick={() => toggleExpanded('instructions')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="MessageSquare" size={20} className="text-primary" />
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary">
                        Special Instructions
                      </h3>
                      <p className="text-sm text-text-secondary font-caption">
                        Optional cooking or preparation notes
                      </p>
                    </div>
                  </div>
                  <Icon 
                    name="ChevronDown" 
                    size={20} 
                    className={`text-text-tertiary transition-transform ${
                      isExpanded.instructions ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded.instructions && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <SpecialInstructions
                      instructions={customization.specialInstructions}
                      onChange={handleSpecialInstructionsChange}
                    />
                  </div>
                )}
              </div>

              {/* Delivery Preferences - Expandable */}
              <div className="card p-6">
                <button
                  onClick={() => toggleExpanded('delivery')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Truck" size={20} className="text-primary" />
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary">
                        Delivery Preferences
                      </h3>
                      <p className="text-sm text-text-secondary font-caption">
                        Choose delivery time and special notes
                      </p>
                    </div>
                  </div>
                  <Icon 
                    name="ChevronDown" 
                    size={20} 
                    className={`text-text-tertiary transition-transform ${
                      isExpanded.delivery ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded.delivery && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <DeliveryPreferences
                      preferences={{
                        deliveryTime: customization.deliveryTime,
                        deliveryNotes: customization.deliveryNotes
                      }}
                      onChange={handleDeliveryChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Breakdown */}
                <PricingBreakdown
                  product={selectedProduct}
                  customization={customization}
                  pricing={pricing}
                />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!canProceed}
                    className={`w-full py-4 px-6 rounded-lg font-medium transition-smooth ${
                      canProceed
                        ? 'bg-primary text-white hover:scale-105 hover:shadow-lg'
                        : 'bg-surface-200 text-text-tertiary cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Icon name="ShoppingCart" size={20} />
                      <span>Add to Cart</span>
                      <span className="font-data">₹{pricing.total.toFixed(2)}</span>
                    </div>
                  </button>

                  <Link
                    to="/product-selection"
                    className="w-full block text-center py-3 px-6 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-surface-100"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Icon name="ArrowLeft" size={16} />
                      <span>Back to Products</span>
                    </div>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="card p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Shield" size={16} className="text-success" />
                      <span className="text-sm text-text-secondary font-caption">
                        Weight guarantee
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={16} className="text-success" />
                      <span className="text-sm text-text-secondary font-caption">
                        2-hour delivery
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Leaf" size={16} className="text-success" />
                      <span className="text-sm text-text-secondary font-caption">
                        Farm fresh quality
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 lg:hidden z-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-text-secondary font-caption">Total Amount</div>
            <div className="text-xl font-heading font-bold text-primary">
              ₹{pricing.total.toFixed(2)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-secondary font-caption">
              {selectedProduct.actualWeight}kg • {customization.cuttingStyle || 'Select cutting style'}
            </div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!canProceed}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-smooth touch-target ${
            canProceed
              ? 'bg-primary text-white' :'bg-surface-200 text-text-tertiary cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="ShoppingCart" size={20} />
            <span>Add to Cart</span>
          </div>
        </button>
      </div>

      <CartStatusIndicator />
    </div>
  );
};

export default CustomizationCuttingOptions;