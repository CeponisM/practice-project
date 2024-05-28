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
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Section1 = styled(Section)`
  background: ${({ gradient }) => gradient};
  transition: background 0.2s;
  color: ${({ theme }) => theme.text};
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
  text-align: center;
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
  border-radius: 10px;
  background: ${({ theme }) => theme.background};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
`;

const FormHeader = styled.h2`
  font-size: 2em;
  margin-bottom: 0px;
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
  padding: 15px 30px;
  margin: 12rem 0px 45px 0px;
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
  const [gradient, setGradient] = useState(
    'radial-gradient(circle, #ffffff, #a1c4fd, #c2e9fb)'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateGradient = () => {
    const scrollPosition = window.scrollY;
    const scrollFactor = scrollPosition / (document.body.scrollHeight - window.innerHeight);
    const gradientLight = `radial-gradient(circle at 50% ${18 + scrollFactor * 300}%, #ffffff, #a1c4fd, #c2e9fb)`;
    const gradientDark = `radial-gradient(circle at 50% ${18 + scrollFactor * 300}%, #000000, #434343, #282828)`;
    setGradient(theme === 'light' ? gradientLight : gradientDark);
  };

  const handleScroll = () => {
    updateGradient();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    updateGradient();
  }, [theme]);

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
        <Section1 id="section1" gradient={gradient}>
          <ScrollButton onClick={() => scrollToSection('section3')}>Join Our WaitList</ScrollButton>
          <Header>Discover and Book <h1>Experiences</h1></Header>
          <Pad />
        </Section1>
        <Section id="section2">
          <Header>Features</Header>
          <Description>
            There are an array of features targeted for your use case. If you're a vendor, you'll be able to use tools to attract customers and manage your bookings. If you're a person looking to book someone, you'll be able to use various tools to ensure you find the right person for the occasion.
          </Description>
          <SubSectionContainer>
            <SubSection>
              <SubHeader>Organizers</SubHeader>
              <FeatureList>
                {/* Organizer Feature 1 */}
                <FeatureItem>
                  <FeatureIcon>🔧</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Organizer Discovery</FeatureHeading>
                    <FeatureDescription>Easily discover a diverse range of vendors for various services such as wedding planning, photography, catering, entertainment, and more. Browse through profiles, portfolios, and reviews to find the perfect match for your event needs.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* Organizer Feature 2 */}
                <FeatureItem>
                  <FeatureIcon>🔧</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Booking and Scheduling</FeatureHeading>
                    <FeatureDescription>Seamlessly book vendors directly through the app, selecting preferred dates, times, and services. Receive instant booking confirmations and reminders to stay organized throughout the planning process.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* Organizer Feature 3 */}
                <FeatureItem>
                  <FeatureIcon>🔧</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Personalized Recommendations</FeatureHeading>
                    <FeatureDescription>Receive personalized vendor recommendations based on your event type, preferences, and budget. Our smart algorithm analyzes your requirements to suggest the most suitable vendors for your specific needs.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* Organizer Feature 4 */}
                <FeatureItem>
                  <FeatureIcon>🔧</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Secure Payment Processing</FeatureHeading>
                    <FeatureDescription>Enjoy peace of mind with secure payment processing integrated within the app. Easily handle transactions and payments for vendor bookings, ensuring a smooth and hassle-free experience.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* Organizer Feature 5 */}
                <FeatureItem>
                  <FeatureIcon>🔧</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Real-Time Communication</FeatureHeading>
                    <FeatureDescription>Communicate directly with vendors in real-time through the app's messaging system. Ask questions, discuss details, and finalize arrangements with ease, ensuring clear and efficient communication throughout the planning process.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>
              </FeatureList>
            </SubSection>
            <SubSection>
              <SubHeader>Users</SubHeader>
              <FeatureList>
                  {/* User Feature 1 */}
                  <FeatureItem>
                    <FeatureIcon>💼</FeatureIcon>
                    <FeatureContent>
                      <FeatureHeading>Profile Creation and Management</FeatureHeading>
                      <FeatureDescription>Create and manage a comprehensive vendor profile showcasing your services, portfolio, pricing, availability, and contact information. Customize your profile to attract potential clients and showcase your unique offerings.</FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>

                  {/* User Feature 2 */}
                  <FeatureItem>
                    <FeatureIcon>💼</FeatureIcon>
                    <FeatureContent>
                      <FeatureHeading>Booking Management</FeatureHeading>
                      <FeatureDescription>Efficiently manage bookings, view upcoming appointments, and track client inquiries through the app. Stay organized and responsive to client needs, ensuring a seamless experience from inquiry to booking.</FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>

                  {/* User Feature 3 */}
                  <FeatureItem>
                    <FeatureIcon>💼</FeatureIcon>
                    <FeatureContent>
                      <FeatureHeading>Availability Calendar</FeatureHeading>
                      <FeatureDescription>Set and manage your availability with an integrated calendar feature. Keep track of your schedule, block off unavailable dates, and manage bookings effectively to optimize your time and resources.</FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>

                  {/* User Feature 4 */}
                  <FeatureItem>
                    <FeatureIcon>💼</FeatureIcon>
                    <FeatureContent>
                      <FeatureHeading>Review and Rating Management</FeatureHeading>
                      <FeatureDescription>Monitor and respond to client reviews and ratings to maintain a positive reputation and build trust with potential clients. Showcase positive feedback and address any concerns or feedback to continuously improve your services.</FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>

                  {/* User Feature 5 */}
                  <FeatureItem>
                    <FeatureIcon>💼</FeatureIcon>
                    <FeatureContent>
                      <FeatureHeading>Marketing and Promotion Tools</FeatureHeading>
                      <FeatureDescription>Access marketing and promotion tools to increase visibility and attract more clients. Promote your services through featured listings, targeted advertisements, promotional campaigns, and partnerships within the app to reach a wider audience.</FeatureDescription>
                    </FeatureContent>
                  </FeatureItem>
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