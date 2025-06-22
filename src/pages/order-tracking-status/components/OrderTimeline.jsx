import React from 'react';
import Icon from 'components/AppIcon';

const OrderTimeline = ({ timeline }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success-50 border-success-100';
      case 'current':
        return 'text-primary bg-primary-50 border-primary-200 animate-pulse';
      case 'pending':
        return 'text-text-tertiary bg-surface-100 border-surface-200';
      default:
        return 'text-text-tertiary bg-surface-100 border-surface-200';
    }
  };

  const getConnectorColor = (currentStatus, nextStatus) => {
    if (currentStatus === 'completed') {
      return 'bg-success';
    }
    if (currentStatus === 'current' && nextStatus === 'pending') {
      return 'bg-gradient-to-b from-primary to-surface-200';
    }
    return 'bg-surface-200';
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return null;
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatEstimatedTime = (estimatedTime) => {
    if (!estimatedTime) return null;
    const now = new Date();
    const diffMinutes = Math.ceil((estimatedTime - now) / (1000 * 60));
    
    if (diffMinutes <= 0) return 'Any moment now';
    if (diffMinutes < 60) return `${diffMinutes} min`;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Clock" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Order Progress
        </h2>
      </div>

      <div className="relative">
        {timeline.map((stage, index) => (
          <div key={stage.stage} className="relative">
            {/* Timeline Item */}
            <div className="flex items-start space-x-4 pb-8">
              {/* Icon Circle */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${getStatusColor(stage.status)}`}>
                <Icon 
                  name={stage.status === 'completed' ? 'Check' : stage.icon} 
                  size={20} 
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-heading font-semibold ${
                    stage.status === 'current' ? 'text-primary' : 
                    stage.status === 'completed'? 'text-success-600' : 'text-text-secondary'
                  }`}>
                    {stage.title}
                  </h3>
                  
                  {stage.timestamp && (
                    <span className="text-sm font-data text-text-tertiary">
                      {formatTime(stage.timestamp)}
                    </span>
                  )}
                </div>

                <p className="text-text-secondary font-caption mb-3">
                  {stage.description}
                </p>

                {/* Status Indicators */}
                <div className="flex items-center space-x-4">
                  {stage.status === 'completed' && (
                    <div className="flex items-center space-x-1 text-success-600">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                  
                  {stage.status === 'current' && stage.estimatedCompletion && (
                    <div className="flex items-center space-x-1 text-primary">
                      <Icon name="Clock" size={16} />
                      <span className="text-sm font-medium">
                        ETA: {formatEstimatedTime(stage.estimatedCompletion)}
                      </span>
                    </div>
                  )}
                  
                  {stage.status === 'pending' && stage.estimatedCompletion && (
                    <div className="flex items-center space-x-1 text-text-tertiary">
                      <Icon name="Clock" size={16} />
                      <span className="text-sm">
                        Expected: {formatEstimatedTime(stage.estimatedCompletion)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < timeline.length - 1 && (
              <div 
                className={`absolute left-6 top-12 w-0.5 h-8 -translate-x-0.5 transition-all duration-500 ${
                  getConnectorColor(stage.status, timeline[index + 1]?.status)
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Live Updates Indicator */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-text-secondary font-caption">
              Live updates enabled
            </span>
          </div>
          <button className="text-sm text-primary hover:text-primary-600 font-medium transition-smooth">
            Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;