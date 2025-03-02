import React from 'react';
import Navbar from '../components/Navbar';

const ServicesPage = () => {
  const services = [
    {
      title: 'Pet Adoption',
      description: 'Find your perfect companion from our carefully selected pets. We ensure all our pets are healthy, vaccinated, and ready for a loving home.',
      icon: (
        <svg className="w-10 h-10 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Health Screening',
      description: 'All our pets undergo thorough health screenings including vaccinations, parasite control, and general wellness exams before adoption.',
      icon: (
        <svg className="w-10 h-10 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Adoption Counseling',
      description: 'Our experienced staff provides guidance on choosing the right pet for your lifestyle, home environment, and family situation.',
      icon: (
        <svg className="w-10 h-10 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      title: 'Post-Adoption Support',
      description: 'We provide ongoing support after adoption, including advice on pet care, behavior, nutrition, and routine health maintenance.',
      icon: (
        <svg className="w-10 h-10 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Pet Care Education',
      description: 'Access our comprehensive resources on pet care basics, from feeding schedules to exercise requirements for different breeds and ages.',
      icon: (
        <svg className="w-10 h-10 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Home Compatibility',
      description: 'We offer guidance on preparing your home for a new pet, including safety measures, essential supplies, and environmental enrichment.',
      icon: (
        <svg className="w-10 h-10 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#e5f2f7]">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We provide comprehensive pet adoption services to help you find and care for your perfect companion
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Adoption Process</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2196f3] rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-4">1</div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Browse Available Pets</h4>
              <p className="text-gray-600">Explore our selection of cats and dogs looking for their forever homes</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2196f3] rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-4">2</div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Submit Application</h4>
              <p className="text-gray-600">Complete a booking form with your information and preferences</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2196f3] rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-4">3</div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Meet Your Pet</h4>
              <p className="text-gray-600">Schedule a meeting with your potential new family member</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2196f3] rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-4">4</div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Take Home</h4>
              <p className="text-gray-600">Complete the adoption process and welcome your pet to its new home</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">What are the requirements for adopting a pet?</h4>
              <p className="text-gray-600">Requirements typically include being at least 18 years old, verification of a pet-friendly residence, valid identification, and completing our adoption application.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Are all pets vaccinated before adoption?</h4>
              <p className="text-gray-600">Yes, all our pets are up-to-date on age-appropriate vaccinations, spayed/neutered, and microchipped prior to adoption.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">What if the pet doesn't adjust well to my home?</h4>
              <p className="text-gray-600">We offer a 14-day adjustment period with support from our behavior specialists. If issues persist, we can discuss options including returns or additional resources.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Do you offer post-adoption support?</h4>
              <p className="text-gray-600">Absolutely! We provide ongoing support including pet care guidance, behavior advice, and assistance with integrating your new pet into your home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">
            © 2025 PetCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;