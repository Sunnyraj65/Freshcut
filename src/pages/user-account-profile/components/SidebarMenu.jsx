import React from 'react';
import Icon from 'components/AppIcon';

const SidebarMenu = ({ user, items, active, onChange }) => (
  <aside className="w-full sm:w-64 bg-white rounded-lg border border-border p-4">
    {/* User header */}
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt={user.fullName} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <Icon name="User" size={24} className="text-primary" />
        )}
      </div>
      <div className="min-w-0">
        <div className="font-medium truncate">{user?.fullName || 'Guest'}</div>
        <div className="text-xs text-text-tertiary truncate">{user?.primaryEmailAddress?.emailAddress}</div>
        {user?.primaryPhoneNumber?.phoneNumber && (
          <div className="text-xs text-text-tertiary truncate">{user.primaryPhoneNumber.phoneNumber}</div>
        )}
      </div>
      <Icon name="ChevronRight" size={16} className="text-text-tertiary ml-auto" />
    </div>

    {/* Menu */}
    <div>
      <h3 className="text-sm font-semibold text-text-primary mb-2">My Account</h3>
      <nav className="space-y-1">
        {items.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth touch-target ${
              active === key
                ? 'bg-primary-50 text-primary border border-primary-200'
                : 'text-text-secondary hover:text-primary hover:bg-primary-50'
            }`}
          >
            <Icon name={icon} size={18} />
            <span className="text-sm font-medium flex-1 text-left">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  </aside>
);

export default SidebarMenu;
