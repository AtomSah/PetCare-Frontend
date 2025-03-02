import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './footer';

const AboutPage = () => {
  const team = [
    {
      name: 'Dr. Sarah Wilson',
      role: 'Head Veterinarian',
      description: 'With over 15 years of experience in veterinary medicine, Dr. Wilson oversees our pet health program, ensuring all animals receive comprehensive health screenings before adoption.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      name: 'Mark Thompson',
      role: 'Adoption Specialist',
      description: 'Mark has successfully matched over 500 pets with their forever homes. His deep understanding of animal behavior helps ensure each adoption is a perfect fit for both pet and owner.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      name: 'Emily Chen',
      role: 'Animal Care Manager',
      description: 'Emily oversees our shelter operations, implementing industry-leading standards of care and enrichment activities that keep our animals happy and healthy while awaiting adoption.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-[#e5f2f7]">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dedicated to finding loving homes for pets and supporting adoptive families since 2015
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Mission</h3>
            <p className="text-gray-600 text-lg mb-0">
              We believe every pet deserves a loving home. Our mission is to rescue, rehabilitate, and rehome abandoned and surrendered animals while educating the community about responsible pet ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8">Our Story</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                Founded in 2015, our pet adoption service began when our founder noticed the growing number of abandoned pets in the community. What started as a small rescue operation with just 5 volunteers has grown into a comprehensive adoption center with a team of dedicated staff and volunteers.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we've successfully placed over 5,000 pets in loving homes. Our commitment to animal welfare extends beyond adoption - we provide post-adoption support, educational resources, and community outreach programs.
              </p>
              <p className="text-gray-600">
                Today, we work with a network of foster homes, veterinarians, and animal behaviorists to provide the best possible care for our animals before they find their forever homes.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden h-80">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop" 
                alt="Happy pets" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Our+Story';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Team</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=100`;
                  }}
                />
              </div>
              <h4 className="text-xl font-medium text-gray-800 text-center mb-2">{member.name}</h4>
              <p className="text-[#2196f3] text-center font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 text-center">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#2196f3] mb-2">5,000+</p>
              <p className="text-gray-600">Pets Adopted</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2196f3] mb-2">98%</p>
              <p className="text-gray-600">Successful Placements</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2196f3] mb-2">10,000+</p>
              <p className="text-gray-600">Vaccinations Provided</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2196f3] mb-2">250+</p>
              <p className="text-gray-600">Community Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2196f3] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-800 mb-3">Compassion</h4>
              <p className="text-gray-600">We treat every animal with kindness and respect, providing personalized care based on their unique needs and personalities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2196f3] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-800 mb-3">Responsibility</h4>
              <p className="text-gray-600">We're committed to thorough screening and matching processes to ensure each pet is placed in a suitable and loving home environment.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2196f3] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#2196f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-800 mb-3">Community</h4>
              <p className="text-gray-600">We build lasting relationships with adopters, partners, and volunteers to create a network of support for pets and their families.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default AboutPage;