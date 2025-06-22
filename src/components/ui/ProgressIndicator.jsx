import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicator = () => {
  const location = useLocation();

  const steps = [
    {
      id: 'shop',
      label: 'Browse',
      path: '/homepage',
      icon: 'Store',
      description: 'Select products'
    },
    {
      id: 'select',
      label: 'Products',
      path: '/product-selection',
      icon: 'Package',
      description: 'Choose items'
    },
    {
      id: 'customize',
      label: 'Customize',
      path: '/customization-cutting-options',
      icon: 'Settings',
      description: 'Cutting options'
    },
    {
      id: 'checkout',
      label: 'Checkout',
      path: '/shopping-cart-checkout',
      icon: 'CreditCard',
      description: 'Complete order'
    }
  ];

  const getCurrentStepIndex = () => {
    const currentPath = location.pathname;
    const stepIndex = steps.findIndex(step => step.path === currentPath);
    return stepIndex >= 0 ? stepIndex : -1;
  };

  const currentStepIndex = getCurrentStepIndex();

  // Only show progress indicator on relevant pages
  const shouldShowProgress = steps.some(step => step.path === location.pathname);

  if (!shouldShowProgress) {
    return null;
  }

  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm font-data text-text-tertiary">
              {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-surface-200 rounded-full h-2 mb-3">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={steps[currentStepIndex]?.icon || 'Circle'} 
              size={20} 
              className="text-primary" 
            />
            <div>
              <div className="font-medium text-text-primary">
                {steps[currentStepIndex]?.label}
              </div>
              <div className="text-sm text-text-secondary font-caption">
                {steps[currentStepIndex]?.description}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Progress */}
        <div className="hidden md:block">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => {
                const status = getStepStatus(index);
                const isClickable = index <= currentStepIndex;

                return (
                  <li key={step.id} className="flex items-center">
                    {isClickable ? (
                      <Link
                        to={step.path}
                        className="group flex flex-col items-center space-y-2 transition-smooth hover:scale-105"
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                          status === 'completed'
                            ? 'bg-primary border-primary text-white'
                            : status === 'current' ?'bg-primary-50 border-primary text-primary' :'bg-white border-surface-200 text-text-tertiary group-hover:border-primary group-hover:text-primary'
                        }`}>
                          {status === 'completed' ? (
                            <Icon name="Check" size={16} />
                          ) : (
                            <Icon name={step.icon} size={16} />
                          )}
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-medium ${
                            status === 'current' ? 'text-primary' : 'text-text-secondary group-hover:text-primary'
                          }`}>
                            {step.label}
                          </div>
                          <div className="text-xs text-text-tertiary font-caption">
                            {step.description}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white border-surface-200 text-text-tertiary">
                          <Icon name={step.icon} size={16} />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-text-tertiary">
                            {step.label}
                          </div>
                          <div className="text-xs text-text-tertiary font-caption">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    )}

                    {index < steps.length - 1 && (
                      <div className="flex-1 mx-4">
                        <div className={`h-0.5 transition-all duration-500 ${
                          index < currentStepIndex ? 'bg-primary' : 'bg-surface-200'
                        }`} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;