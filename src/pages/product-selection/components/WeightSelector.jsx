import React from 'react';
import Icon from 'components/AppIcon';

const WeightSelector = ({ 
  weightOptions, 
  selectedWeight, 
  onWeightSelect, 
  inventory, 
  category 
}) => {
  const getStockStatus = (weight) => {
    const stock = inventory[weight];
    if (!stock) return 'out-of-stock';
    return stock.status;
  };

  const getStockCount = (weight) => {
    const stock = inventory[weight];
    return stock ? stock.available : 0;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'limited': return 'text-warning';
      case 'out-of-stock': return 'text-error';
      default: return 'text-text-tertiary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'limited': return 'AlertCircle';
      case 'out-of-stock': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status, isSelected) => {
    if (isSelected) {
      return 'border-primary bg-primary-50';
    }
    
    switch (status) {
      case 'available': return 'border-success-100 bg-white hover:border-success hover:bg-success-50';
      case 'limited': return 'border-warning-100 bg-white hover:border-warning hover:bg-warning-50';
      case 'out-of-stock': return 'border-error-100 bg-surface-100 cursor-not-allowed opacity-60';
      default: return 'border-border bg-white hover:border-primary hover:bg-primary-50';
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Select Weight Range
        </h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="RotateCcw" size={16} />
          <span className="font-caption">Live Stock</span>
        </div>
      </div>

      <div className="space-y-3">
        {weightOptions.map((weight) => {
          const status = getStockStatus(weight);
          const count = getStockCount(weight);
          const isSelected = selectedWeight === weight;
          const isDisabled = status === 'out-of-stock';

          return (
            <button
              key={weight}
              onClick={() => !isDisabled && onWeightSelect(weight)}
              disabled={isDisabled}
              className={`w-full p-4 rounded-lg border-2 transition-smooth touch-target ${getStatusBg(status, isSelected)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected 
                      ? 'border-primary bg-primary' :'border-surface-200 bg-white'
                  }`}>
                    {isSelected && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-text-primary">
                      {weight}
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      Target weight range
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getStatusColor(status)}`}>
                      {count} available
                    </div>
                    <div className="text-xs text-text-tertiary font-caption capitalize">
                      {status.replace('-', ' ')}
                    </div>
                  </div>
                  <Icon 
                    name={getStatusIcon(status)} 
                    size={20} 
                    className={getStatusColor(status)}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Weight Selection Info */}
      <div className="mt-6 p-4 bg-surface-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div className="text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Weight Guarantee</p>
            <p className="font-caption">
              Actual weight may vary ±100g from selected range. You pay for exact weight delivered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightSelector;