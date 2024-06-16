import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'; 

const FlowersComponent = ({ flowers, setFlowerDetails }) => {
  const [selectedFlower, setSelectedFlower] = useState(null);

  useEffect(() => {
    if (selectedFlower) {
      const timer = setTimeout(() => {
        setSelectedFlower(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [selectedFlower]);

  const handleDetailsClick = (flower) => {
    setSelectedFlower(flower);
  };

  return (
    <div className="flowers-page container">
      <h1 className="text-center">Виберіть квітку</h1>
      <div className="flowers-list row">
        {flowers.map(flower => (
          <div key={flower.id} className="flower-item col-4 text-center">
            <img src={flower.icon} alt={flower.name} className="img-fluid rounded-circle mb-2"/>
            <p>{flower.name}</p>
            <Button onClick={() => handleDetailsClick(flower)} variant="info" className="btn-details">Дізнатись</Button> {}
            {selectedFlower && selectedFlower.id === flower.id && (
              <p className="mt-2">{selectedFlower.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowersComponent;
