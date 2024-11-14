import React from "react";
import "./App.css";
import MainPage from "./Pages/MainPage";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup.jsx"
import Login from "./Pages/Login.jsx";
import PuzzleJourney from "./Pages/Puzzlejourney.jsx";
import Puzzle1 from "./Pages/Puzzle1.jsx";
import Puzzle2 from "./Pages/Puzzle2.jsx";
import Puzzle4 from "./Pages/Puzzle4/Puzzle4.jsx";
import Puzzle6 from "./Pages/Puzzle6/Puzzle6.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/puzzle-journey" element={<PuzzleJourney/>} />
        <Route path="/puzzle/1" element={<Puzzle1 />} />
        <Route path="/puzzle/2" element={<Puzzle2 />} />
        <Route path="/puzzle/4" element={<Puzzle4 />} />
        <Route path="/puzzle/6" element={<Puzzle6 />} />
      </Routes>
    </div>
  );
}

export default App;