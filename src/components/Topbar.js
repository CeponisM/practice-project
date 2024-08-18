import React, { useState, useCallback, memo } from 'react';
import styled from 'styled-components';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';

const TopbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  transition: background 0.3s ease, color 0.3s ease;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(360deg);
  }
`;

const Logo = styled.div`
  position: absolute;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Option = memo(styled.div`
  margin-left: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  transition: color 0.3s ease;
  &:hover {
    color: #ff7e5f;
  }
`);

const MenuButton = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
    transition: color 0.5s ease;
  }
`;

const RightButtons = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
`;

const Button = styled.button`
  margin-left: 20px;
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;
  font-size: 16px;
  &:hover {
    color: #ff7e5f;
  }
`;

const DropdownMenu = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  left: 20px;
  background-color: ${({ theme }) => theme.background};
  transition: color 0.5s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1001;

  @media (min-width: 769px) {
    display: none;
  }
`;

const DropdownOption = styled.div`
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
  }
`;

const ScrollButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background: linear-gradient(270deg, #ff7e5f, #feb47b);
  background-size: 400% 400%;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 786px) {
    transform: scale(0.9);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Topbar = memo(({ scrollToSection, toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => setMenuOpen(prev => !prev), []);
  const handleScrollToSection = useCallback((section) => () => scrollToSection(section), [scrollToSection]);

  return (
    <TopbarContainer>
      <MenuButton onClick={handleMenuToggle}>
        <FiMenu size={24} />
      </MenuButton>
      <LogoContainer>
        <LogoIcon>P</LogoIcon>
        <LogoText>Portfolio</LogoText>
      </LogoContainer>
      <Options>
        <Option onClick={handleScrollToSection('section1')}>Option 1</Option>
        <Option onClick={handleScrollToSection('section2')}>Option 2</Option>
        <Option onClick={handleScrollToSection('section3')}>Option 3</Option>
      </Options>
      <RightButtons>
        <ScrollButton onClick={handleScrollToSection('section3')}>Join Our WaitList</ScrollButton>
        <Button onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </Button>
      </RightButtons>
      <DropdownMenu open={menuOpen}>
        <DropdownOption onClick={handleScrollToSection('section1')}>Option 1</DropdownOption>
        <DropdownOption onClick={handleScrollToSection('section2')}>Option 2</DropdownOption>
        <DropdownOption onClick={handleScrollToSection('section3')}>Option 3</DropdownOption>
      </DropdownMenu>
    </TopbarContainer>
  );
});

export default Topbar;
