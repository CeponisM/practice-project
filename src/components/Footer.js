import React from 'react';
import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';

import './Footer.css';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.text};
  bottom: 0;
  left: 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
`;

const Text = styled.div`
  font-size: 16px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 24px;
`;

const Footer = ({ toggleTheme, theme }) => {
  return (
    <FooterContainer>
      <LeftSection>
        <Logo>Logo</Logo>
        <Text>Built by <a href="https://github.com/CeponisM/Resume-App" target="_blank" rel="noopener noreferrer" className="social-link-footer">MCeponis</a>.</Text>
      </LeftSection>
      <RightSection>
        <ToggleButton onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </ToggleButton>
      </RightSection>
    </FooterContainer>
  );
};

export default Footer;
