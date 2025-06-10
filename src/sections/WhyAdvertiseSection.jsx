'use client'
import React from 'react'
import { FaGlobe, FaClock, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

const reasons = [
  {
    icon: <FaGlobe className="text-4xl text-blue-600" />,
    title: 'Global Reach',
    description:
      'Unlock unparalleled visibility. Your ad will be showcased to thousands of daily visitors from every corner of the globe, ensuring your message transcends borders and reaches a truly international audience.',
  },
  {
    icon: <FaClock className="text-4xl text-blue-600" />,
    title: 'Forever Placement',
    description:
      'Invest once, benefit endlessly. Your pixel ad enjoys permanent online presence—no recurring fees, no expiration dates, just continuous, undiluted exposure for the lifetime of our platform.',
  },
  {
    icon: <FaUsers className="text-4xl text-blue-600" />,
    title: 'Mass Appeal',
    description:
      'Tap into a constantly growing, engaged community. Our unique, viral concept ensures a perpetual influx of curious and diverse users, guaranteeing your ad captures widespread attention and generates significant interest.',
  },
]

// Array of colors for the circles - Red changed to Blue
const circleColors = ['bg-purple-500', 'bg-green-500', 'bg-blue-500']

export default function WhyAdvertiseSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          // Responsive text sizing for h2
          className="text-3xl sm:text-4xl md:text-1xl font-bold text-gray-900 mb-12 sm:mb-16 leading-tight tracking-tight"
        >
          Why Choose a Pixel Ad? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Beyond Traditional Advertising
          </span>
        </motion.h2>

        {/* Timeline Container */}
        <div className="relative mt-12 md:mt-20">
          {/* Vertical Line - Positioned to the right */}
          <div className="absolute right-0 top-0 h-full w-0.5 bg-blue-300"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-12 md:space-y-16"
          >
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left p-6 md:p-0 relative pr-8"
              >
                {/* Shaded Circle ON the Line */}
                <div
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2
                              w-4 h-4 rounded-full shadow-lg z-20 ${circleColors[i % circleColors.length]}`}
                ></div>

                {/* Icon Container */}
                <div
                  className={`flex-shrink-0 p-5 rounded-full bg-white shadow-lg border border-blue-200
                              mb-6 md:mb-0 md:mr-8 z-10`}
                >
                  {r.icon}
                </div>

                {/* Text Content */}
                <div className="flex-grow">
                  {/* Responsive text sizing for h3 */}
                  <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-snug">
                    {r.title}
                  </h3>
                  {/* Responsive text sizing for description (p tag) */}
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto md:mx-0">
                    {r.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}