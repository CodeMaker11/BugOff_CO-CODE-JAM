import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  max-width: 800px;
  width: 100%;
`;

const UploadSection = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const UploadButton = styled.label`
  display: inline-block;
  background: #8b4513;
  color: #fff;
  padding: 12px 24px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #693410;
  }
`;

const MenuCard = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
  background: #fff;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CafeName = styled.h1`
  font-size: 2.5rem;
  color: #8b4513;
  margin-bottom: 1rem;
  font-family: "Playfair Display", serif;
`;

const MenuSection = styled.div`
  margin: 2rem 0;
  text-align: left;

  h2 {
    color: #8b4513;
    border-bottom: 2px solid #8b4513;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: #333;

  .price {
    color: #8b4513;
    font-weight: bold;
  }
`;

const Analysis = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Cafe = () => {
  const [pastPapersUploaded, setPastPapersUploaded] = useState(false);
  const [syllabusUploaded, setSyllabusUploaded] = useState(false);

  const handleUpload = (type) => {
    if (type === "pastPapers") setPastPapersUploaded(true);
    if (type === "syllabus") setSyllabusUploaded(true);
  };

  const isMenuActive = pastPapersUploaded && syllabusUploaded;

  return (
    <Container>
      <UploadSection>
        <h2>Welcome to EdSpire Cafe</h2>
        <p>Please upload the required documents to view our menu</p>
        <UploadButton>
          Upload Past Papers (ZIP)
          <HiddenInput type="file" accept=".zip" onChange={() => handleUpload("pastPapers")} />
        </UploadButton>
        <UploadButton>
          Upload Syllabus (PDF)
          <HiddenInput type="file" accept=".pdf" onChange={() => handleUpload("syllabus")} />
        </UploadButton>
      </UploadSection>

      {isMenuActive && (
        <>
          <MenuCard active={isMenuActive}>
            <CafeName>EdSpire Cafe</CafeName>

            <MenuSection>
              <h2>Teacher's Favorites</h2>
              <MenuItem>
                <span>It's very important to know which topics are quizzed regularly</span>
                <span className="price">$8.95</span>
              </MenuItem>
              <MenuItem>
                <span>It gives us an edge while studying</span>
                <span className="price">$10.95</span>
              </MenuItem>
            </MenuSection>

            <MenuSection>
              <h2>Student's Favourites</h2>
              <MenuItem>
                <span>We at EdSpire analyze the past papers and syllabus for you</span>
                <span className="price">$9.95</span>
              </MenuItem>
              <MenuItem>
                <span>and give you this much-desired edge</span>
                <span className="price">$11.95</span>
              </MenuItem>
            </MenuSection>

            <MenuSection>
              <h2>Perks</h2>
              <MenuItem>
                <span>Enjoy the analysis below</span>
                <span className="price">$5.95</span>
              </MenuItem>
              <MenuItem>
                <span>and use it to your advantage</span>
                <span className="price">$2.95</span>
              </MenuItem>
            </MenuSection>
          </MenuCard>

          <Analysis active={isMenuActive}>
            <h2>Document Analysis</h2>
            <p>Your uploaded documents have been processed successfully!</p>
            <div>
              <p>Past Papers Analysis:</p>
              <ul>
                <li>Total papers: 5</li>
                <li>Topics covered: 8</li>
                <li>Difficulty level: Moderate</li>
              </ul>
              <p>Syllabus Coverage:</p>
              <ul>
                <li>Chapters: 12</li>
                <li>Practical sections: 4</li>
                <li>Reference materials: 3</li>
              </ul>
            </div>
          </Analysis>
        </>
      )}
    </Container>
  );
};

export default Cafe;
