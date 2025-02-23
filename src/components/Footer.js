import React, { memo, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiSun, FiMoon, FiGithub } from 'react-icons/fi';

// Performance optimization: Define animations outside component to prevent recreation
const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const slideUpAnimation = keyframes`
  from { 
    transform: translateY(10px); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
`;

const gradientShiftAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Performance optimization: Use will-change sparingly and only when needed
const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.text};
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  // Add subtle backdrop blur effect
  backdrop-filter: blur(10px);
  
  // Dynamic background pattern
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(255, 126, 95, 0.1), 
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  animation: ${slideUpAnimation} 0.6s ease-out;
`;

const LeftSection = styled(Section)`
  justify-content: flex-start;
  animation-delay: 0.1s;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MiddleSection = styled(Section)`
  justify-content: center;
  animation-delay: 0.2s;
`;

const RightSection = styled(Section)`
  justify-content: flex-end;
  animation-delay: 0.3s;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
  }
`;

// Performance optimization: Use transform instead of complex animations for better GPU acceleration
const LogoIcon = styled.div`
  width: 30px;
  height: 30px;
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-right: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(360deg);
  }
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #ff7e5f, #feb47b, #ff7e5f);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${gradientShiftAnimation} 4s ease infinite;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 2px 4px rgba(255, 126, 95, 0.3));
  }
`;

const Text = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

// Performance optimization: Reduce specificity and use efficient selectors
const SocialLink = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: transparent;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 126, 95, 0.1), transparent);
    transition: left 0.3s ease;
  }
  
  &:hover {
    color: #ff7e5f;
    background: rgba(255, 126, 95, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 126, 95, 0.2);
    
    &::before {
      left: 100%;
    }
    
    svg {
      animation: ${pulseAnimation} 1s ease infinite;
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #ff7e5f;
    transform: scale(1.1) rotate(15deg);
  }
  
  &:active {
    transform: scale(0.95) rotate(-15deg);
  }
  
  &:focus-visible {
    outline: 2px solid #ff7e5f;
    outline-offset: 2px;
  }
`;

// Performance optimization: Memoize theme-based styles
const Footer = memo(({ toggleTheme, theme }) => {
  // Memoize icon to prevent unnecessary re-renders
  const themeIcon = useMemo(() => 
    theme === 'light' ? <FiMoon /> : <FiSun />, 
    [theme]
  );

  return (
    <FooterContainer>
      <LeftSection>
        <LogoContainer>
          <LogoIcon>P</LogoIcon>
          <LogoText>Portfolio</LogoText>
        </LogoContainer>
      </LeftSection>
      
      <MiddleSection>
        <Text>
          Built by
          <SocialLink
            href="https://github.com/CeponisM"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-footer"
          >
            <FiGithub />
            MCeponis
          </SocialLink>
        </Text>
      </MiddleSection>
      
      <RightSection>
        <ToggleButton 
          onClick={toggleTheme} 
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {themeIcon}
        </ToggleButton>
      </RightSection>
    </FooterContainer>
  );
});

Footer.displayName = 'Footer';

export default Footer;