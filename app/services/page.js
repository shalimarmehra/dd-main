import React from "react";
import Head from "next/head";
import { FaServicestack } from "react-icons/fa";

const page = () => {
  return (
    <div>
      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wide text-gray-900 dark:text-gray-100 font-['Playfair_Display'] flex items-center justify-center gap-2 relative hover:text-shadow-lg transition-all duration-300 group cursor-help [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] animate-fadeIn mb-2">
        <FaServicestack className="animate-pulse transition-transform hover:scale-110" />
        <span className="relative">
          WEB DEVELOPMENT SERVICES
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-gray-100 group-hover:w-full transition-all duration-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"></span>
        </span>
      </h1>
      <p className="text-center mb-10 text-xs">Transform Your Online Presence with Our Web Development Solutions</p>
      <div className="min-h-screen bg-gradient-to-b from-white to-black dark:bg-gradient-to-b dark:from-black dark:to-white flex items-center justify-center">
        <Head>
          <title>Coming Soon</title>
          <meta name="description" content="Our website is coming soon" />
        </Head>

        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-4 animate-pulse">Coming Soon</h1>
          <p className="text-xl mb-8">
            We&apos;re launching something exciting. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
