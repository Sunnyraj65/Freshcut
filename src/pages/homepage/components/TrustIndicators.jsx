import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TrustIndicators = () => {
  const certifications = [
    {
      id: 'food-safety',
      icon: 'Shield',
      title: 'Food Safety Certified',
      description: 'HACCP and ISO 22000 compliant facilities'
    },
    {
      id: 'quality-assured',
      icon: 'Award',
      title: 'Quality Assured',
      description: 'Regular third-party quality audits'
    },
    {
      id: 'secure-payment',
      icon: 'Lock',
      title: 'Secure Payments',
      description: 'SSL encrypted and PCI compliant'
    },
    {
      id: 'customer-support',
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Always here to help you'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Downtown',
      rating: 5,
      comment: 'Amazing quality and the 2-hour delivery is a game changer! The chicken was exactly the weight I ordered.',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      name: 'Mike Chen',
      location: 'Midtown',
      rating: 5,
      comment: 'Love the custom cutting options. Perfect for my restaurant needs. Will definitely order again.',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Suburbs',
      rating: 5,
      comment: 'Fresh fish delivered right to my door. The quality is outstanding and the service is reliable.',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-text-primary text-center mb-8">
            Trusted by Thousands of Customers
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-lg p-6 text-center shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={cert.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary mb-2 text-sm">
                  {cert.title}
                </h3>
                <p className="text-xs text-text-secondary font-caption">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-text-primary text-center mb-8">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>
                
                {/* Comment */}
                <p className="text-text-secondary mb-4 font-caption italic">
                  "{testimonial.comment}"
                </p>
                
                {/* Customer Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-text-tertiary font-caption">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-soft">
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Ready to Experience Fresh Delivery?
            </h3>
            <p className="text-text-secondary mb-6 font-caption max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their fresh meat needs. Start your order today and taste the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product-selection?category=chicken"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <Icon name="Bird" size={20} />
                <span>Order Chicken Now</span>
              </Link>
              <Link
                to="/product-selection?category=fish"
                className="btn-accent inline-flex items-center justify-center space-x-2"
              >
                <Icon name="Fish" size={20} />
                <span>Order Fish Now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;