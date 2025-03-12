import React, { useState, useCallback, memo, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiMenu, FiSun, FiMoon, FiX } from 'react-icons/fi';

// Performance optimization: Define animations outside component
const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 4px 15px rgba(255, 126, 95, 0.2);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 6px 25px rgba(255, 126, 95, 0.4);
    transform: scale(1.02);
  }
`;

const TopbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.text}20;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px 20px;
  box-shadow: 0 2px 20px ${({ theme }) => theme.text}10;
  z-index: 1000;
  animation: ${slideInDown} 0.6s ease-out;
  
  // Dark mode specific styles
  ${({ theme }) => theme.mode === 'dark' && css`
    background-color: ${theme.background}f0;
    border-bottom-color: ${theme.text}30;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  `}

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 10px 15px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    
    &:hover {
      transform: translateX(-50%) translateY(-2px);
    }
  }
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  background: linear-gradient(45deg, #ff7e5f, #feb47b, #ff7e5f);
  background-size: 200% 200%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &:hover {
    animation: ${rotateAnimation} 0.6s ease-in-out;
    transform: scale(1.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff7e5f, #feb47b, #ff7e5f);
    background-size: 200% 200%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: ${gradientShift} 3s ease infinite;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #ff7e5f, #feb47b, #ff7e5f);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${gradientShift} 4s ease infinite;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 2px 4px rgba(255, 126, 95, 0.3));
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Option = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
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
    box-shadow: 0 4px 15px rgba(255, 126, 95, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MenuButton = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      background: rgba(255, 126, 95, 0.1);
      color: #ff7e5f;
      transform: scale(1.1);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
`;

const RightButtons = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  gap: 12px;
  
  @media (max-width: 768px) {
    right: 15px;
  }
`;

const ThemeButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

const ScrollButton = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background: linear-gradient(270deg, #ff7e5f, #feb47b, #ff7e5f);
  background-size: 300% 300%;
  color: white;
  box-shadow: 0 4px 15px rgba(255, 126, 95, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${gradientShift} 3s ease infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 126, 95, 0.4);
    animation: ${pulseGlow} 2s ease infinite;
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 786px) {
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: absolute;
  top: 60px;
  left: 20px;
  background-color: ${({ theme }) => theme.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.text}20;
  border-radius: 12px;
  box-shadow: 0 8px 32px ${({ theme }) => theme.text}20;
  padding: 8px;
  z-index: 1001;
  min-width: 200px;
  animation: ${slideInUp} 0.3s ease-out;
  
  // Dark mode specific styles
  ${({ theme }) => theme.mode === 'dark' && css`
    background-color: ${theme.background}f0;
    border-color: ${theme.text}30;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  `}

  @media (min-width: 769px) {
    display: none;
  }
`;

const DropdownOption = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
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
    background: rgba(255, 126, 95, 0.1);
    color: #ff7e5f;
    transform: translateX(5px);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateX(0);
  }
`;

// Enhanced mobile overlay
const MobileOverlay = styled.div`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  animation: ${slideInDown} 0.3s ease-out;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Topbar = memo(({ scrollToSection, toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => setMenuOpen(prev => !prev), []);
  
  const handleScrollToSection = useCallback((section) => () => {
    scrollToSection(section);
    setMenuOpen(false); // Close menu after navigation
  }, [scrollToSection]);

  const handleOverlayClick = useCallback(() => setMenuOpen(false), []);

  // Memoize theme icon to prevent unnecessary re-renders
  const themeIcon = useMemo(() => 
    theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />, 
    [theme]
  );

  // Memoize menu icon to prevent unnecessary re-renders
  const menuIcon = useMemo(() => 
    menuOpen ? <FiX size={24} /> : <FiMenu size={24} />, 
    [menuOpen]
  );

  return (
    <>
      <TopbarContainer theme={theme}>
        <MenuButton onClick={handleMenuToggle}>
          {menuIcon}
        </MenuButton>
        
        <LogoContainer>
          <LogoIcon>P</LogoIcon>
          <LogoText>Portfolio</LogoText>
        </LogoContainer>
        
        <Options>
          <Option onClick={handleScrollToSection('section1')}>
            About
          </Option>
          <Option onClick={handleScrollToSection('section2')}>
            Projects
          </Option>
          <Option onClick={handleScrollToSection('section3')}>
            Contact
          </Option>
        </Options>
        
        <RightButtons>
          <ScrollButton onClick={handleScrollToSection('section3')}>
            Join Our WaitList
          </ScrollButton>
          <ThemeButton 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {themeIcon}
          </ThemeButton>
        </RightButtons>
        
        <DropdownMenu $open={menuOpen} theme={theme}>
          <DropdownOption onClick={handleScrollToSection('section1')}>
            About
          </DropdownOption>
          <DropdownOption onClick={handleScrollToSection('section2')}>
            Projects
          </DropdownOption>
          <DropdownOption onClick={handleScrollToSection('section3')}>
            Contact
          </DropdownOption>
        </DropdownMenu>
      </TopbarContainer>
      
      <MobileOverlay $open={menuOpen} onClick={handleOverlayClick} />
    </>
  );
});

Topbar.displayName = 'Topbar';

export default Topbar;