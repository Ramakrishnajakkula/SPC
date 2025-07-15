import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "./contexts/themeContext.jsx";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateSeason from "./components/VideoManagement";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import Breadcrumb from "./components/Breadcrumb";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navigation />
            <Breadcrumb />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/VideoManagement" element={<CreateSeason />} />
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
