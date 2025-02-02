import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Styled Components (Only for About Page)
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?auto=format&fit=crop&q=80') center/cover fixed;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4A90E2;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #4A90E2;
    color: white;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #4A90E2;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TextSection = styled.div`
  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    font-size: 1.1rem;
  }
`;

const Footer = styled.footer`
  height: 100px;
  background: #2ECC71;
  position: relative;
  overflow: hidden;
  margin-top: auto;
`;

const sway = keyframes`
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
`;

const Grass = styled.div`
  position: absolute;
  bottom: 0;
  width: 33.33%;
  height: 60px;
  background: #27AE60;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
  animation: ${sway} 3s ease-in-out infinite;

  &:nth-child(1) { left: 0%; animation-delay: 0s; }
  &:nth-child(2) { left: 33.33%; animation-delay: 0.3s; }
  &:nth-child(3) { left: 66.66%; animation-delay: 0.6s; }
`;

const About = () => {
  return (
    <Container>
      <Header>
        <Nav>
          <HomeLink to="/">&larr; Back to Home</HomeLink>
          <Logo>EdSpire</Logo>
        </Nav>
      </Header>

      <Main>
        <ContentWrapper>
          <Title>About Us</Title>
          <AboutContent>
            <ImageSection>
              <img 
                src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80" 
                alt="Small town school" 
              />
            </ImageSection>
            <TextSection>
              <p>Initiated by Mehika, Ketaki, Dhvani, and Krish, EdSpire is an EduTech platform designed to merge traditional learning with modern techniques. Our mission is to inspire youth and make education engaging.</p>

              <p>Our features, including paper analysis, study timers, and flashcard generation, offer a fresh approach to learning. We aim to enhance student efficiency and make study sessions more impactful.</p>

              <p>Experience the future of learning with EdSpire’s unique features and tools. Join us in redefining education through innovation and inspiration. For inquiries, contact us at <a href="mailto:EdSpire@gmail.com">EdSpire@gmail.com</a>.</p>
            </TextSection>
          </AboutContent>
        </ContentWrapper>
      </Main>

      <Footer>
        <Grass />
        <Grass />
        <Grass />
      </Footer>
    </Container>
  );
};

export default About;
