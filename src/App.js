import React, { useState, useEffect, useCallback } from 'react';
import Topbar from './components/Topbar';
import Pad from './components/Pad';
import Footer from './components/Footer';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { Link as ScrollLink, scroller } from 'react-scroll';

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
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const Section = styled.div`
  height: auto;
  padding: 60px 0;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Section1 = styled(Section)`
  background: ${({ gradient }) => gradient};
  transition: background-color 0.5s ease, color 0.5s ease, border 0.5s ease;
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow: hidden;
  margin-top: 4.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ gradientOverlay }) => gradientOverlay};
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 2;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 3;
`;

const MainHeader = styled.h1`
  position: relative;
  font-size: 3em;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
  font-family: 'Merriweather', serif;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-color 0.5s ease, color 0.5s ease;

  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    color: ${({ theme }) => theme === lightTheme ? '#000000' : '#ffffff'};
    filter: blur(3px);
    transform: scale(1.05);
  }
`;

const Header = styled.h1`
  position: relative;
  font-size: 3em;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
  font-family: 'Merriweather', serif;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-color 0.5s ease, color 0.5s ease;

  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    color: ${({ theme }) => theme === lightTheme ? '#000000' : '#ffffff'};
    filter: blur(3px);
    transform: scale(1.05);
  }
`;

const Description = styled.p`
  font-size: 1.2em;
  margin: 20px 0;
  max-width: 800px;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;
`;

const SubSectionContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 40px 0;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubSection = styled.div`
  flex: 1;
  margin: 20px;
  padding: 30px;
  border-radius: 15px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid;
  border-image-slice: 1;
  border-width: 3px;
  border-image-source: ${({ theme }) => theme === lightTheme
    ? 'linear-gradient(to right, #ff7e5f, #feb47b)'
    : 'linear-gradient(to right, #434343, #282828)'};
  display: flex;
  flex-direction: column;
  transition: background 0.5s ease, background-color 0.5s ease, color 0.5s ease, border-image-source 0.5s ease, border 0.5s ease;

  @media (max-width: 768px) {
    margin: 10px 0;
    border-right: 1px solid ${({ theme }) => theme.text};
  }
`;

const SubHeader = styled.h2`
  font-size: 2.2em;
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.background};
  transition: background 0.5s ease, border-image-source 0.5s ease, border 0.5s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid;
  border-image-slice: 1;
  border-width: 2px;
  border-image-source: ${({ theme }) => theme === lightTheme
    ? 'linear-gradient(to right, #ff7e5f, #feb47b)'
    : 'linear-gradient(to right, #434343, #282828)'};
  flex: 1;
`;


const FeatureIcon = styled.div`
  font-size: 2.5em;
  margin-right: 20px;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const FeatureHeading = styled.h3`
  font-size: 1.8em;
  margin: 0;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;
`;

const FeatureDescription = styled.p`
  font-size: 1.1em;
  margin: 0;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;
  flex: 1;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 40px 0;
  padding: 30px;
  border-radius: 15px;
  background: ${({ theme }) => theme.background};
  transition: background-color 0.5s ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.2em;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
  transition: color 0.5s ease;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  font-size: 1em;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.5s ease, color 0.5s ease, border 0.5s ease;
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  font-size: 1em;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.5s ease, color 0.5s ease, border 0.5s ease;
  resize: vertical;
`;

const Select = styled.select`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  font-size: 1em;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.5s ease, color 0.5s ease, border 0.5s ease;
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
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

const rainbowTextAnimation = keyframes`
  0% {
    background-position: 200% 50%;
  }
  100% {
    background-position: 0% 50%;
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

  span {
    display: inline-block;
    background: linear-gradient(270deg, #ff7e5f, #feb47b);
    -webkit-background-clip: text;
    transition: background 0.2s;
  }

  &:hover span {
    background: linear-gradient(to right, white, white, #feb47b);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${rainbowTextAnimation} 3s linear infinite;
  }
`;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [gradient, setGradient] = useState(
    'radial-gradient(circle, #ffffff, #a1c4fd, #c2e9fb)'
  );
  const [gradientOverlay, setGradientOverlay] = useState(
    'linear-gradient(135deg, rgba(255, 0, 150, 0.3), rgba(0, 204, 255, 0.3))'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateGradient = useCallback(() => {
    const scrollPosition = window.scrollY;
    const scrollFactor = scrollPosition / (document.body.scrollHeight - window.innerHeight);
    const gradientLight = `radial-gradient(circle at 50% ${18 + scrollFactor * 300}%, #ffffff, #a1c4fd, #c2e9fb)`;
    const gradientDark = `radial-gradient(circle at 50% ${18 + scrollFactor * 300}%, #000000, #434343, #282828)`;
    const gradientOverlayLight = `linear-gradient(135deg, rgba(255, 0, 150, 0.3), rgba(0, 204, 255, 0.3))`;
    const gradientOverlayDark = `linear-gradient(135deg, rgba(255, 0, 150, 0.2), rgba(0, 204, 255, 0.2))`;
    setGradient(theme === 'light' ? gradientLight : gradientDark);
    setGradientOverlay(theme === 'light' ? gradientOverlayLight : gradientOverlayDark);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      updateGradient();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateGradient]);

  useEffect(() => {
    updateGradient();
  }, [updateGradient]);

  // Check browser dark/light color scheme upon entry
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDarkScheme ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 600,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Topbar scrollToSection={scrollToSection} toggleTheme={toggleTheme} theme={theme} />
      <AppContainer>
        <Section1 id="section1" gradient={gradient} gradientOverlay={gradientOverlay}>
          <ContentContainer>
            <ScrollLink to="section3" smooth="easeInOutQuart" duration={600}><ScrollButton><span>Join Our WaitList</span></ScrollButton></ScrollLink>
            <MainHeader data-text="Explore and Reserve Activities">Explore and Reserve <h1>Activities</h1></MainHeader>
            <Pad />
          </ContentContainer>
        </Section1>
        <Section id="section2">
          <Header>Highlights</Header>
          <Description>
            We offer a range of features tailored to your needs. Vendors can utilize tools to attract customers and manage bookings effectively. Individuals looking to book services can access various tools to find the perfect match for their occasion.
          </Description>
          <SubSectionContainer>
            <SubSection>
              <SubHeader>Planners</SubHeader>
              <FeatureList>
                {/* Organizer Feature 1 */}
                <FeatureItem>
                  <FeatureIcon>🔍</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Planner Discovery</FeatureHeading>
                    <FeatureDescription>Effortlessly explore a wide variety of vendors offering services like wedding planning, photography, catering, entertainment, and more. View profiles, portfolios, and reviews to find the ideal match for your event requirements.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* Organizer Feature 2 */}
                <FeatureItem>
                  <FeatureIcon>📅</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Reservations and Scheduling</FeatureHeading>
                    <FeatureDescription>Easily secure your preferred vendors through the app, selecting your ideal dates, times, and services. Get immediate booking confirmations and timely reminders, ensuring a smooth and organized planning experience.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* Organizer Feature 3 */}
                <FeatureItem>
                  <FeatureIcon>🧩</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Tailored Suggestions</FeatureHeading>
                    <FeatureDescription>Receive bespoke vendor recommendations tailored to your event type, preferences, and budget. Our advanced algorithm meticulously analyzes your requirements, offering the perfect vendors to match your unique needs.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* Organizer Feature 4 */}
                <FeatureItem>
                  <FeatureIcon>💳</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Reliable Payment Handling</FeatureHeading>
                    <FeatureDescription>Experience worry-free transactions with our secure, in-app payment processing. Effortlessly manage all payments and bookings, guaranteeing a seamless and hassle-free experience from start to finish.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* Organizer Feature 5 */}
                <FeatureItem>
                  <FeatureIcon>✉️</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Instant Messaging</FeatureHeading>
                    <FeatureDescription>Connect with vendors instantly through our real-time messaging system. Effortlessly ask questions, discuss specifics, and finalize details, ensuring clear and efficient communication every step of the way.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>
              </FeatureList>
            </SubSection>
            <SubSection>
              <SubHeader>Patrons</SubHeader>
              <FeatureList>
                {/* User Feature 1 */}
                <FeatureItem>
                  <FeatureIcon>🛠️</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Account Setup and Maintenance</FeatureHeading>
                    <FeatureDescription>Showcase your unique offerings by creating and managing a detailed vendor profile. Highlight your services, portfolio, pricing, availability, and contact information. Customize your profile to attract potential clients and stand out from the competition.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* User Feature 2 */}
                <FeatureItem>
                  <FeatureIcon>📋</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Reservation Management</FeatureHeading>
                    <FeatureDescription>Through the app, effortlessly handle all bookings, monitor upcoming appointments, and keep track of client inquiries. Maintain organization and swiftly respond to client needs, providing a seamless journey from inquiry to confirmed booking.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* User Feature 3 */}
                <FeatureItem>
                  <FeatureIcon>📆</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Scheduling Calendar</FeatureHeading>
                    <FeatureDescription>Take control of your schedule with our integrated calendar feature. Set your availability, block off unavailable dates, and efficiently manage bookings to maximize your time and resources. Stay organized and optimize your workflow effortlessly.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* User Feature 4 */}
                <FeatureItem>
                  <FeatureIcon>⭐</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Testimonials and Ratings</FeatureHeading>
                    <FeatureDescription>Actively monitor and respond to client reviews and ratings to foster trust and maintain a stellar reputation. Highlight positive testimonials and address any issues promptly, ensuring continuous improvement in your services.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>

                {/* User Feature 5 */}
                <FeatureItem>
                  <FeatureIcon>📢</FeatureIcon>
                  <FeatureContent>
                    <FeatureHeading>Advertising and Promotion Tools</FeatureHeading>
                    <FeatureDescription>Enhance your visibility and draw in more clients with our comprehensive marketing and promotion tools. Utilize targeted ads, featured listings, promotional campaigns, and strategic in-app partnerships to effectively showcase your services to a wider audience.</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>
              </FeatureList>
            </SubSection>
          </SubSectionContainer>
        </Section>

        <Section id="section3">
          <Header>Join the Waitlist</Header>
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