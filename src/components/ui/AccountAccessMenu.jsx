import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import useOrders from 'hooks/useOrders';

const AccountAccessMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    avatar: null,
    isAuthenticated: true
  });
  const menuRef = useRef(null);
  const location = useLocation();

  let accountMenuItems = [
    {
      label: 'My Profile',
      path: '/user-account-profile',
      icon: 'User',
      description: 'Personal information'
    },
    {
      label: 'Order History',
      path: '/order-tracking-status',
      icon: 'Package',
      description: 'Past orders & tracking'
    },
    {
      label: 'Preferences',
      path: '/user-account-profile',
      icon: 'Settings',
      description: 'Delivery & notifications'
    },
    {
      label: 'Help & Support',
      path: '/user-account-profile',
      icon: 'HelpCircle',
      description: 'FAQ & contact us'
    }
  ];

  // Hide Order History if the user has no previous orders
  const { hasOrders } = useOrders();
  if (!hasOrders) {
    accountMenuItems = accountMenuItems.filter(item => item.path !== '/order-tracking-status');
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    setUser(prev => ({ ...prev, isAuthenticated: false }));
    setIsOpen(false);
  };

  if (!user.isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          to="/user-account-profile"
          className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-smooth"
        >
          Sign In
        </Link>
        <Link
          to="/user-account-profile"
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:scale-105 transition-smooth"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Account Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50 transition-smooth touch-target"
        aria-label="Account menu"
      >
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} className="text-primary" />
          )}
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-text-primary">
            {user.name}
          </div>
          <div className="text-xs text-text-tertiary font-caption">
            Account
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-large border border-border z-1100 animate-scale-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} className="text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-text-primary truncate">
                  {user.name}
                </div>
                <div className="text-sm text-text-secondary font-caption truncate">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {accountMenuItems.map((item) => (
              <Link
                key={item.path + item.label}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-primary hover:bg-primary-50 transition-smooth"
              >
                <Icon name={item.icon} size={18} />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-text-tertiary font-caption">
                    {item.description}
                  </div>
                </div>
                <Icon name="ChevronRight" size={14} className="text-text-tertiary" />
              </Link>
            ))}
          </div>

          {/* Sign Out */}
          <div className="border-t border-border py-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-error hover:bg-error-50 transition-smooth"
            >
              <Icon name="LogOut" size={18} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountAccessMenu;