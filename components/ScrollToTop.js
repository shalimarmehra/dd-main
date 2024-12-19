// components/ScrollToTop.jsx
"use client"; // If you're using Next.js 13+ with app directory

import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
  onClick={scrollToTop}
  className="fixed bottom-4 right-4 bg-black dark:bg-white text-white dark:text-black w-8 h-8 md:w-12 md:h-12 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center focus:outline-none hover:bg-gray-700 dark:hover:bg-gray-300 z-50 border-y-2"
  aria-label="Scroll to top"
  style={{ position: 'fixed', zIndex: 9999 }}
>
  <svg
    className="w-4 h-4 md:w-6 md:h-6" 
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
</button>
      )}
    </>
  );
};

export default ScrollToTop;
