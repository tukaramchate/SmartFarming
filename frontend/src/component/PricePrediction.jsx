

import React, { useState } from 'react';
import '../style/priceprediction.css';

const PricePrediction = ({ url }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="graph-container">
      <div className="graph-card" onClick={toggleFullscreen}>
        <img src={url} alt="Price Prediction Graph" className="graph-image" />
      </div>

      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={toggleFullscreen}>
          <img src={url} alt="Full Screen Graph" className="fullscreen-image" />
        </div>
      )}
    </div>
  );
};

export default PricePrediction;

