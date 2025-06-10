'use client';

import { FaMousePointer, FaImage, FaCreditCard, FaRocket } from 'react-icons/fa'; // lightweight icons
import '../styles/custom.css'; // In case we add custom animations later

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <FaMousePointer size={40} className="text-primary" />,
      title: 'Choose Your Pixels',
      description: 'Pick the perfect spot on the grid to showcase your brand or idea.'
    },
    {
      icon: <FaImage size={40} className="text-primary" />,
      title: 'Upload Image & Link',
      description: 'Add your small logo/image and the link you want visitors to click.'
    },
    {
      icon: <FaCreditCard size={40} className="text-primary" />,
      title: 'Complete Payment',
      description: 'Securely complete your payment and lock your spot on the homepage.'
    },
    {
      icon: <FaRocket size={40} className="text-primary" />,
      title: 'Go Live!',
      description: 'Your pixels appear instantly for the world to see.'
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-2 duration-300">
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
