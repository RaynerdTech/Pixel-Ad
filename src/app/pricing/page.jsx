'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaImage, FaClock, FaCreditCard, FaUniversity, FaMobileAlt, FaApple, FaWallet, FaQuestionCircle, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

// --- Global Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother feel
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const iconPop = {
  hidden: { scale: 0.7, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
    },
  },
};

// --- Custom Components ---

// Pricing Hero Section Component
const PricingHero = ({ scrollToPixelGrid }) => (
  <motion.section
    className="relative py-20 md:py-32 bg-gradient-to-br from-blue-700 to-purple-800 text-white text-center overflow-hidden z-0"
    variants={fadeIn}
    initial="hidden"
    animate="show"
  >
    {/* Abstract Background Shapes/Gradients */}
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="w-96 h-96 rounded-full bg-white blur-3xl absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      <div className="w-80 h-80 rounded-full bg-purple-500 blur-3xl absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-4xl mx-auto px-4">
      <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
        Unlock Your Permanent <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300">
          Online Legacy
        </span>
      </motion.h2>
      <motion.p variants={fadeIn} className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
        Secure your unique spot on our timeless digital canvas. One-time payment, endless exposure.
      </motion.p>
      <motion.button
        variants={fadeIn}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-blue-700 font-bold py-3 px-10 rounded-full text-lg shadow transition-all duration-300 transform mb-16"
        onClick={scrollToPixelGrid}
      >
        Get Your Pixel for Just $5
      </motion.button>
    </div>
  </motion.section>
);

// What You Get Section Component
const WhatYouGet = () => (
  <motion.section
    className="relative py-20 bg-white z-10 -mt-16 sm:-mt-24 md:-mt-32 rounded-t-[4rem] sm:rounded-t-[6rem] shadow overflow-hidden"
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Subtle light grid background pattern */}
    <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'repeating-conic-gradient(#f0f0f0 0% 25%, transparent 0% 50%)', backgroundSize: '20px 20px' }}></div>

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h3 variants={fadeIn} className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
        Beyond a Pixel: The Benefits
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {[
          { icon: <FaClock />, title: 'Permanent Legacy', desc: 'Your brand lives on our grid, a timeless part of digital history, forever.' },
          { icon: <FaCheckCircle />, title: 'Direct Engagement', desc: 'Each pixel is a direct portal, driving traffic to your chosen destination.' },
          { icon: <FaRocket />, title: 'Visibility Amplified', desc: 'Gain unparalleled exposure to a diverse, global audience, 24/7.' },
          { icon: <FaImage />, title: 'Creative Freedom', desc: 'Showcase your identity with custom images, logos, or unique designs.' },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group flex flex-col items-center text-center p-8 bg-blue-50 rounded-3xl shadow border border-blue-100 transform hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <motion.div variants={iconPop} className="text-blue-600 text-6xl mb-6 group-hover:text-white transition-colors duration-300">
              {item.icon}
            </motion.div>
            <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">{item.title}</h4>
            <p className="text-gray-700 text-base leading-relaxed group-hover:text-white transition-colors duration-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

// How Payment Works Section Component
const HowPaymentWorks = () => (
  <motion.section
    className="py-20 md:py-28 bg-gray-50 relative overflow-hidden"
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Decorative Wavy Divider */}
    <svg className="absolute top-0 left-0 w-full h-auto text-blue-100 z-0" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ transform: 'translateY(-100%)' }}>
      <path fill="currentColor" fillOpacity="0.1" d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,53.3C1200,53,1320,43,1380,37.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
    </svg>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.h3 variants={fadeIn} className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
        Simple Steps to Own Your Pixel
      </motion.h3>

      <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Connector Lines for Desktop */}
        <div className="hidden md:flex absolute top-1/4 left-0 right-0 justify-around z-0">
          <div className="w-1/3 border-b-2 border-dashed border-blue-200 transform -translate-x-1/2"></div>
          <div className="w-1/3 border-b-2 border-dashed border-blue-200 transform translate-x-1/2"></div>
        </div>
        {/* Connector Lines for Mobile (Vertical) */}
        <div className="md:hidden absolute top-0 left-1/2 h-full border-r-2 border-dashed border-blue-200 transform -translate-x-1/2 z-0"></div>


        {[
          { num: 1, title: 'Select Your Space', desc: 'Navigate our grid and choose the exact pixels you wish to claim.' },
          { num: 2, title: 'Design Your Legacy', desc: 'Upload your image/logo and link your brand’s online destination.' },
          { num: 3, title: 'Secure & Launch', desc: 'Finalize your one-time payment swiftly and securely via Paystack.' },
        ].map((step, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="relative flex flex-col items-center text-center bg-white p-8 rounded-full shadow w-full md:w-[30%] border-4 border-blue-100 z-10"
            style={{ borderRadius: '50% / 10% '}}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-6 shadow border-4 border-blue-300">
              {step.num}
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h4>
            <p className="text-gray-700 leading-relaxed text-balance">{step.desc}</p>
          </motion.div>
        ))}
      </div>
       <motion.p variants={fadeIn} className="text-center text-gray-600 mt-20 text-lg max-w-3xl mx-auto">
        Your permanent pixel ad will be instantly deployed, becoming a visible landmark on our digital canvas.
      </motion.p>
    </div>
  </motion.section>
);


// Payment Methods Section Component
const PaymentMethods = () => (
  <motion.section
    className="py-20 md:py-28 bg-gradient-to-tr from-blue-50 to-purple-50 relative"
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Lightened background overlay */}
    <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #fff, transparent 50%), radial-gradient(circle at top left, #c7d2fe, transparent 60%), radial-gradient(circle at bottom right, #e0cffc, transparent 60%)' }}></div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.h3 variants={fadeIn} className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
        Flexible Payment Solutions via Paystack
      </motion.h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 justify-items-center">
        {[
          { icon: <FaCreditCard />, title: 'Card Payments', desc: 'Visa, Mastercard, Verve', color: 'blue-500' },
          { icon: <FaUniversity />, title: 'Bank Transfers', desc: 'Direct bank account transfers', color: 'green-500' },
          { icon: <FaMobileAlt />, title: 'USSD', desc: 'Quick payments via mobile codes', color: 'purple-500' },
          { icon: <FaApple />, title: 'Apple Pay', desc: 'Seamless for iOS users', color: 'gray-700' },
          { icon: <FaWallet />, title: 'Paystack Balance', desc: 'From your Paystack Wallet', color: 'orange-500' },
        ].map((method, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow border border-gray-100 w-full aspect-square transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <motion.div variants={iconPop} className={`text-6xl text-${method.color} mb-4`}>
              {method.icon}
            </motion.div>
            <h4 className="text-lg font-bold text-gray-900 text-center mb-1">{method.title}</h4>
            <p className="text-xs text-gray-600 text-center">{method.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeIn} className="text-center text-gray-700 mt-16 text-lg max-w-3xl mx-auto">
        All transactions are securely processed through Paystack, a leading payment gateway.
      </motion.div>
    </div>
  </motion.section>
);


// FAQ Section Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'Can I pay without a card?', a: 'Yes! Paystack supports various secure payment methods including direct bank transfers, USSD, and Apple Pay, giving you flexible options beyond just cards.' },
    { q: 'Is this a one-time payment, or are there recurring fees?', a: 'Absolutely, it\'s a strictly one-time payment. Once you purchase your pixels, your ad remains live on our homepage permanently, with no hidden or recurring costs whatsoever.' },
    { q: 'Can I upload any image or logo?', a: 'You have full creative freedom to upload your custom images, logos, or unique designs. Please ensure your content adheres to our straightforward content guidelines, which prohibit offensive, illegal, or inappropriate material.' },
    { q: 'What happens immediately after my payment is confirmed?', a: 'As soon as your payment is successfully processed and confirmed by Paystack, your unique pixel ad will go live on our homepage. It will become instantly visible to our global audience, contributing to your brand\'s lasting legacy.' },
    { q: 'Can I change my image or link after purchase?', a: 'For the integrity and historical nature of our digital grid, all pixel placements are permanent once confirmed. We recommend double-checking all details, including your image and link, before finalizing your purchase to ensure everything is perfect.' },
  ];

  return (
    <motion.section
      className="py-20 md:py-28 bg-white text-gray-900"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3 variants={fadeIn} className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
          Your Questions, Answered.
        </motion.h3>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-gray-50 rounded-lg overflow-hidden shadow border border-gray-100"
            >
              <button
                className="flex justify-between items-center w-full p-6 sm:p-8 text-left text-xl sm:text-2xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <motion.span
                  className="ml-4 text-blue-600"
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="p-6 sm:p-8 pt-0 text-gray-700 text-base sm:text-lg leading-relaxed border-t border-gray-100">
                  {faq.a}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Final CTA Section Component (UPDATED with fading background)
const FinalCTA = ({ scrollToPixelGrid }) => (
  <motion.section
    className="relative py-20 md:py-28 bg-gradient-to-br from-blue-700 to-purple-800 text-white text-center overflow-hidden"
    variants={fadeIn}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Abstract Background Shapes/Gradients */}
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="w-96 h-96 rounded-full bg-white blur-3xl absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      <div className="w-80 h-80 rounded-full bg-purple-500 blur-3xl absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>
    </div>

    {/* Gradient Overlay for Fade Effect at Bottom */}
    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-10"></div> {/* This creates the fade! */}


    <div className="relative z-20 max-w-4xl mx-auto px-4"> {/* Increased z-index to be above the fade overlay */}
      <motion.h3 variants={fadeIn} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
        Your Permanent Spot Awaits.
      </motion.h3>
      <motion.button
        variants={fadeIn}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-blue-700 font-bold py-4 px-12 rounded-full text-xl shadow transition-all duration-300 transform flex items-center justify-center mx-auto"
        onClick={scrollToPixelGrid}
      >
        Head to the Pixel Grid <FaArrowRight className="ml-3" />
      </motion.button>
    </div>
  </motion.section>
);


// Main PricingPage Component
export default function PricingPage() {
  const scrollToPixelGrid = () => {
    const pixelGrid = document.getElementById('target-section');
    if (pixelGrid) {
      pixelGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/#target-section';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PricingHero scrollToPixelGrid={scrollToPixelGrid} />
      <WhatYouGet />
      <HowPaymentWorks />
      <PaymentMethods />
      <FAQ />
      <FinalCTA scrollToPixelGrid={scrollToPixelGrid} />
    </div>
  );
}