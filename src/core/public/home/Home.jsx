import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar/>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-light tracking-tight text-neutral-900 mb-6">
            Modern pet care for<br />modern companions
          </h2>
          <p className="text-neutral-600 text-lg font-light max-w-2xl mx-auto">
            Experience thoughtful, comprehensive care tailored to your pet's unique needs
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="bg-neutral-900 text-white px-8 py-3 rounded-full text-sm hover:bg-neutral-800 transition-colors">
              Book Appointment
            </button>
            <button className="border border-neutral-200 bg-white text-neutral-900 px-8 py-3 rounded-full text-sm hover:border-neutral-300 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h3 className="text-3xl font-light text-neutral-900 mb-12 text-center">Services</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Grooming', description: 'Professional grooming with attention to detail' },
            { title: 'Health Care', description: 'Comprehensive veterinary services' },
            { title: 'Boarding', description: 'Comfortable stays in modern facilities' }
          ].map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors">
              <h4 className="text-xl font-medium text-neutral-900 mb-3">{service.title}</h4>
              <p className="text-neutral-600 font-light">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl">
        <h3 className="text-3xl font-light text-neutral-900 mb-12 text-center">What Our Clients Say</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { quote: "The most caring and professional pet service I've experienced", author: "Emma W." },
            { quote: "Outstanding attention to detail and genuine love for animals", author: "James L." }
          ].map((testimonial, index) => (
            <div key={index} className="p-8 rounded-2xl bg-neutral-50">
              <p className="text-neutral-600 font-light mb-4">"{testimonial.quote}"</p>
              <p className="text-neutral-900 font-medium">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-600 font-light">
            © 2025 petcare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;