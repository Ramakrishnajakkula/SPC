import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "./contexts/themeContext.jsx";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import CreateSeason from "./components/VideoManagement";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/VideoManagement" element={<CreateSeason />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
