import React from 'react';
import Icon from 'components/AppIcon';

const HighlightsSection = () => {
  const highlights = [
    {
      id: 'weight-guarantee',
      icon: 'Scale',
      title: 'Real Weight Guarantee',
      description: 'Get exactly what you pay for with our precise weighing system and transparent pricing',
      color: 'primary'
    },
    {
      id: 'custom-cuts',
      icon: 'Scissors',
      title: 'Cut As You Like',
      description: 'Choose from whole, curry cut, or custom cutting styles to match your cooking needs',
      color: 'secondary'
    },
    {
      id: 'fast-delivery',
      icon: 'Clock',
      title: 'Delivered in 2 Hours',
      description: 'Lightning-fast delivery ensures maximum freshness from our facility to your kitchen',
      color: 'accent'
    },
    {
      id: 'farm-fresh',
      icon: 'Leaf',
      title: 'Farm Fresh Stock',
      description: 'Sourced directly from trusted farms with real-time inventory for guaranteed availability',
      color: 'success'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Why Choose FreshCut Delivery?
          </h2>
          <p className="text-lg text-text-secondary font-caption max-w-3xl mx-auto">
            We've revolutionized fresh meat delivery with technology, transparency, and uncompromising quality standards
          </p>
        </div>
        
        {/* Mobile: 2x2 Grid, Desktop: 4x1 Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="group text-center p-6 rounded-xl bg-surface hover:bg-white hover:shadow-medium transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                highlight.color === 'primary' ? 'bg-primary-100' :
                highlight.color === 'secondary' ? 'bg-secondary-100' :
                highlight.color === 'accent'? 'bg-accent-100' : 'bg-success-100'
              }`}>
                <Icon 
                  name={highlight.icon} 
                  size={28} 
                  className={
                    highlight.color === 'primary' ? 'text-primary' :
                    highlight.color === 'secondary' ? 'text-secondary' :
                    highlight.color === 'accent'? 'text-accent' : 'text-success'
                  }
                />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                {highlight.title}
              </h3>
              
              {/* Description */}
              <p className="text-text-secondary font-caption leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 bg-surface rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '10,000+', label: 'Happy Customers' },
              { number: '2 Hours', label: 'Average Delivery' },
              { number: '99.8%', label: 'Freshness Rating' },
              { number: '24/7', label: 'Customer Support' }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-2xl md:text-3xl font-heading font-bold text-primary font-data">
                  {stat.number}
                </div>
                <div className="text-sm text-text-secondary font-caption">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;