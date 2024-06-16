import React from 'react';
import Button from 'react-bootstrap/Button';

const MainPageComponent = ({ setShowQuiz }) => {
  return (
    <div className="main-page">
      <div className="overlay">
        <div className="content">
          <h1 className="text-center">Ласкаво просимо до вікторини про квіти</h1>
          <p className="text-center">Натисніть кнопку нижче, щоб почати вікторину.</p>
          <Button onClick={() => setShowQuiz(true)} className="btn-start-quiz" variant="primary">Почати </Button>
        </div>
      </div>
      <div className="motivation-section">
        <p>Квіти - це не тільки краса, але й мова любові та дружби. Дізнайтеся більше про дивовижний світ квітів та їхні значення. Долучайтеся до нашої вікторини і відкрийте для себе нові знання!</p>
      </div>
    </div>
  );
};

export default MainPageComponent;
