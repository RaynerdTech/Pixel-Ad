'use client'; // This directive is necessary for using hooks and client-side features

import React, { useState, useEffect, useCallback } from 'react';
import { FaStar } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'; // Optional: for autoplay functionality

const testimonials = [
  {
    name: 'Chidi O.',
    quote: 'Brilliant marketing idea — got over 5,000 visits in 3 days!',
    avatar: 'https://media.istockphoto.com/id/1329737171/photo/portrait-of-a-young-black-man-at-home.jpg?s=612x612&w=0&k=20&c=BHO8UJg76zHha_6kzAeP4i2CFFJeSNQ1lL2Dmkfz_To=',
    rating: 5,
  },
  {
    name: 'Ada M.',
    quote: 'Easy to use, unique concept. I love how permanent my ad feels.',
    avatar: 'https://media.istockphoto.com/id/1455373021/photo/portrait-of-a-young-black-businesswoman.jpg?s=612x612&w=0&k=20&c=DGNL3WmfliC-AspTGQGxKhqMwsFZxvXi77crk60cz_4=',
    rating: 4,
  },
  {
    name: 'Michael K.',
    quote: 'Simple, effective, and fun. Great return on my small ad spend!',
    avatar: 'https://media.istockphoto.com/id/1069673870/photo/young-male-college-student.jpg?s=612x612&w=0&k=20&c=YI_HyAqEgRxiqwq7EYMMuxwhHRdeMfGi49Ne-u93KLY=',
    rating: 5,
  },
  {
    name: 'Sarah P.',
    quote: 'The exposure I got was incredible! Highly recommend for anyone looking to reach a wider audience.',
    avatar: 'https://media.istockphoto.com/id/1341379656/photo/portrait.jpg?s=612x612&w=0&k=20&c=6JaiZB5Z8P4-BtpId6i-ZzGmi7e-t1fxgB6Z3slycZI=',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback((index) => {
    emblaApi && emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <section className="py-20" style={{ backgroundColor: '#FAF9F6' }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-1xl font-bold text-gray mb-14 leading-tight">
          What Advertisers Are Saying
        </h2>

        <div className="embla overflow-hidden relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex">
              {testimonials.map((t, i) => (
                <div key={i} className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between">
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-indigo-200">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover object-center" // object-cover ensures image fills and doesn't shrink
                        />
                      </div>
                      <p className="text-xl font-semibold text-gray-900 mb-1">{t.name}</p>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, idx) => (
                          <FaStar
                            key={idx}
                            className={idx < t.rating ? 'text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">"{t.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="embla__dots flex justify-center mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                  index === selectedIndex ? 'bg-indigo-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}