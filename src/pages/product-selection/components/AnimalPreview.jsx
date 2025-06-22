import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AnimalPreview = ({ 
  selectedWeight, // string for display only
  selectedCategory, 
  animals, 
  selectedAnimals, 
  onAnimalSelect, 
  isLoading, 
  stockStatus 
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showVideo, setShowVideo] = useState({});

  const toggleVideo = (animalId) => {
    setShowVideo(prev => ({
      ...prev,
      [animalId]: !prev[animalId]
    }));
  };

  if (animals.length === 0 && !isLoading) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Scale" size={32} className="text-text-tertiary" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
            No {selectedCategory} Found
          </h3>
          <p className="text-text-secondary font-caption max-w-md mx-auto">
            Adjust filters or check back later for new stock.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Loading Available {selectedCategory}...
          </h3>
          <p className="text-text-secondary font-caption">
            Fetching real-time stock...
          </p>
        </div>
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-error-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="AlertTriangle" size={32} className="text-error" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
            No Stock Available
          </h3>
          <p className="text-text-secondary font-caption max-w-md mx-auto mb-6">
            Sorry, we don't have any {selectedCategory} matching your criteria right now. 
            Please try a different weight or check back later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh Stock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Available {selectedCategory} {selectedWeight !== 'All' ? `(${selectedWeight})` : ''}
            </h2>
            <p className="text-text-secondary font-caption">
              {animals.length} {selectedCategory} available • Live preview
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-smooth ${
                viewMode === 'grid' ?'bg-primary text-white' :'bg-surface-100 text-text-secondary hover:bg-primary-50'
              }`}
            >
              <Icon name="Grid3X3" size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-smooth ${
                viewMode === 'list' ?'bg-primary text-white' :'bg-surface-100 text-text-secondary hover:bg-primary-50'
              }`}
            >
              <Icon name="List" size={14} />
            </button>
          </div>
        </div>

        {/* Stock Status Banner */}
        <div className={`p-3 rounded-lg flex items-center space-x-3 ${
          stockStatus === 'available' ? 'bg-success-50 border border-success-200' :
          stockStatus === 'limited'? 'bg-warning-50 border border-warning-200' : 'bg-error-50 border border-error-200'
        }`}>
          <Icon 
            name={stockStatus === 'available' ? 'CheckCircle' : stockStatus === 'limited' ? 'AlertCircle' : 'XCircle'} 
            size={20} 
            className={
              stockStatus === 'available' ? 'text-success' :
              stockStatus === 'limited' ? 'text-warning' : 'text-error'
            }
          />
          <div className="flex-1">
            <p className={`font-medium ${
              stockStatus === 'available' ? 'text-success-600' :
              stockStatus === 'limited' ? 'text-warning-600' : 'text-error-600'
            }`}>
              {stockStatus === 'available' ? 'Good Stock Available' :
               stockStatus === 'limited'? 'Limited Stock - Order Soon' : 'Out of Stock'}
            </p>
            <p className="text-sm text-text-secondary font-caption">
              {stockStatus === 'available' ? 'Multiple options to choose from' :
               stockStatus === 'limited'? 'Only few pieces remaining' : 'Check back later for availability'}
            </p>
          </div>
        </div>
      </div>

      {/* Animal Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
      }`}>
        {animals.map((animal) => {
          const isSelected = selectedAnimals.some(a => a.id === animal.id);
          const showVideoPreview = showVideo[animal.id];

          return (
            <div
              key={animal.id}
              className={`card overflow-hidden cursor-pointer transition-smooth hover:shadow-medium ${
                isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              onClick={() => onAnimalSelect(animal)}
            >
              {/* Image/Video Preview */}
              <div className="relative h-40 sm:h-48 bg-surface-100 overflow-hidden">
                {showVideoPreview ? (
                  <video
                    src={animal.video}
                    controls
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    onError={() => setShowVideo(prev => ({ ...prev, [animal.id]: false }))}
                  />
                ) : (
                  <Image
                    src={animal.image}
                    alt={`${animal.category} - ${animal.actualWeight}kg`}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideo(animal.id);
                    }}
                    className="bg-white bg-opacity-90 text-text-primary p-3 rounded-full hover:bg-opacity-100 transition-smooth"
                  >
                    <Icon name={showVideoPreview ? 'Image' : 'Play'} size={20} />
                  </button>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                )}

                {/* Quality Badge */}
                <div className="absolute top-3 left-3 bg-success text-white px-2 py-1 rounded text-xs font-medium">
                  {animal.quality}
                </div>
              </div>

              {/* Animal Details */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary">
                      {animal.actualWeight}kg {animal.category}
                    </h3>
                    <p className="text-sm text-text-secondary font-caption">
                      Target: {animal.targetWeight}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-data font-semibold text-primary">
                      ${(parseFloat(animal.actualWeight) * 12.99).toFixed(2)}
                    </div>
                    <div className="text-xs text-text-tertiary font-caption">
                      $12.99/kg
                    </div>
                  </div>
                </div>

                {/* Freshness Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Freshness:</span>
                    <span className="text-success font-medium">{animal.freshness}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Source:</span>
                    <span className="text-text-primary font-medium">{animal.farmSource}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAnimalSelect(animal);
                  }}
                  className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-smooth ${
                    isSelected
                      ? 'bg-primary text-white' :'bg-surface-100 text-text-secondary hover:bg-primary hover:text-white'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select This One'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Info */}
      {selectedAnimals.length > 0 && (
        <div className="card p-6 bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-primary mb-2">
                {selectedAnimals.length} Selected
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedAnimals.map((a) => (
                  <span key={a.id} className="px-3 py-1 bg-white border border-primary rounded-full text-sm font-medium text-primary">
                    {a.actualWeight}kg
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalPreview;