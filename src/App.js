import React, { useState } from 'react';
import './App.css';
import Login from "../src/components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Utilise Routes au lieu de Route
import Interface from "./components/Interface/Interface";

function App() {
  const [display, setDisplay] = useState(<Login />);

  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Login />} /> 
        <Route path="/Interface/Interface" element={<Interface />} /> 
      </Routes>
    </Router>
  );
}

export default App;
