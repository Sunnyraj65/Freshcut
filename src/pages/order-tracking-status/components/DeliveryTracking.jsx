import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const DeliveryTracking = ({ deliveryPerson, estimatedArrival }) => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7128,
    lng: -74.0060,
    address: "5th Avenue & 42nd Street"
  });
  
  const [timeToArrival, setTimeToArrival] = useState(null);

  useEffect(() => {
    const updateArrivalTime = () => {
      const now = new Date();
      const diffMinutes = Math.ceil((estimatedArrival - now) / (1000 * 60));
      setTimeToArrival(diffMinutes);
    };

    updateArrivalTime();
    const interval = setInterval(updateArrivalTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [estimatedArrival]);

  const formatArrivalTime = (minutes) => {
    if (minutes <= 0) return 'Arriving now';
    if (minutes < 60) return `${minutes} min away`;
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m away`;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Truck" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Live Delivery Tracking
        </h2>
      </div>

      {/* Delivery Person Info */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={deliveryPerson.photo}
              alt={deliveryPerson.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-text-primary">
              {deliveryPerson.name}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {deliveryPerson.vehicle}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-text-secondary font-caption">ETA</div>
            <div className="font-data font-semibold text-primary">
              {timeToArrival !== null ? formatArrivalTime(timeToArrival) : 'Calculating...'}
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-surface-100 rounded-lg overflow-hidden mb-6" style={{ height: '200px' }}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Delivery Location"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=14&output=embed`}
          className="border-0"
        />
      </div>

      {/* Current Location */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
          <Icon name="MapPin" size={16} className="text-success-600" />
        </div>
        <div>
          <div className="font-medium text-text-primary">Current Location</div>
          <div className="text-sm text-text-secondary font-caption">
            {currentLocation.address}
          </div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg font-medium transition-smooth hover:scale-105">
          <Icon name="Phone" size={18} />
          <span>Call Driver</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-surface-50">
          <Icon name="MessageCircle" size={18} />
          <span>Message</span>
        </button>
      </div>

      {/* Live Updates */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-text-secondary font-caption">
              Location updating every 30 seconds
            </span>
          </div>
          <span className="text-xs text-text-tertiary font-caption">
            Last update: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;