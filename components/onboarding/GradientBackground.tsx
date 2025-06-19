import React from 'react';

const GradientBackground = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background: 'linear-gradient(to bottom right, #00b140, #baff29)',
      }}
    />
  );
};

export default GradientBackground; 