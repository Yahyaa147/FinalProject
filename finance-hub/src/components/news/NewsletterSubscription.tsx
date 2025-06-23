import React, { useState } from 'react';

interface NewsletterSubscriptionProps {
  categoryTitle: string;
  categoryType: string;
  onSubscribe?: (email: string) => void;
  className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ 
  categoryTitle, 
  categoryType, 
  onSubscribe,
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      if (onSubscribe) {
        onSubscribe(email);
      }
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">
            Stay Updated with {categoryTitle}
          </h3>
          <p className="text-blue-100 text-sm">
            Get daily digest of the most important {categoryType} news delivered to your inbox
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {isSubmitted ? (
            <div className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white font-medium">Subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button 
                type="submit"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
