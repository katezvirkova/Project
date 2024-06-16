import React, { useEffect } from 'react';

const FlowerDetailsComponent = ({ flower, setShowFlowers }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFlowers(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setShowFlowers]);

  return (
    <div className="flower-details">
      <h1>Деталі квітки: {flower.name}</h1>
      <p>{flower.description}</p>
    </div>
  );
};

export default FlowerDetailsComponent;
