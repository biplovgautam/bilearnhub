'use client';

import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Navbar Logo */}
              <div className="relative h-16 w-28 mr-3">
                <Image 
                  src="/navlogo.jpg" 
                  alt="BiLearnHub" 
                  fill
                  className="object-contain rounded-lg"
                  onError={() => {
                    // Fallback to text if image not found
                    const textElement = document.getElementById('logo-text');
                    if (textElement) {
                      textElement.style.display = 'block';
                    }
                  }}
                />
              </div>
              <h1 
                id="logo-text"
                className="text-2xl font-bold gradient-text text-accent"
                style={{ display: 'none' }}
              >
                BiLearnHub
              </h1>
            </div>
          </div>

          {/* Right side - can add navigation links here later */}
          <div className="flex items-center space-x-4">
            {/* Navigation items can go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
