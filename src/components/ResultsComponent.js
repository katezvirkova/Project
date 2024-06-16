import React from 'react';

const ResultsComponent = ({ results, setShowFlowers }) => (
  <div className="results-page">
    <h2>Ваш результат</h2>
    <p>Ви відповіли правильно на {results} питань.</p>
    <button className="btn-more-info" onClick={() => setShowFlowers(true)}>Дізнатись більше про квіти</button>
  </div>
);

export default ResultsComponent;
