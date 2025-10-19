import './App.css'
import Header from './components/Header.jsx';
import { UserProvider, UserContext } from "./components/UserContext";
import UserForm from './components/UserForm.jsx';
import { useContext, useState } from 'react';
import Question from './components/Question.jsx';
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import Result from './components/Result.jsx';
import './index.css';



function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);


  const questions = [
    {
      question: "What's your favorite season?",
      options: ["Spring 🌸", "Summer ☀️", "Autumn 🍂", "Winter ❄️"],
    },
    {
      question: "Which pet would you rather have?",
      options: ["Dog 🐶", "Cat 🐱", "Rabbit 🐰", "Fish 🐠"],
    },
    {
      question: "What’s your go-to drink in the morning?",
      options: ["Coffee ☕️", "Tea 🍵", "Juice 🍊", "Water 💧"],
    },
    {
      question: "Which type of movie do you enjoy most?",
      options: ["Comedy 😂", "Action 💥", "Horror 👻", "Romance ❤️"],
    },
    {
      question: "Where would you love to go on vacation?",
      options: ["Beach 🏖️", "Mountains 🏔️", "City 🏙️", "Countryside 🌾"],
    },
  ];


  const elements = {
    // Question 1
    "Spring 🌸": "Air 🌬️",
    "Summer ☀️": "Fire 🔥",
    "Autumn 🍂": "Earth 🌍",
    "Winter ❄️": "Water 💧",

    // Question 2
    "Dog 🐶": "Fire 🔥",
    "Cat 🐱": "Air 🌬️",
    "Rabbit 🐰": "Earth 🌍",
    "Fish 🐠": "Water 💧",

    // Question 3
    "Coffee ☕️": "Fire 🔥",
    "Tea 🍵": "Air 🌬️",
    "Juice 🍊": "Earth 🌍",
    "Water 💧": "Water 💧",

    // Question 4
    "Comedy 😂": "Air 🌬️",
    "Action 💥": "Fire 🔥",
    "Horror 👻": "Water 💧",
    "Romance ❤️": "Earth 🌍",

    // Question 5
    "Beach 🏖️": "Water 💧",
    "Mountains 🏔️": "Earth 🌍",
    "City 🏙️": "Air 🌬️",
    "Countryside 🌾": "Fire 🔥",
  };


  function handleAnswer(answer) {
    setCurrentQuestionIndex(prev => prev + 1);
    setAnswers(prev => [...prev, answer]);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  async function fetchArtwork() {
    try {
      let url = "https://dog.ceo/api/breeds/image/random";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setArtwork(data.message);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    }
  }
  

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork();
        
      }
    },
    [currentQuestionIndex]
  );

  function handlePlayAgain(){
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setElement("");
    setArtwork("");
    window.history.pushState({}, '', '/');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    <>
      <UserProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<UserForm />}/>
          <Route path="/quiz" element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <div>
                <Result element={element} artwork={artwork} />
                <button className="play-again-button" onClick={handlePlayAgain}>Play again!</button>
              </div>
            )
          }/>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
