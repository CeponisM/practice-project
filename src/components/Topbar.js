import React, { useState } from 'react';
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
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  position: absolute;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};

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

const Option = styled.div`
  margin-left: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const MenuButton = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
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
  font-size: 16px;
`;

const DropdownMenu = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  left: 20px;
  background-color: ${({ theme }) => theme.background};
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

const Topbar = ({ scrollToSection, toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <TopbarContainer>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
        <FiMenu size={24} />
      </MenuButton>
      <Logo>Logo</Logo>
      <Options>
        <Option onClick={() => scrollToSection('section1')}>Option 1</Option>
        <Option onClick={() => scrollToSection('section2')}>Option 2</Option>
        <Option onClick={() => scrollToSection('section3')}>Option 3</Option>
      </Options>
      <RightButtons>
        <ScrollButton onClick={() => scrollToSection('section3')}>Join Our WaitList</ScrollButton>
        <Button onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </Button>
      </RightButtons>
      <DropdownMenu open={menuOpen}>
        <DropdownOption onClick={() => scrollToSection('section1')}>Option 1</DropdownOption>
        <DropdownOption onClick={() => scrollToSection('section2')}>Option 2</DropdownOption>
        <DropdownOption onClick={() => scrollToSection('section3')}>Option 3</DropdownOption>
      </DropdownMenu>
    </TopbarContainer>
  );
};

export default Topbar;
