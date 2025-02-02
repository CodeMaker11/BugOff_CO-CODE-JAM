import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  text-align: center;
`;

const UploadSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  margin-bottom: 3rem;
`;

const UploadBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border: 2px dashed #4a5568;
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    border-color: #718096;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
`;

const FlashcardContainer = styled.div`
  perspective: 1000px;
  width: 500px;
  height: 300px;
  cursor: pointer;
`;

const Flashcard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  ${({ flipped }) => flipped && 'transform: rotateY(180deg);'}
`;

const FlashcardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const FlashcardBack = styled(FlashcardFace)`
  transform: rotateY(180deg);
`;

const FlashcardApp = () => {
  const [file, setFile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const flashcards = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'Who wrote "To Kill a Mockingbird"?', answer: 'Harper Lee' },
  ];

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  return (
    <Container>
      <UploadSection>
        <h1>Chapter Flashcards</h1>
        <UploadBox onClick={() => document.getElementById('pdfInput').click()}>
          <input type="file" id="pdfInput" accept=".pdf" hidden onChange={handleFileUpload} />
          <div>📚 Drop your chapter PDF here or <strong>browse</strong></div>
        </UploadBox>
        {file && <p>Uploaded: {file.name}</p>}
      </UploadSection>

      <CarouselContainer>
        <button onClick={prevCard}>❮</button>
        <FlashcardContainer onClick={() => setFlipped(!flipped)}>
          <Flashcard flipped={flipped}>
            <FlashcardFace>
              <h2>Question</h2>
              <p>{flashcards[currentIndex].question}</p>
            </FlashcardFace>
            <FlashcardBack>
              <h2>Answer</h2>
              <p>{flashcards[currentIndex].answer}</p>
            </FlashcardBack>
          </Flashcard>
        </FlashcardContainer>
        <button onClick={nextCard}>❯</button>
      </CarouselContainer>
    </Container>
  );
};

export default FlashcardApp;

// this is css combined og is in web2
