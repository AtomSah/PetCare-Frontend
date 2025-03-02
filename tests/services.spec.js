import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './footer';

const services = [
  {
    title: 'Pet Adoption',
    description: 'Find your perfect companion from our carefully selected pets. We ensure all our pets are healthy, vaccinated, and ready for a loving home.',
    icon: '❤️'
  },
  {
    title: 'Health Screening',
    description: 'All our pets undergo thorough health screenings including vaccinations, parasite control, and general wellness exams before adoption.',
    icon: '🩺'
  },
  {
    title: 'Adoption Counseling',
    description: 'Our experienced staff provides guidance on choosing the right pet for your lifestyle, home environment, and family situation.',
    icon: '💬'
  },
  {
    title: 'Post-Adoption Support',
    description: 'We provide ongoing support after adoption, including advice on pet care, behavior, nutrition, and routine health maintenance.',
    icon: '📞'
  },
  {
    title: 'Pet Care Education',
    description: 'Access our comprehensive resources on pet care basics, from feeding schedules to exercise requirements for different breeds and ages.',
    icon: '📖'
  },
  {
    title: 'Home Compatibility',
    description: 'We offer guidance on preparing your home for a new pet, including safety measures, essential supplies, and environmental enrichment.',
    icon: '🏡'
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#e5f2f7]">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">Our Services</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We provide comprehensive pet adoption services to help you find and care for your perfect companion.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
