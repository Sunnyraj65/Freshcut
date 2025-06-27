import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const CallToActionButtons = () => {
  const ctaButtons = [
    {
      id: 'chicken',
      label: 'Order Chicken',
      icon: 'Bird',
      description: 'Fresh live chicken, cut to your preference',
      color: 'primary',
      path: '/product-selection?category=chicken'
    },
    {
      id: 'fish',
      label: 'Order Fish',
      icon: 'Fish',
      description: 'Premium fresh fish, cleaned and prepared',
      color: 'accent',
      path: '/product-selection?category=fish'
    }
  ];

  return (
    <section className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            What Would You Like Today?
          </h2>
          <p className="text-lg text-text-secondary font-caption max-w-2xl mx-auto">
            Choose from our premium selection of live poultry and fresh seafood, delivered within 2 hours
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ctaButtons.map((button) => (
            <Link
              key={button.id}
              to={button.path}
              className={`group relative overflow-hidden rounded-xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-large touch-target ${
                button.color === 'primary' ?'bg-primary text-white hover:bg-primary-700' :'bg-accent text-white hover:bg-accent-600'
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={button.icon} size={32} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-heading font-bold mb-2">
                  {button.label}
                </h3>
                
                <p className="text-white/90 mb-6 font-caption">
                  {button.description}
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-sm font-medium">
                  <span>Start Shopping</span>
                  <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-tertiary font-caption">
            🚚 Free delivery on orders above $50 | 📞 Call us at{' '}
            <span className="font-data text-primary">+1 (555) 123-4567</span> for bulk orders
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToActionButtons;