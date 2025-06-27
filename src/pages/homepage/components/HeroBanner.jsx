import React from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';


const HeroBanner = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-heading font-bold text-text-primary sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Buy Live</span>{' '}
                  <span className="block text-primary xl:inline">Chicken & Fish</span>{' '}
                  <span className="block xl:inline">Online</span>
                </h1>
                <p className="mt-3 text-base text-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-caption">
                  Cut & Delivered Fresh to your doorstep within 2 hours. Choose exact weights, customize cuts, and enjoy farm-fresh quality guaranteed.
                </p>
                
                {/* Key Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  {[
                    { icon: 'Scale', text: 'Real Weight' },
                    { icon: 'Scissors', text: 'Custom Cuts' },
                    { icon: 'Clock', text: '2 Hour Delivery' },
                    { icon: 'Leaf', text: 'Farm Fresh' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name={feature.icon} size={16} className="text-primary" />
                      </div>
                      <span className="font-medium font-caption">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Professional butcher weighing fresh live chicken"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:from-transparent lg:via-transparent lg:to-white opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;