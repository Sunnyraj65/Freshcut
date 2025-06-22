import React from 'react';
import Icon from 'components/AppIcon';

const WeightConfirmation = ({ selectedWeight, actualWeight, productType }) => {
  const weightDifference = actualWeight - parseFloat(selectedWeight.replace('kg', ''));
  const isOverWeight = weightDifference > 0;
  const isUnderWeight = weightDifference < 0;

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Scale" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Weight Confirmation
        </h2>
      </div>

      <div className="space-y-4">
        {/* Weight Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-surface-100 rounded-lg">
            <div className="text-sm text-text-secondary font-caption mb-1">
              Selected Weight
            </div>
            <div className="text-2xl font-heading font-bold text-text-primary">
              {selectedWeight}
            </div>
          </div>
          <div className="text-center p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="text-sm text-primary font-caption mb-1">
              Actual Weight
            </div>
            <div className="text-2xl font-heading font-bold text-primary">
              {actualWeight}kg
            </div>
          </div>
        </div>

        {/* Weight Difference Indicator */}
        <div className={`p-4 rounded-lg border ${
          isOverWeight 
            ? 'bg-warning-50 border-warning-200' 
            : isUnderWeight 
            ? 'bg-error-50 border-error-200' :'bg-success-50 border-success-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={isOverWeight ? "TrendingUp" : isUnderWeight ? "TrendingDown" : "Check"} 
              size={16} 
              className={
                isOverWeight 
                  ? 'text-warning-600' 
                  : isUnderWeight 
                  ? 'text-error-600' :'text-success-600'
              } 
            />
            <span className={`text-sm font-medium ${
              isOverWeight 
                ? 'text-warning-700' 
                : isUnderWeight 
                ? 'text-error-700' :'text-success-700'
            }`}>
              {isOverWeight 
                ? `+${Math.abs(weightDifference).toFixed(2)}kg over selected weight`
                : isUnderWeight 
                ? `${Math.abs(weightDifference).toFixed(2)}kg under selected weight`
                : 'Perfect match!'
              }
            </span>
          </div>
          <p className={`text-xs font-caption ${
            isOverWeight 
              ? 'text-warning-600' 
              : isUnderWeight 
              ? 'text-error-600' :'text-success-600'
          }`}>
            {isOverWeight 
              ? 'You will be charged for the actual weight delivered.'
              : isUnderWeight 
              ? 'You will only pay for the actual weight delivered.'
              : 'Exact weight match - no price adjustment needed.'
            }
          </p>
        </div>

        {/* Live Weight Guarantee */}
        <div className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg">
          <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-primary mb-1">
              Live Weight Guarantee
            </h3>
            <p className="text-sm text-primary-700 font-caption">
              Our {productType} is weighed live in front of our quality team. The actual weight shown here is the exact weight you'll receive after processing. We guarantee transparency in every order.
            </p>
          </div>
        </div>

        {/* Weight Measurement Process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="flex flex-col items-center space-y-2 p-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="Eye" size={16} className="text-primary" />
            </div>
            <div className="text-xs font-caption text-text-secondary">
              Live Selection
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="Scale" size={16} className="text-primary" />
            </div>
            <div className="text-xs font-caption text-text-secondary">
              Precise Weighing
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} className="text-primary" />
            </div>
            <div className="text-xs font-caption text-text-secondary">
              Weight Confirmed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightConfirmation;