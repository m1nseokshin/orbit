import React from 'react';

export const CloseIcon = ({ className = 'w-6 h-6', onClick }) => {
  return (
    <button onClick={onClick} className={`focus:outline-none active:scale-95 transition-transform ${className}`} aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
};

export const BackIcon = ({ className = 'w-6 h-6', onClick }) => {
  return (
    <button onClick={onClick} className={`focus:outline-none active:scale-95 transition-transform ${className}`} aria-label="Back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
  );
};
