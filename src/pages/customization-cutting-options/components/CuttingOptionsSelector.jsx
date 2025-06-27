import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CuttingOptionsSelector = ({ options, selectedStyle, onStyleChange }) => {
  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Scissors" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Choose Cutting Style
        </h2>
        <span className="text-sm text-accent font-caption">*Required</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-medium ${
              selectedStyle === option.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
            }`}
            onClick={() => onStyleChange(option.id)}
          >
            {/* Radio Button */}
            <div className="absolute top-4 right-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedStyle === option.id
                  ? 'border-primary bg-primary' :'border-surface-200'
              }`}>
                {selectedStyle === option.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Option Image */}
            <div className="w-full h-32 rounded-lg overflow-hidden bg-surface-100 mb-4">
              <Image
                src={option.image}
                alt={option.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Option Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-text-primary">
                  {option.name}
                </h3>
                {option.fee > 0 && (
                  <span className="text-sm font-data font-medium text-accent">
                    +₹{option.fee}
                  </span>
                )}
                {option.fee === 0 && (
                  <span className="text-sm font-medium text-success">
                    Free
                  </span>
                )}
              </div>

              <p className="text-sm text-text-secondary font-caption">
                {option.description}
              </p>

              {/* Features */}
              <div className="space-y-1">
                {option.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span className="text-xs text-text-secondary font-caption">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Overlay */}
            {selectedStyle === option.id && (
              <div className="absolute inset-0 bg-primary bg-opacity-5 rounded-lg pointer-events-none">
                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full">
                  <Icon name="Check" size={12} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Comparison View */}
      <div className="hidden lg:block mt-6 pt-6 border-t border-border">
        <h3 className="font-heading font-medium text-text-primary mb-4">
          Cutting Style Comparison
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-text-primary">Whole</h4>
            <ul className="space-y-1 text-sm text-text-secondary font-caption">
              <li>• Complete bird with all parts intact</li>
              <li>• Perfect for roasting and traditional recipes</li>
              <li>• Maximum freshness retention</li>
              <li>• No additional cutting charges</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-text-primary">Curry Cut</h4>
            <ul className="space-y-1 text-sm text-text-secondary font-caption">
              <li>• Medium-sized pieces ready to cook</li>
              <li>• Ideal for curries, stews, and frying</li>
              <li>• Bone-in cuts for enhanced flavor</li>
              <li>• Professional cutting service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuttingOptionsSelector;