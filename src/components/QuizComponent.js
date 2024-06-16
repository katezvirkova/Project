import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'; 

const QuizComponent = ({ questions, setResults, setShowResults }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setResults(score + (isCorrect ? 1 : 0));
      setShowResults(true);
    }
  };

  return (
    <div className="quiz">
      {questions.length > 0 && (
        <div className="quiz-box card p-3">
          <div className="quiz-questions-item mb-3">
            <div className="quiz-questions-item__question h5">{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</div>
            <ul className="quiz-questions-item__answers list-unstyled">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <li key={index} className="mb-2">
                  <Button onClick={() => handleAnswerClick(answer.correct)} variant="outline-primary" className="w-100">{answer.text}</Button> {}
                </li>
              ))}
            </ul>
          </div>
          <div className="quiz-indicator text-muted">Питання {currentQuestionIndex + 1}/{questions.length}</div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
