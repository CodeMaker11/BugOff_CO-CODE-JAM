import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About'; // If inside "About" folder
import Cafe from './components/Cafe';
import Timer from './components/Timer';
import Flashcard from './components/Flashcard';
import Footer from './components/Footer';



const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cafe" element={<Cafe />} />
      <Route path="/timer" element={<Timer />} />
      <Route path="/flashcard" element={<Flashcard />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;


