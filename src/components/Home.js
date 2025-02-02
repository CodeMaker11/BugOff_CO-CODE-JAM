import React from "react";
//import "../style.css";
// import Hero from './Hero';
import CourseButton from './CourseButton';

export default function EdSpire() {
  return (
    <div className="container">
      <header className="header">
        <nav>
          <div className="logo">EdSpire</div>
        </nav>
      </header>

      <main className="main">
        <div className="hero">
          <h1>Welcome to EdSpire</h1>
          <p>Where Traditional Learning Meets Modern Technology</p>
        </div>

        <div className="courses-grid">
          <CourseButton title="Course Review" description="Break down your course content" link="/cafe" />
          <CourseButton title="Study Timer" description="Time to lock in!" link="/timer" />
          <CourseButton title="Test yourself" description="Generate flashcards" link="/flashcard" />
          <CourseButton title="About us" description="Know more about EdSpire!" link="/about"/>
        </div>
      </main>

      <footer className="footer">
        <div className="grass-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grass"></div>
          ))}
        </div>
      </footer>
    </div>
  );
}


