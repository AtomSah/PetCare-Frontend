import React from 'react';
import Navbar from '../components/Navbar';

const ServicesPage = () => {
  const services = [
    {
      title: 'Pet Grooming',
      description: 'Professional grooming services including bathing, trimming, and styling for all breeds',
      price: 'From $50',
      duration: '1-2 hours'
    },
    {
      title: 'Veterinary Care',
      description: 'Comprehensive health check-ups, vaccinations, and preventive care for your pets',
      price: 'From $75',
      duration: '30-60 mins'
    },
    {
      title: 'Pet Boarding',
      description: 'Comfortable and safe accommodation for your pets while you are away',
      price: 'From $40/night',
      duration: '24/7 care'
    },
    {
      title: 'Pet Training',
      description: 'Professional behavior training and socialization classes for dogs',
      price: 'From $65/session',
      duration: '1 hour'
    },
    {
      title: 'Pet Dental Care',
      description: 'Complete dental cleaning and oral health maintenance for pets',
      price: 'From $80',
      duration: '1 hour'
    },
    {
      title: 'Emergency Care',
      description: '24/7 emergency veterinary services for urgent pet health issues',
      price: 'Varies',
      duration: 'As needed'
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-light tracking-tight text-neutral-900 mb-6">
            Our Services
          </h2>
          <p className="text-neutral-600 text-lg font-light max-w-2xl mx-auto">
            Comprehensive pet care services tailored to meet all your pet's needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors">
              <h3 className="text-xl font-medium text-neutral-900 mb-3">{service.title}</h3>
              <p className="text-neutral-600 font-light mb-6">{service.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                <span className="text-neutral-900">{service.price}</span>
                <span className="text-neutral-600 text-sm">{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl mb-20">
        <div className="text-center">
          <h3 className="text-3xl font-light text-neutral-900 mb-6">Ready to book a service?</h3>
          <p className="text-neutral-600 font-light mb-8">
            Schedule an appointment today and give your pet the care they deserve
          </p>
          <button className="bg-neutral-900 text-white px-8 py-3 rounded-full text-sm hover:bg-neutral-800 transition-colors">
            Book Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-600 font-light">
            © 2025 petcare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;