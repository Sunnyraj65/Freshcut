import React from 'react';

const Row = ({ label, value }) => (
  <div className="py-2 border-b last:border-b-0 border-border">
    <div className="text-xs text-text-tertiary uppercase mb-1">{label}</div>
    <div className="text-sm text-text-primary">{value || '—'}</div>
  </div>
);

const InfoCard = ({ user, onEdit }) => (
  <div className="bg-white border border-border rounded-lg p-6 w-full">
    <h2 className="text-lg font-heading font-semibold mb-4 text-text-primary">Account Information</h2>

    <Row label="Full Name" value={user?.fullName} />
    <Row label="Email ID" value={user?.primaryEmailAddress?.emailAddress} />
    <Row label="Mobile No" value={user?.primaryPhoneNumber?.phoneNumber} />
    {/* Placeholder for default address or other fields */}
    <Row label="Default Address" value={user?.publicMetadata?.defaultAddress} />

    <button
      onClick={onEdit}
      className="mt-6 w-full bg-primary text-white font-medium py-3 rounded-full hover:opacity-90 transition-smooth"
    >
      Edit
    </button>
  </div>
);

export default InfoCard;
