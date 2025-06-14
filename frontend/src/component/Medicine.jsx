import React from 'react';
import '../style/medicine.css'; // Import CSS for styling

const Medicine = () => {
  // Array of medicine data
  const medicines = [
    {
      name: 'Neem Oil',
      leafTags: ['Pest Control', 'Organic'],
      description: 'Natural pesticide for controlling pests and diseases.',
    },
    {
      name: 'Copper Fungicide',
      leafTags: ['Fungal Infections', 'Protection'],
      description: 'Effective against fungal infections.',
    },
    {
      name: 'Organic Compost',
      leafTags: ['Soil Health', 'Immunity Booster'],
      description: 'Improves soil health and plant immunity.',
    },
    {
      name: 'Baking Soda Spray',
      leafTags: ['Fungal Control', 'Home Remedy'],
      description: 'A simple solution to prevent fungal growth on leaves.',
    },
    {
      name: 'Epsom Salt',
      leafTags: ['Nutrient Boost', 'Magnesium Source'],
      description: 'Provides magnesium and sulfur to plants for better growth.',
    },
    {
      name: 'Neem Oil',
      leafTags: ['Pest Control', 'Organic'],
      description: 'Natural pesticide for controlling pests and diseases.',
    },
    {
      name: 'Copper Fungicide',
      leafTags: ['Fungal Infections', 'Protection'],
      description: 'Effective against fungal infections.',
    },
    {
      name: 'Organic Compost',
      leafTags: ['Soil Health', 'Immunity Booster'],
      description: 'Improves soil health and plant immunity.',
    },
    {
      name: 'Baking Soda Spray',
      leafTags: ['Fungal Control', 'Home Remedy'],
      description: 'A simple solution to prevent fungal growth on leaves.',
    },

  ];

  return (
    <div className="medicine">
      <h2>Medicine</h2>
      <p>Here you can manage and track medicinal treatments for your plants.</p>
      <div className="medicine-container">
        {medicines.map((medicine, index) => (
          <div key={index} className="medicine-card">
            <h3>{medicine.name}</h3>
            <div className="leaf-tags">
              {medicine.leafTags.map((tag, idx) => (
                <span key={idx} className="leaf-tag">
                  {tag}
                </span>
              ))}
            </div>
            <p>{medicine.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medicine;