'use client'; // This is necessary for using hooks like useRouter and for client-side interactions

import { FaXTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa6'; // Import FaXTwitter and FaLinkedinIn from 'react-icons/fa6'
import Link from 'next/link'; // Import Link from next/link
import { usePathname } from 'next/navigation'; // Import usePathname for checking the current route
import { useEffect } from 'react';

export default function Footer() {
  const pathname = usePathname(); // Get the current path

  // Function to handle scrolling to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Effect to handle scrolling when the component mounts or pathname changes
  // This is primarily for when navigating to the homepage with a hash from another page
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1); // Remove the '#'
        scrollToSection(id);
      }
    };

    // Listen for hash changes (e.g., if navigating to #how-it-works from another page)
    window.addEventListener('hashchange', handleHashChange);

    // Initial scroll check in case the component loads directly with a hash
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

        {/* Left: Copyright */}
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} PixelMaster. All rights reserved. Powered by <a href="http://raynerd.com.ng/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-semibold">Raynerd.com.ng</a>.
        </div>

        {/* Middle: Quick Links */}
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-indigo-500 transition">Home</Link>

          {/* How It Works Link */}
          <Link
            href="/#how-it-works" // Always link to the homepage with the hash
            onClick={(e) => {
              // If we are already on the homepage, prevent default and just scroll
              if (pathname === '/') {
                e.preventDefault(); // Prevent default link behavior (full page reload/navigation)
                scrollToSection('how-it-works');
              }
              // If not on the homepage, let Link handle the navigation, useEffect will scroll
            }}
            className="hover:text-indigo-500 transition"
          >
            How It Works
          </Link>

          <Link href="/pricing" className="hover:text-indigo-500 transition">Pricing</Link>
          <Link href="/contact-us" className="hover:text-indigo-500 transition">Contact</Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-3 text-lg">
          {/* X (formerly Twitter) Icon */}
          <a href="https://x.com/raynerdtech?s=21" target="_blank" rel="noopener noreferrer" className="hover:text-black"> {/* Changed hover color to black for X */}
            <FaXTwitter />
          </a>
          {/* GitHub Icon */}
          <a href="https://github.com/RaynerdTech" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
            <FaGithub />
          </a>
          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/raynerd-tech-703101288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700"> {/* Changed hover color for LinkedIn */}
            <FaLinkedinIn />
          </a>
        </div>

      </div>
    </footer>
  );
}