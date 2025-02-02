import React from 'react';
//import '../style.css';

const CourseButton = ({ title, description, link }) => {
  return (
    <a href={link} className="course-button">
      <div className="button-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
};

export default CourseButton;