import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const StockIndicator = ({ category, totalStock }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setLastUpdate(new Date());
      
      setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getStockStatus = () => {
    if (totalStock === 0) return { status: 'out-of-stock', color: 'error', icon: 'XCircle' };
    if (totalStock <= 10) return { status: 'limited', color: 'warning', icon: 'AlertCircle' };
    return { status: 'available', color: 'success', icon: 'CheckCircle' };
  };

  const stockInfo = getStockStatus();

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Live Stock Indicator */}
      <div className="flex items-center space-x-2">
        <div className="relative">
          <div className={`w-3 h-3 rounded-full bg-${stockInfo.color} ${isUpdating ? 'animate-pulse' : ''}`}>
            {!isUpdating && (
              <div className={`absolute inset-0 w-3 h-3 rounded-full bg-${stockInfo.color} animate-ping opacity-75`}></div>
            )}
          </div>
        </div>
        <div className="text-sm">
          <div className="font-medium text-text-primary">
            Live Stock
          </div>
          <div className="text-xs text-text-tertiary font-caption">
            Updated {formatTime(lastUpdate)}
          </div>
        </div>
      </div>

      {/* Stock Count */}
      <div className="text-right">
        <div className={`text-lg font-data font-semibold text-${stockInfo.color}`}>
          {totalStock}
        </div>
        <div className="text-xs text-text-tertiary font-caption capitalize">
          {category} available
        </div>
      </div>

      {/* Status Icon */}
      <Icon 
        name={stockInfo.icon} 
        size={24} 
        className={`text-${stockInfo.color} ${isUpdating ? 'animate-spin' : ''}`}
      />
    </div>
  );
};

export default StockIndicator;