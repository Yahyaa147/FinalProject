import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Newspaper, 
  Calculator, 
  Users, 
  Menu, 
  X,
  TrendingUp,
  User,
  LogIn,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  const location = useLocation();
  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/portfolio', label: 'Portfolio', icon: BarChart3 },
    { path: '/discover', label: 'Discover', icon: TrendingUp },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/tools', label: 'Tools', icon: Calculator },
    { path: '/community', label: 'Community', icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  const handleLogin = (email: string, _password: string) => {
    // Mock login logic
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    setUser({ name: 'John Doe', email: email });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    setUser({ name: '', email: '' });
  };

  const LoginModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    if (!isLoginModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {isRegistering ? 'Create Account' : 'Sign In'}
            </h2>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(email, password); }}>
            <div className="space-y-4">
              {isRegistering && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {isRegistering && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {isRegistering ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>        </div>
      </div>
    );
  };
  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 shadow-lg border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">{/* Logo */}            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 group">
                <div className="relative">
                  <TrendingUp className="h-9 w-9 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                </div>                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Finance
                  </span>
                  <div className="text-xs text-gray-300 font-medium">Professional Portfolio Manager</div>
                </div>
              </Link>
            </div>            {/* Centered Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-1 bg-white/10 rounded-full p-1 backdrop-blur-md">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                        isActive(item.path)
                          ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25'
                          : 'text-gray-300 hover:text-white hover:bg-white/20 hover:shadow-md'
                      }`}
                    >
                      <Icon className={`h-4 w-4 transition-all duration-200 ${
                        isActive(item.path) 
                          ? 'text-white' 
                          : 'text-gray-300 group-hover:text-white group-hover:scale-110'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right side - User menu or Login */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative">                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/30"
                  >
                    <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-gray-300">{user.email}</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* User dropdown menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 backdrop-blur-md bg-white/95">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile Settings
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Account Settings
                        </Link>
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>              ) : (                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none focus:text-white p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 border-t border-gray-600/50 backdrop-blur-md">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.path)
                          ? 'text-white bg-blue-600/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile Login/User section */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  {isLoggedIn ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2">
                        <div className="text-base font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md w-full text-left"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoginModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md w-full text-left"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal />
    </>
  );
};

export default Navigation;
