import React, { memo } from 'react';
import styled from 'styled-components';
import { FiSun, FiMoon, FiGithub } from 'react-icons/fi';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const LeftSection = styled(Section)`
  justify-content: flex-start;
`;

const MiddleSection = styled(Section)`
  justify-content: center;
`;

const RightSection = styled(Section)`
  justify-content: flex-end;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

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
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.div`
  font-size: 16px;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #ff7e5f;
  }

  svg {
    margin-right: 5px;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff7e5f;
  }
`;

const Footer = memo(({ toggleTheme, theme }) => {
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
          <center>Built by{' '}</center>
          <SocialLink
            href="https://github.com/CeponisM/Resume-App"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub /> MCeponis
          </SocialLink>
        </Text>
      </MiddleSection>
      <RightSection>
        <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </ToggleButton>
      </RightSection>
    </FooterContainer>
  );
});

export default Footer;