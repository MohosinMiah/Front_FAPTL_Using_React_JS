import React from 'react';

const BodyWrapper = ({children}) => {
  return (
      <div className="relative min-h-screen">
        <div className="w-full min-h-screen">{children}</div>
      </div>
  );
};

export default BodyWrapper;
