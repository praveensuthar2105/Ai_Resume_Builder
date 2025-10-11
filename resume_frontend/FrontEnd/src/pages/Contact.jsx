import React from 'react';

const Contact = () => {
  // Temporary proxy values
  const contactEmail = "contact@example.com";
  const officeAddress = "123 Tech Street, Silicon Valley, CA 94101";
  const phoneNumber = "+1 (555) 123-4567";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          We'd love to hear from you! Please fill out the form below or reach out to us directly.
        </p>

        <div className="mt-12 bg-white shadow-lg rounded-lg p-8">
          <form action="#" method="POST">
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="full-name" className="sr-only">Full name</label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="name"
                  className="block w-full py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md bg-gray-100"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md bg-gray-100"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md bg-gray-100"
                  placeholder="Message"
                  defaultValue={""}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Our Contact Information</h2>
            <p className="mt-2 text-gray-600">Email: <a href={`mailto:${contactEmail}`} className="text-indigo-600">{contactEmail}</a></p>
            <p className="text-gray-600">Phone: {phoneNumber}</p>
            <p className="text-gray-600">Address: {officeAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;