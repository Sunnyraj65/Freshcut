import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import ProgressIndicator from 'components/ui/ProgressIndicator';
import CartStatusIndicator from 'components/ui/CartStatusIndicator';
import OrderTimeline from './components/OrderTimeline';
import OrderSummaryCard from './components/OrderSummaryCard';
import DeliveryTracking from './components/DeliveryTracking';
import QuickActions from './components/QuickActions';

const OrderTrackingStatus = () => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock order data
  const mockOrderData = {
    orderId: "FCM-2024-001247",
    status: "cutting_in_progress",
    orderDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    customer: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com"
    },
    items: [
      {
        id: 1,
        type: "chicken",
        name: "Farm Fresh Chicken",
        requestedWeight: "1.6kg",
        actualWeight: "1.62kg",
        cuttingStyle: "Curry Cut",
        price: 24.30,
        image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg"
      }
    ],
    deliveryAddress: {
      street: "1247 Oak Street, Apt 3B",
      city: "Downtown District",
      zipCode: "12345",
      instructions: "Ring doorbell twice. Leave at door if no answer."
    },
    totalAmount: 27.45,
    deliveryFee: 3.15,
    timeline: [
      {
        stage: "order_confirmed",
        title: "Order Confirmed",
        description: "Your order has been received and confirmed",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "completed",
        icon: "CheckCircle"
      },
      {
        stage: "animal_selected",
        title: "Animal Selected & Weighed",
        description: "Fresh chicken selected and weighed to 1.62kg",
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        status: "completed",
        icon: "Scale"
      },
      {
        stage: "cutting_in_progress",
        title: "Cutting in Progress",
        description: "Expert butcher preparing your curry cut",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: "current",
        icon: "Scissors",
        estimatedCompletion: new Date(Date.now() + 15 * 60 * 1000)
      },
      {
        stage: "quality_check",
        title: "Quality Check Complete",
        description: "Final inspection and packaging",
        timestamp: null,
        status: "pending",
        icon: "Shield",
        estimatedCompletion: new Date(Date.now() + 25 * 60 * 1000)
      },
      {
        stage: "out_for_delivery",
        title: "Out for Delivery",
        description: "On the way to your location",
        timestamp: null,
        status: "pending",
        icon: "Truck",
        estimatedCompletion: new Date(Date.now() + 35 * 60 * 1000)
      },
      {
        stage: "delivered",
        title: "Delivered",
        description: "Order successfully delivered",
        timestamp: null,
        status: "pending",
        icon: "Package"
      }
    ],
    deliveryPerson: {
      name: "Mike Rodriguez",
      phone: "+1 (555) 987-6543",
      vehicle: "Refrigerated Van #FR-204",
      photo: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  };

  // Simulate loading and real-time updates
  useEffect(() => {
    const loadOrder = () => {
      setTimeout(() => {
        setCurrentOrder(mockOrderData);
        setIsLoading(false);
      }, 1500);
    };

    loadOrder();

    // Simulate real-time updates every 30 seconds
    const updateInterval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate progress updates
      if (Math.random() > 0.7) {
        setCurrentOrder(prev => ({
          ...prev,
          timeline: prev.timeline.map(stage => {
            if (stage.stage === "cutting_in_progress" && stage.status === "current") {
              return {
                ...stage,
                description: "Curry cut almost complete - final touches"
              };
            }
            return stage;
          })
        }));
      }
    }, 30000);

    return () => clearInterval(updateInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <ProgressIndicator />
        
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Icon name="Package" size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                Loading Order Details...
              </h2>
              <p className="text-text-secondary font-caption">
                Fetching the latest updates on your order
              </p>
            </div>
          </div>
        </div>
        
        <CartStatusIndicator />
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <ProgressIndicator />
        
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="AlertTriangle" size={32} className="text-error" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                Order Not Found
              </h2>
              <p className="text-text-secondary font-caption mb-8">
                We couldn't find the order you're looking for. Please check your order number.
              </p>
              <Link
                to="/homepage"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Icon name="Home" size={20} />
                <span>Back to Homepage</span>
              </Link>
            </div>
          </div>
        </div>
        
        <CartStatusIndicator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <ProgressIndicator />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  Order Tracking
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-text-secondary font-caption">Order ID:</span>
                    <span className="font-data font-medium text-primary">
                      {currentOrder.orderId}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-tertiary">
                    <Icon name="Clock" size={16} />
                    <span className="font-caption">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary rounded-lg border border-primary-200">
                  <Icon name="Clock" size={16} />
                  <span className="font-medium text-sm">
                    ETA: {currentOrder.estimatedDelivery.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Banner */}
            <div className="bg-white rounded-lg border border-border p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="Scissors" size={24} className="text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      Cutting in Progress
                    </h3>
                    <p className="text-text-secondary font-caption">
                      Your fresh chicken is being expertly prepared with curry cut
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-right">
                    <div className="text-sm font-medium text-text-primary">
                      Estimated completion
                    </div>
                    <div className="text-lg font-data font-semibold text-primary">
                      15 minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timeline and Tracking - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <OrderTimeline timeline={currentOrder.timeline} />
              
              {currentOrder.status === "out_for_delivery" && (
                <DeliveryTracking 
                  deliveryPerson={currentOrder.deliveryPerson}
                  estimatedArrival={currentOrder.estimatedDelivery}
                />
              )}
            </div>

            {/* Order Summary and Actions - Right Column */}
            <div className="space-y-6">
              <OrderSummaryCard order={currentOrder} />
              <QuickActions 
                orderId={currentOrder.orderId}
                customerPhone={currentOrder.customer.phone}
              />
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden mt-8">
            <QuickActions 
              orderId={currentOrder.orderId}
              customerPhone={currentOrder.customer.phone}
              isMobile={true}
            />
          </div>
        </div>
      </div>
      
      <CartStatusIndicator />
    </div>
  );
};

export default OrderTrackingStatus;