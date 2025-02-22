import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import MapComponent from "./components/MapComponent";
import Logo from "./components/Logo";

function HomePage() {
  return (
<div className="min-h-screen flex flex-col items-center justify-center text-center text-white">
      {/* Floating Logo */}
      <Logo />

      {/* Headings */}
      <h1 className="text-5xl font-bold mt-6">Welcome to HiddenGem!</h1>
      <p className="text-lg text-gray-300 mt-2">
        Discover events near you and keep your weekly streak going!
      </p>

      {/* CTA Button */}
      <Link to="/map">
        <button className="mt-8 bg-gray-200 text-black px-6 py-3 rounded-full shadow-md hover:bg-gray-300 transition">
          Start Exploring Now :D
        </button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
