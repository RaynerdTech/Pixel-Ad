'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaArrowRight,
  FaCommentDots,
} from 'react-icons/fa';

// Import useForm and ValidationError from Formspree
import { useForm, ValidationError } from '@formspree/react';

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const iconPop = {
  hidden: { scale: 0.7, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 10 },
  },
};

// --- Hero Section ---
const ContactHero = () => (
  <motion.section
    className="relative py-20 md:py-32 bg-gradient-to-br from-blue-700 to-purple-800 text-white text-center overflow-hidden"
    variants={fadeIn}
    initial="hidden"
    animate="show"
  >
    {/* Enhanced background animations */}
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="w-96 h-96 rounded-full bg-white blur-3xl absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 animate-blob-1"></div>
      <div className="w-80 h-80 rounded-full bg-purple-500 blur-3xl absolute bottom-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 animate-blob-2"></div>
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-4">
      <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
        Let's Create <span className="text-blue-200">Together.</span>
      </motion.h1>
      <motion.p variants={fadeIn} className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
        Have a question, a project idea, or just want to say hello? We're eager to hear from you.
      </motion.p>
    </div>
  </motion.section>
);

// --- Your Enhanced Contact Form Component ---
// This component now handles the form logic and styling
function EnhancedContactForm() {
  const [state, handleSubmit] = useForm("mgvyarrz"); // Make sure "mgvyarrz" is your correct Formspree ID

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-10 px-6 bg-green-50 text-green-800 rounded-lg shadow-md"
      >
        <h3 className="text-2xl font-semibold mb-3">Message Sent Successfully!</h3>
        <p className="text-lg">Thank you for reaching out. We'll get back to you shortly.</p>
        <FaCommentDots className="mx-auto text-green-600 text-5xl mt-6 animate-bounce" />
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          name="name" // Important: Formspree uses the name attribute
          placeholder="John Doe"
          required
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 transition-all duration-200"
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
          className="text-red-500 text-xs mt-1"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          name="email" // Important: Formspree uses the name attribute
          placeholder="you@example.com"
          required
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 transition-all duration-200"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-500 text-xs mt-1"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          name="subject" // Important: Formspree uses the name attribute
          placeholder="Regarding a project..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 transition-all duration-200"
        />
        <ValidationError
          prefix="Subject"
          field="subject"
          errors={state.errors}
          className="text-red-500 text-xs mt-1"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          name="message" // Important: Formspree uses the name attribute
          rows="6"
          placeholder="Tell us more..."
          required
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 resize-y transition-all duration-200"
        ></textarea>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-500 text-xs mt-1"
        />
      </div>

      <motion.button
        type="submit"
        disabled={state.submitting}
        whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-full text-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-700"
      >
        {state.submitting ? 'Sending...' : 'Send Message'} <FaArrowRight className="ml-3" />
      </motion.button>
    </form>
  );
}

// --- Contact Form + Info ---
const ContactFormAndInfo = () => (
  <motion.section
    className="relative py-20 bg-white z-10 -mt-16 sm:-mt-24 md:-mt-32 rounded-t-[4rem] sm:rounded-t-[6rem] overflow-hidden shadow"
    variants={staggerContainer}
    initial="hidden"
    animate="show"
  >
    {/* Subtle patterned background */}
    <div className="absolute inset-0 z-0 opacity-5 bg-[repeating-conic-gradient(#f0f0f0_0%_25%,transparent_0%_50%)] bg-[length:20px_20px]"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 relative shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Animated icon for the form */}
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 p-4 rounded-full border border-blue-400"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 10, delay: 0.3 }}
          >
            <FaCommentDots className="text-white text-3xl" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 pt-8 text-gray-900">
            Send Us a Message
          </h2>
          {/* Render your Formspree-enabled form here */}
          <EnhancedContactForm />
        </motion.div>

        {/* Info */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">Reach Out Directly</h2>
          <div className="space-y-10 w-full">
            {[
              {
                icon: <FaEnvelope />,
                title: 'Email Us',
                content: 'raynerdtech@gmail.com',
                link: 'mailto:raynerdtech@gmail.com',
              },
              {
                icon: <FaPhone />,
                title: 'Call Us',
                content: '+234 802 298 2025',
                link: 'tel:+2348022982025',
              },
              {
                icon: <FaMapMarkerAlt />,
                title: 'Worldwide',
                  content: "We don't have a physical office, but we are available online 24/7.",
                link: '#',
              },
            ].map((info, i) => (
              <motion.a
                key={i}
                href={info.link}
                target={info.link.startsWith('http') || info.link.startsWith('tel') || info.link.startsWith('mailto') ? '_blank' : '_self'}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center sm:items-start group p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <motion.div
                  variants={iconPop}
                  className="relative bg-white p-6 rounded-full border border-blue-100 mb-4 sm:mb-0 sm:mr-6 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
                >
                  <div className="absolute inset-0 bg-blue-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center justify-center text-blue-600 text-3xl group-hover:text-blue-800 transition-colors">
                    {info.icon}
                  </span>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{info.title}</h3>
                  <p className="text-gray-700 text-lg">{info.content}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

// --- Social Links ---
const SocialLinks = () => (
  <motion.section
    className="py-20 md:py-28 bg-[#003ddd] relative overflow-hidden" // Removed gradient classes, using a solid color now. Re-add if you prefer.
    variants={staggerContainer}
    initial="hidden"
    animate="show"
  >
    {/* Subtle background gradients with increased opacity and blur */}
    <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle_at_center,#fff,transparent_50%),radial-gradient(circle_at_top_left,#dce7ff,transparent_60%),radial-gradient(circle_at_bottom_right,#e9d8fd,transparent_60%)] filter blur-sm"></div>

    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <motion.h2
        variants={fadeIn}
        className="text-3xl sm:text-4xl font-bold text-[#fff] mb-10 relative inline-block pb-2"
      >
        Connect With Us
        {/* Animated underline */}
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 h-1 bg-blue-400 rounded-full"
        ></motion.span>
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { icon: FaTwitter, link: 'https://x.com/raynerdtech?s=21' },
          { icon: FaLinkedinIn, link: 'https://www.linkedin.com/in/raynerd-tech-703101288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
          { icon: FaInstagram, link: 'https://www.instagram.com/techraynerd?igsh=Y3F5azFkdzBjbzcz&utm_source=qr' },
          { icon: FaWhatsapp, link: 'https://wa.me/2348022982025' },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={iconPop}
            whileHover={{ scale: 1.15, rotate: 5, boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 text-3xl shadow-sm"
          >
            <social.icon />
          </motion.a>
        ))}
      </div>
    </div>
  </motion.section>
);

// --- Combined Export Component ---
const ContactPage = () => (
  <>
    <ContactHero />
    <ContactFormAndInfo />
    <SocialLinks />
  </>
);

export default ContactPage;