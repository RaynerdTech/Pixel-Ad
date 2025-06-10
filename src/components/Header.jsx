'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Import useEffect
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Function to scroll to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Effect to handle scrolling when the component mounts or pathname/hash changes
  // This is crucial for navigating to a hash on the homepage from another page
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash && pathname === '/') {
        const id = window.location.hash.substring(1); // Remove the '#'
        scrollToSection(id);
      }
    };

    // Listen for hash changes (e.g., if navigating to #how-it-works from another page and then hash updates)
    window.addEventListener('hashchange', handleHashScroll);

    // Initial check when the component first mounts, in case of direct load with a hash
    handleHashScroll();

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, [pathname]); // Re-run if pathname changes (e.g., navigated to homepage)

  // Enhanced function to handle navigation links
  const handleNavLinkClick = (e, href) => {
    setIsOpen(false); // Always close mobile menu

    const targetId = href.startsWith('#') ? href.substring(1) : null;

    if (targetId) {
      // If it's a hash link
      if (pathname === '/') {
        // If already on the homepage, just scroll
        e.preventDefault(); // Prevent default Link behavior (full page reload/navigation)
        scrollToSection(targetId);
      } else {
        // If not on the homepage, navigate to homepage with hash
        // The useEffect will handle the scroll once the page loads
        e.preventDefault(); // Prevent default Link behavior
        router.push(`/#${targetId}`);
      }
    }
    // For regular absolute links (not starting with #), let Link component handle navigation naturally
    // No explicit 'else' needed here, as default Link behavior handles non-hash hrefs
  };

  // Function for the "Get Started" button
  const handleGetStartedClick = (e) => {
    setIsOpen(false); // Close mobile menu immediately

    // If currently on the homepage, scroll to '#target-section'
    if (pathname === '/') {
      e.preventDefault(); // Prevent default Link behavior for hash scroll
      scrollToSection('target-section');
    } else {
      // If not on the homepage, navigate to homepage and then scroll
      router.push('/#target-section');
    }
  };

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Logo: Link to homepage and closes menu if open */}
     <Link href="/" className="text-2xl font-extrabold text-gray-800 tracking-tight hover:text-blue-600 transition-colors duration-200" onClick={() => setIsOpen(false)}>
  Pixel
  <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text"> Ad</span>
</Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 text-gray-600 font-medium items-center">
        <Link href="/" className="hover:text-blue-600 transition-colors duration-200" onClick={(e) => handleNavLinkClick(e, '/')}>Home</Link>
        {/* Updated How it Works link */}
        <Link href="/#how-it-works" className="hover:text-blue-600 transition-colors duration-200" onClick={(e) => handleNavLinkClick(e, '#how-it-works')}>How it Works</Link>
        <Link href="/pricing" className="hover:text-blue-600 transition-colors duration-200" onClick={(e) => handleNavLinkClick(e, '/pricing')}>Pricing</Link>
        <Link href="/contact-us" className="hover:text-blue-600 transition-colors duration-200" onClick={(e) => handleNavLinkClick(e, '/contact-us')}>Contact</Link>
        <Link
          href="/#target-section"
          className="ml-6 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleGetStartedClick}
        >
          Get Started
        </Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button
          className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <svg
            className={`w-7 h-7 transform transition-transform duration-300 ease-in-out text-gray-700 ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`absolute top-[68px] left-0 w-full shadow-lg md:hidden flex flex-col space-y-5 py-6 px-6 transform transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
        style={{ backgroundColor: '#FAF9F6' }}
      >
        <Link href="/" className="text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200 block py-2" onClick={(e) => handleNavLinkClick(e, '/')}>Home</Link>
        {/* Updated How it Works link for mobile */}
        <Link href="/#how-it-works" className="text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200 block py-2" onClick={(e) => handleNavLinkClick(e, '#how-it-works')}>How it Works</Link>
        <Link href="/pricing" className="text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200 block py-2" onClick={(e) => handleNavLinkClick(e, '/pricing')}>Pricing</Link>
        <Link href="/contact-us" className="text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200 block py-2" onClick={(e) => handleNavLinkClick(e, '/contact-us')}>Contact</Link>
        <Link
          href="/#target-section"
          className="mt-4 w-full px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleGetStartedClick}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;