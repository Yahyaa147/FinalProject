import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-bold text-gray-900">Finance Hub</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                A comprehensive portfolio management and financial news platform designed to help you make informed investment decisions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/portfolio" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Portfolio Management
                  </a>
                </li>
                <li>
                  <a href="/news" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Financial News
                  </a>
                </li>
                <li>
                  <a href="/tools" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Investment Tools
                  </a>
                </li>
                <li>
                  <a href="/community" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Community Forum
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Investment Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Market Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Educational Content
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 text-sm">support@financehub.com</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 text-sm">
                    123 Financial District<br />
                    New York, NY 10004
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-sm">
                  &copy; 2025 Finance Hub. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Built with React, TypeScript, and Tailwind CSS.
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
