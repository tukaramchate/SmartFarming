import React from 'react';
import '../style/farmimg.css';

const FarmImg = () => {
  const plantImages = [
    '../public/farm.jpg','../public/pt.gif','../public/sprinkler.jpg',
   ];

  return (
    <div className="plant-container">
      <div className="plant-inner-wrap">
        {plantImages.map((image, index) => (
          <div key={index} className="plant-card">
            <img src={image} alt={`Plant ${index + 1}`} className="plant-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmImg;