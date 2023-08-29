import './App.css';
import '../src/components/Interface/Profil/Profil.css'
import '../src/components/Interface/Feeds/Feeds.css'
import '../src/components/Interface/CreatePost/Post.css'
import Login from "../src/components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Interface from "./components/Interface/Interface";
import { useEffect, useState } from 'react';

function App() {
  const [userSession, setUserSession] = useState(localStorage.getItem('user'));
  const [posts, setposts] = useState(JSON.parse(localStorage.getItem('posts')));

  useEffect(()=>{
    localStorage.setItem('posts', JSON.stringify(posts));
  },[posts])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login userSession={userSession} setUserSession={setUserSession} />} />
        <Route path="/Interface/Interface" element={<Interface userSession={userSession} setUserSession={setUserSession} posts={posts} setposts={setposts} />} />
      </Routes>
    </Router>
  );
}

export default App;
