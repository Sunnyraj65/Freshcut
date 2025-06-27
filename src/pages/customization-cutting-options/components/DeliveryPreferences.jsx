import React from 'react';
import Icon from 'components/AppIcon';

const DeliveryPreferences = ({ preferences, onChange }) => {
  const deliveryOptions = [
    {
      id: '2-hours',
      name: 'Standard Delivery',
      time: '2 Hours',
      description: 'Free delivery within 2 hours',
      fee: 0,
      icon: 'Truck'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      time: '1 Hour',
      description: 'Priority delivery within 1 hour',
      fee: 50,
      icon: 'Zap'
    }
  ];

  const timeSlots = [
    { id: 'morning', label: 'Morning (8 AM - 12 PM)', available: true },
    { id: 'afternoon', label: 'Afternoon (12 PM - 4 PM)', available: true },
    { id: 'evening', label: 'Evening (4 PM - 8 PM)', available: false }
  ];

  const handleDeliveryTimeChange = (timeId) => {
    onChange({
      ...preferences,
      deliveryTime: timeId
    });
  };

  const handleNotesChange = (notes) => {
    onChange({
      ...preferences,
      deliveryNotes: notes
    });
  };

  const handleTimeSlotChange = (slotId) => {
    onChange({
      ...preferences,
      timeSlot: slotId
    });
  };

  return (
    <div className="space-y-6">
      {/* Delivery Speed Options */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">
          Delivery Speed
        </h4>
        <div className="space-y-3">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              className={`border rounded-lg p-4 cursor-pointer transition-smooth ${
                preferences.deliveryTime === option.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
              }`}
              onClick={() => handleDeliveryTimeChange(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    preferences.deliveryTime === option.id
                      ? 'border-primary bg-primary' :'border-surface-200'
                  }`}>
                    {preferences.deliveryTime === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <Icon name={option.icon} size={20} className="text-primary" />
                  <div>
                    <div className="font-medium text-text-primary">
                      {option.name}
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      {option.description}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-primary">
                    {option.time}
                  </div>
                  <div className="text-sm font-data">
                    {option.fee > 0 ? `+₹${option.fee}` : 'Free'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">
          Preferred Time Slot
        </h4>
        <div className="space-y-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => slot.available && handleTimeSlotChange(slot.id)}
              disabled={!slot.available}
              className={`w-full text-left p-3 rounded-lg border transition-smooth ${
                !slot.available
                  ? 'border-surface-200 bg-surface-100 text-text-tertiary cursor-not-allowed'
                  : preferences.timeSlot === slot.id
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    !slot.available
                      ? 'border-surface-200'
                      : preferences.timeSlot === slot.id
                      ? 'border-primary bg-primary' :'border-surface-200'
                  }`}>
                    {preferences.timeSlot === slot.id && slot.available && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-caption">
                    {slot.label}
                  </span>
                </div>
                {!slot.available && (
                  <span className="text-xs text-error font-caption">
                    Not Available
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Notes */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">
          Delivery Instructions
        </h4>
        <textarea
          value={preferences.deliveryNotes || ''}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Add delivery instructions (e.g., gate code, building entrance, contact person)..."
          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
          rows={3}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-tertiary font-caption">
            Help our delivery team find you easily
          </span>
          <span className="text-xs text-text-tertiary font-data">
            {(preferences.deliveryNotes || '').length}/200
          </span>
        </div>
      </div>

      {/* Delivery Area Info */}
      <div className="p-3 bg-success-50 rounded-lg border border-success-200">
        <div className="flex items-start space-x-2">
          <Icon name="MapPin" size={16} className="text-success flex-shrink-0 mt-0.5" />
          <div className="text-sm text-success-700 font-caption">
            <strong>Delivery Area:</strong> We deliver to all areas within 15km radius. Your location is confirmed for {preferences.deliveryTime === 'express' ? '1-hour' : '2-hour'} delivery.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPreferences;