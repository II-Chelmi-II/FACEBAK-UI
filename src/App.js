import './App.css';
import '../src/components/Interface/Profil/Profil.css'
import Login from "../src/components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Utilise Routes au lieu de Route
import Interface from "./components/Interface/Interface";
import { useState } from 'react';

function App() {

  const [userSession, setUserSession] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login userSession={userSession} setUserSession={setUserSession} />} />
        <Route path="/Interface/Interface" element={<Interface userSession={userSession} setUserSession={setUserSession} />} />
      </Routes>
    </Router>
  );
}

export default App;
