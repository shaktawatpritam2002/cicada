import React from "react";
import "./App.css";
import MainPage from "./Pages/MainPage";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup.jsx"
import Login from "./Pages/Login.jsx";
import PuzzleJourney from "./Pages/PuzzleJourney.jsx";
import Puzzle1 from "./Pages/Puzzle1.jsx";
import Puzzle2 from "./Pages/Puzzle2.jsx";
import Puzzle4 from "./Pages/Puzzle4.jsx";
import Puzzle6 from "./Pages/Puzzle6.jsx";
import SimpleHeader from "./Components/simpleheader.jsx";

function App() {
  return (
    <div className="App">
      <SimpleHeader />
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