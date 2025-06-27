import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = ({ orderId, customerPhone, isMobile = false }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showInstructionsForm, setShowInstructionsForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    alert('Message sent to customer service!');
    setContactMessage('');
    setShowContactForm(false);
  };

  const handleInstructionsSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    alert('Delivery instructions updated!');
    setDeliveryInstructions('');
    setShowInstructionsForm(false);
  };

  const quickActions = [
    {
      id: 'contact_support',
      label: 'Contact Support',
      icon: 'Headphones',
      description: 'Get help with your order',
      action: () => setShowContactForm(true),
      color: 'primary'
    },
    {
      id: 'modify_delivery',
      label: 'Delivery Instructions',
      icon: 'Edit',
      description: 'Update delivery details',
      action: () => setShowInstructionsForm(true),
      color: 'secondary'
    },
    {
      id: 'call_customer',
      label: 'Call Customer Service',
      icon: 'Phone',
      description: 'Speak with our team',
      action: () => window.open(`tel:+1-800-FRESH-CUT`),
      color: 'accent'
    },
    {
      id: 'report_issue',
      label: 'Report Issue',
      icon: 'AlertTriangle',
      description: 'Report a problem',
      action: () => setShowContactForm(true),
      color: 'error'
    }
  ];

  const getButtonClasses = (color) => {
    const baseClasses = "flex items-center space-x-3 w-full p-4 rounded-lg font-medium transition-smooth hover:scale-105 touch-target";
    
    switch (color) {
      case 'primary':
        return `${baseClasses} bg-primary text-white`;
      case 'secondary':
        return `${baseClasses} bg-secondary text-white`;
      case 'accent':
        return `${baseClasses} bg-accent text-white`;
      case 'error':
        return `${baseClasses} bg-error text-white`;
      default:
        return `${baseClasses} bg-surface-100 text-text-primary border border-border`;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Zap" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Quick Actions
        </h2>
      </div>

      {/* Action Buttons */}
      <div className={`grid gap-3 mb-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={getButtonClasses(action.color)}
          >
            <Icon name={action.icon} size={20} />
            <div className="text-left flex-1">
              <div className="font-medium">{action.label}</div>
              {!isMobile && (
                <div className="text-sm opacity-90 font-caption">
                  {action.description}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Order Actions */}
      <div className="border-t border-border pt-6">
        <h3 className="font-heading font-semibold text-text-primary mb-4">
          Order Actions
        </h3>
        
        <div className="space-y-3">
          <Link
            to="/homepage"
            className="flex items-center justify-between w-full p-3 border border-border rounded-lg text-text-secondary hover:bg-surface-50 transition-smooth"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Plus" size={18} />
              <span className="font-medium">Order Again</span>
            </div>
            <Icon name="ChevronRight" size={16} />
          </Link>
          
          <Link
            to="/user-account-profile"
            className="flex items-center justify-between w-full p-3 border border-border rounded-lg text-text-secondary hover:bg-surface-50 transition-smooth"
          >
            <div className="flex items-center space-x-3">
              <Icon name="History" size={18} />
              <span className="font-medium">Order History</span>
            </div>
            <Icon name="ChevronRight" size={16} />
          </Link>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-1200">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Contact Support
              </h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-text-tertiary hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Order ID: {orderId}
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Describe your issue or question..."
                  className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium hover:bg-surface-50 transition-smooth"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:scale-105 transition-smooth"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Instructions Form Modal */}
      {showInstructionsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-1200">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Update Delivery Instructions
              </h3>
              <button
                onClick={() => setShowInstructionsForm(false)}
                className="text-text-tertiary hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={handleInstructionsSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="Ring doorbell twice, leave at door, etc..."
                  className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInstructionsForm(false)}
                  className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium hover:bg-surface-50 transition-smooth"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:scale-105 transition-smooth"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;