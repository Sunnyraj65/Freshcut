import React, { useState, useEffect } from 'react';
import Image from 'components/AppImage';

// Simple hero slider that cycles between chicken & fish banners every 5 seconds.
// NOTE: Ensure the two banner images are available under public/images as:
//  - /images/chicken_banner.png
//  - /images/fish_banner.png
// Or adjust the paths below as needed.

const slides = [
  {
    src: '/assets/images/newsfinal.png',
    alt: 'Freshness at peak – No cold storage, just live freshness',
  },
  {
    src: '/assets/images/fish_banner.png',
    alt: 'No Frozen, Just Fresh Fish – No chemicals. No cold storage. Just fresh fish',
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white overflow-hidden select-none">
      <div className="w-full h-40 sm:h-56 md:h-72 lg:h-80 xl:h-96 overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === current ? 'bg-primary' : 'bg-surface-300'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
