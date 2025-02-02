import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80");
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
  transition: filter 1s ease;
  z-index: -1;
`;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 90%;
  width: 400px;
  backdrop-filter: blur(8px);
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: normal;
`;

const TimeButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background: #2c3e50;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #34495e;
    transform: translateY(-2px);
  }
`;

const CustomTime = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  font-size: 1rem;
`;

const TimerScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const TimeDisplay = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: #2c3e50;
  font-family: monospace;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
`;

const ControlButton = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const QuitButton = styled(ControlButton)`
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`;

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (isRunning && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      alert("Study session completed!");
      quitTimer();
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, timeLeft]);

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setShowTimer(true);
    setIsRunning(true);
  };

  const startCustomTimer = () => {
    const minutes = parseInt(document.getElementById("customMinutes").value);
    if (minutes > 0 && minutes <= 120) {
      startTimer(minutes);
    } else {
      alert("Please enter a valid time between 1 and 120 minutes");
    }
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const quitTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setShowTimer(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Background>
      <Container>
        {!showTimer ? (
          <div>
            <Title>Study Timer</Title>
            <TimeButtons>
              <Button onClick={() => startTimer(10)}>10 Minutes</Button>
              <Button onClick={() => startTimer(20)}>20 Minutes</Button>
              <Button onClick={() => startTimer(30)}>30 Minutes</Button>
            </TimeButtons>
            <CustomTime>
              <Input type="number" id="customMinutes" min="1" max="120" placeholder="Custom minutes" />
              <Button onClick={startCustomTimer}>Start Custom Timer</Button>
            </CustomTime>
          </div>
        ) : (
          <TimerScreen>
            <TimeDisplay>{formatTime(timeLeft)}</TimeDisplay>
            <Controls>
              <ControlButton onClick={toggleTimer}>{isRunning ? "⏸" : "▶"}</ControlButton>
              <QuitButton onClick={quitTimer}>✕</QuitButton>
            </Controls>
          </TimerScreen>
        )}
      </Container>
    </Background>
  );
};

export default StudyTimer;
