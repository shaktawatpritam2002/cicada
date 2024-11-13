import React from "react";
import "./App.css";
import MainPage from "./Pages/MainPage";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup.jsx"
import Login from "./Pages/Login.jsx";
import PuzzleJourney from "./Pages/Puzzlejourney.jsx";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/PuzzleJourney" element={<PuzzleJourney/>} />

      </Routes>
    </div>
  );
}

export default App;