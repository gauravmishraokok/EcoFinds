import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Leaf, Heart, Recycle, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-sage-800 via-sage-900 to-charcoal overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 leaf-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-terracotta-500 rounded-full opacity-5 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-moss-500 rounded-full opacity-5 animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Logo size="lg" />
              <span className="text-2xl font-display font-bold text-white">EcoFinds</span>
            </Link>
            <p className="text-sage-200 mb-6 max-w-md leading-relaxed">
              EcoFinds is a sustainable marketplace connecting eco-conscious buyers and sellers. 
              Find and sell environmentally friendly products while supporting a greener future.
            </p>
            
            {/* Sustainability badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 bg-sage-700/30 px-3 py-2 rounded-full">
                <Leaf className="w-4 h-4 text-sage-300" />
                <span className="text-sm text-sage-200">100% Sustainable</span>
              </div>
              <div className="flex items-center gap-2 bg-sage-700/30 px-3 py-2 rounded-full">
                <Recycle className="w-4 h-4 text-sage-300" />
                <span className="text-sm text-sage-200">Circular Economy</span>
              </div>
              <div className="flex items-center gap-2 bg-sage-700/30 px-3 py-2 rounded-full">
                <Globe className="w-4 h-4 text-sage-300" />
                <span className="text-sm text-sage-200">Carbon Neutral</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sage-300 hover:text-white transition-colors p-2 bg-sage-700/20 rounded-full hover:bg-sage-600/30">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-sage-300 hover:text-white transition-colors p-2 bg-sage-700/20 rounded-full hover:bg-sage-600/30">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-sage-300 hover:text-white transition-colors p-2 bg-sage-700/20 rounded-full hover:bg-sage-600/30">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.83c-.49 0-.928.39-.928.928v7.83c0 .49.39.928.928.928h8.449c.49 0 .928-.39.928-.928v-7.83c0-.49-.39-.928-.928-.928z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sage-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-sage-400 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sage-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-sage-400 rounded-full"></span>
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sage-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-sage-400 rounded-full"></span>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sage-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-sage-400 rounded-full"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-sage-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-sage-400 rounded-full"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sage-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-sage-400 rounded-full"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sage-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-sage-400 rounded-full"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sage-200 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-sage-400 rounded-full"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sage-300 text-sm">
              © 2024 EcoFinds. All rights reserved.
            </p>
            <p className="text-sage-300 text-sm mt-2 md:mt-0 flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-terracotta-400" /> for a sustainable future
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
