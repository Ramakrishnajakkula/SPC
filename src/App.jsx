import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "./contexts/themeContext.jsx";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateSeason from "./components/VideoManagement";
import Hackathon from "./components/Hackathon";
import HackathonCreate from "./components/HackathonCreate";
import HackathonDetails from "./components/HackathonDetails";
import HackathonRegister from "./components/HackathonRegister";
import HackathonRegistrationEdit from "./components/HackathonRegistrationEdit";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}>
            <Navigation />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/VideoManagement" element={<CreateSeason />} />
                <Route path="/hackathon" element={<Hackathon />} />
                <Route path="/hackathon/create" element={<HackathonCreate />} />
                <Route path="/hackathon/:id" element={<HackathonDetails />} />
                <Route
                  path="/hackathon/:hackathonId/register"
                  element={<HackathonRegister />}
                />
                <Route
                  path="/hackathon/registration/:registrationId"
                  element={<HackathonRegistrationEdit />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
