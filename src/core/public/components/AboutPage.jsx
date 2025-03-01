import React from 'react';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  const team = [
    {
      name: 'Dr. Sarah Wilson',
      role: 'Head Veterinarian',
      description: '15+ years of experience in veterinary medicine'
    },
    {
      name: 'Mark Thompson',
      role: 'Lead Trainer',
      description: 'Certified professional dog trainer with 10 years experience'
    },
    {
      name: 'Emily Chen',
      role: 'Grooming Specialist',
      description: 'Award-winning pet groomer and animal care expert'
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-light tracking-tight text-neutral-900 mb-6">
            About Us
          </h2>
          <p className="text-neutral-600 text-lg font-light max-w-2xl mx-auto">
            Dedicated to providing exceptional care for your beloved pets since 2015
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-12 rounded-3xl">
          <h3 className="text-3xl font-light text-neutral-900 mb-6">Our Story</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-neutral-600 font-light mb-6">
                Founded in 2015, petcare began with a simple mission: to provide modern, comprehensive pet care services that meet the evolving needs of pets and their owners. What started as a small clinic has grown into a full-service pet care facility, thanks to our commitment to excellence and genuine love for animals.
              </p>
              <p className="text-neutral-600 font-light">
                Today, we're proud to offer a wide range of services, from routine check-ups to specialized treatments, all delivered with the same dedication to quality and compassion that has defined us from the beginning.
              </p>
            </div>
            <div className="bg-neutral-100 rounded-2xl h-64"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h3 className="text-3xl font-light text-neutral-900 mb-12 text-center">Our Team</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-neutral-100">
              <div className="w-24 h-24 bg-neutral-100 rounded-full mx-auto mb-6"></div>
              <h4 className="text-xl font-medium text-neutral-900 text-center mb-2">{member.name}</h4>
              <p className="text-neutral-600 text-center mb-4">{member.role}</p>
              <p className="text-neutral-600 font-light text-center">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-3xl mb-20">
        <h3 className="text-3xl font-light text-neutral-900 mb-12 text-center">Our Values</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h4 className="text-xl font-medium text-neutral-900 mb-4">Compassion</h4>
            <p className="text-neutral-600 font-light">Every pet receives the same level of care and attention we'd give to our own</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-medium text-neutral-900 mb-4">Excellence</h4>
            <p className="text-neutral-600 font-light">Continuous learning and improvement in pet care practices</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-medium text-neutral-900 mb-4">Innovation</h4>
            <p className="text-neutral-600 font-light">Embracing modern techniques and technologies in pet care</p>
          </div>
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

export default AboutPage;