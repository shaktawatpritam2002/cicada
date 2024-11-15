import React from "react";
import "./App.css";
import MainPage from "./Pages/MainPage";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup.jsx"
import Login from "./Pages/Login.jsx";
import PuzzleJourney from "./Pages/PuzzleJourney.jsx";
import Puzzle1 from "./Pages/Puzzle1.jsx";
import Puzzle2 from "./Pages/Puzzle2.jsx";
import Puzzle3 from "./Pages/Puzzle3.jsx"
import Puzzle4 from "./Pages/Puzzle4.jsx";
import Puzzle6 from "./Pages/Puzzle6.jsx";
import SimpleHeader from "./Components/simpleheader.jsx";
import Puzzle7 from "./Pages/Puzzle7.jsx";
import Puzzle5 from "./Pages/Puzzle5.jsx";
import Winners from "./Pages/winners.jsx";
import TimerProvider from "./context/TimerContext.jsx";


function App() {
  return (
    <TimerProvider>
        <div className="App">
      <SimpleHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/puzzle-journey" element={<PuzzleJourney/>} />
        <Route path="/puzzle/1" element={<Puzzle1 />} />
        <Route path="/puzzle/2" element={<Puzzle2 />} />
        <Route path="/puzzle/3" element={<Puzzle3 />} />

        <Route path="/puzzle/4" element={<Puzzle4 />} />
        <Route path="/puzzle/5" element={<Puzzle5 />} />

        <Route path="/puzzle/6" element={<Puzzle6 />} />
        <Route path="/puzzle/7" element={<Puzzle7 />} />
        <Route path="/puzzle/3" element={<Puzzle3 />} />
        <Route path="/winner" element={<Winners/>}/>
      </Routes>
    </div>
  
    </TimerProvider>
  )
}

export default App;