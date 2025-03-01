import React from 'react';
import Navbar from '../components/Navbar';

const ContactPage = () => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-light tracking-tight text-neutral-900 mb-6">
            Contact Us
          </h2>
          <p className="text-neutral-600 text-lg font-light max-w-2xl mx-auto">
            We're here to help with any questions you might have
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-2xl max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-2">Address</h3>
              <p className="text-neutral-600">
                123 Pet Care Street<br />
                New York, NY 10001
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-2">Phone</h3>
              <p className="text-neutral-600">(555) 123-4567</p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-2">Email</h3>
              <p className="text-neutral-600">info@petcare.com</p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-2">Business Hours</h3>
              <p className="text-neutral-600">
                Monday - Friday: 8:00 AM - 8:00 PM<br />
                Saturday - Sunday: 9:00 AM - 6:00 PM
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-2">Emergency Contact</h3>
              <p className="text-neutral-600">
                For after-hours emergencies:<br />
                (555) 999-8888
              </p>
            </div>
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

export default ContactPage;