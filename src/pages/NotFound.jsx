import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8 font-caption">
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/homepage"
            className="btn-primary w-full inline-flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Homepage</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-surface-100"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;