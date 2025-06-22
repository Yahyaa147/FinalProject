import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <TrendingUp className="h-10 w-10 text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Finance Hub
                  </span>
                  <div className="text-xs text-gray-400 font-medium">Professional Portfolio Manager</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                A comprehensive portfolio management and financial news platform designed to help you make informed investment decisions and build wealth effectively.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110">
                  <Facebook className="h-5 w-5 text-blue-400" />
                </a>
                <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110">
                  <Twitter className="h-5 w-5 text-blue-400" />
                </a>
                <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110">
                  <Linkedin className="h-5 w-5 text-blue-400" />
                </a>
                <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110">
                  <Github className="h-5 w-5 text-blue-400" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mr-3"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/portfolio" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Portfolio Management
                  </a>
                </li>
                <li>
                  <a href="/discover" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Discover Markets
                  </a>
                </li>
                <li>
                  <a href="/news" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Financial News
                  </a>
                </li>
                <li>
                  <a href="/tools" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Investment Tools
                  </a>
                </li>
                <li>
                  <a href="/community" className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Community Forum
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mr-3"></div>
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Investment Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Market Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Educational Content
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm flex items-center group">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-green-400 to-blue-400 rounded-full mr-3"></div>
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Mail className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Email Support</div>
                    <div className="text-sm text-gray-300">support@financehub.com</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Phone className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Phone Support</div>
                    <div className="text-sm text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Office Location</div>
                    <div className="text-sm text-gray-300">
                      123 Financial District<br />
                      New York, NY 10004
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-300 text-sm mb-1">
                  &copy; 2025 Finance Hub. All rights reserved.
                </p>
                <p className="text-gray-400 text-xs">
                  Built with ❤️ using React, TypeScript, and Tailwind CSS.
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors hover:underline">
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
