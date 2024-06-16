import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginComponent from './components/LoginComponent';
import MainPageComponent from './components/MainPageComponent';
import QuizComponent from './components/QuizComponent';
import ResultsComponent from './components/ResultsComponent';
import FlowersComponent from './components/FlowersComponent';
import FlowerDetailsComponent from './components/FlowerDetailsComponent';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState(null);
  const [flowers, setFlowers] = useState([]);
  const [flowerDetails, setFlowerDetails] = useState(null);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchFlowers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/flowers');
      setFlowers(response.data);
    } catch (error) {
      console.error("Error fetching flowers:", error);
    }
  };

  const fetchFlowerDetails = async (flowerId) => {
    try {
      const response = await axios.get(`http://localhost:3001/flowers/${flowerId}`);
      setFlowerDetails(response.data);
    } catch (error) {
      console.error("Error fetching flower details:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    const questionInterval = setInterval(fetchQuestions, 5000);

    return () => clearInterval(questionInterval);
  }, []);

  useEffect(() => {
    if (showFlowers) {
      fetchFlowers();
      const flowerInterval = setInterval(fetchFlowers, 5000);

      return () => clearInterval(flowerInterval);
    }
  }, [showFlowers]);

  useEffect(() => {
    if (flowerDetails) {
      const detailInterval = setInterval(() => fetchFlowerDetails(flowerDetails.id), 5000);

      return () => clearInterval(detailInterval);
    }
  }, [flowerDetails]);

  return (
    <div className="App">
      {!isLoggedIn && <LoginComponent setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && !showQuiz && !showResults && !showFlowers && <MainPageComponent setShowQuiz={setShowQuiz} />}
      {isLoggedIn && showQuiz && !showResults && !showFlowers && (
        <>
          <QuizComponent questions={questions} setResults={setResults} setShowResults={setShowResults} />
        </>
      )}
      {isLoggedIn && showResults && !showFlowers && (
        <ResultsComponent results={results} setShowFlowers={setShowFlowers} />
      )}
      {isLoggedIn && showFlowers && !flowerDetails && (
        <FlowersComponent flowers={flowers} setFlowerDetails={setFlowerDetails} />
      )}
      {isLoggedIn && flowerDetails && (
        <FlowerDetailsComponent flower={flowerDetails} setShowFlowers={setShowFlowers} />
      )}
    </div>
  );
}

export default App;
