import React, { useState, useEffect } from 'react';
import Topbar from './components/Topbar';
import Pad from './components/Pad';
import Footer from './components/Footer';
import styled, { ThemeProvider, keyframes } from 'styled-components';

const scrollAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
};

const AppContainer = styled.div`
  margin-top: 48px;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const Section = styled.div`
  height: auto;
  padding: 40px 0;
  border: 1px solid ${({ theme }) => theme.text};
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  font-size: 1.2em;
  margin: 20px 0;
  max-width: 800px;
  color: ${({ theme }) => theme.text};
`;

const SubSectionContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubSection = styled.div`
  flex: 1;
  margin: 20px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 10px;
  background: ${({ theme }) => theme.background};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;

  &:not(:last-child) {
    border-right: none;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    border-right: 1px solid ${({ theme }) => theme.text};
    &:not(:last-child) {
      border-right: none;
    }
  }
`;

const SubHeader = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 10px;
  background: ${({ theme }) => theme.background};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
`;

const FeatureIcon = styled.div`
  font-size: 2em;
  margin-right: 20px;
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeatureHeading = styled.h3`
  font-size: 1.5em;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const FeatureDescription = styled.p`
  font-size: 1em;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 10px;
  background: ${({ theme }) => theme.background};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
`;

const FormHeader = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  font-size: 1em;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  font-size: 1em;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  resize: vertical;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  font-size: 1em;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background: linear-gradient(270deg, #ff7e5f, #feb47b);
  background-size: 400% 400%;
  color: white;
  animation: ${scrollAnimation} 5s ease infinite;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ScrollButton = styled.button`
  padding: 10px 20px;
  margin: 90px 0px 45px 0px;
  font-size: 1.2em;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background: linear-gradient(270deg, #ff7e5f, #feb47b);
  background-size: 400% 400%;
  color: white;
  animation: ${scrollAnimation} 5s ease infinite;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Topbar scrollToSection={scrollToSection} toggleTheme={toggleTheme} theme={theme} />
      <AppContainer>
        <Section id="section1">
          <ScrollButton onClick={() => scrollToSection('section3')}>Join Our WaitList</ScrollButton>
          <Header>Discover and Book Experiences</Header>
          <Pad />
        </Section>
        <Section id="section2">
          <Header>Features</Header>
          <Description>
            There are an array of features targeted for your use case. If you're a vendor, you'll be able to use tools to attract customers and manage your bookings. If you're a person looking to book someone, you'll be able to use various tools to ensure you find the right person for the occasion.
          </Description>
          <SubSectionContainer>
            <SubSection>
              <SubHeader>Organizers</SubHeader>
              <FeatureList>
                {Array.from({ length: 5 }, (_, i) => (
                  <FeatureItem key={i}>
                    <FeatureIcon>🔧</FeatureIcon>
                    <FeatureContent>
                      <FeatureHeading>Feature {i + 1}</FeatureHeading>
                      <FeatureDescription>This is a description for feature {i + 1}.</FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>
                ))}
              </FeatureList>
            </SubSection>
            <SubSection>
              <SubHeader>Users</SubHeader>
              <FeatureList>
                {Array.from({ length: 5 }, (_, i) => (
                  <FeatureItem key={i}>
                    <FeatureIcon>💼</FeatureIcon>
                    <FeatureContent>
                      <FeatureHeading>Feature {i + 1}</FeatureHeading>
                      <FeatureDescription>This is a description for feature {i + 1}.</FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>
                ))}
              </FeatureList>
            </SubSection>
          </SubSectionContainer>
        </Section>

        <Section id="section3">
          <FormHeader>Join the Waitlist</FormHeader>
          <FormContainer>
            <FormField>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" type="text" required />
            </FormField>
            <FormField>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" type="text" />
            </FormField>
            <FormField>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required />
            </FormField>
            <FormField>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input id="phoneNumber" name="phoneNumber" type="tel" required />
            </FormField>
            <FormField>
              <Label htmlFor="purpose">What are you here for? *</Label>
              <Select id="purpose" name="purpose" required>
                <option value="organizer">Organizer</option>
                <option value="customer">Customer</option>
                <option value="other">Other</option>
              </Select>
            </FormField>
            <FormField>
              <Label htmlFor="additionalThoughts">Additional Thoughts or Questions</Label>
              <TextArea id="additionalThoughts" name="additionalThoughts" rows="4" />
            </FormField>
            <SubmitButton type="submit">Submit</SubmitButton>
          </FormContainer>
        </Section>
      </AppContainer>
      <Footer toggleTheme={toggleTheme} theme={theme} />
    </ThemeProvider>
  );
};

export default App;