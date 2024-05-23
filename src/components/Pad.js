// src/components/Pad.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  perspective: 1000px;
  margin-top: 50px;
`;

const PadContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  padding: 20px;
  background: #222222;
  border: 4px solid #6c6c6c;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px, rgba(0, 0, 0, 0.29) 0px 9px 20px, rgba(0, 0, 0, 0.26) 0px 37px 37px, rgba(0, 0, 0, 0.15) 0px 84px 50px, rgba(0, 0, 0, 0.04) 0px 149px 60px, rgba(0, 0, 0, 0.01) 0px 233px 65px;
  transform: ${({ tiltAngle }) => `rotateX(${tiltAngle}deg)`};
  transform-origin: bottom;
  transition: transform 0.1s;
  backface-visibility: hidden;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    transform: none;
    max-height: 600px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const PadScreen = styled.div`
  background: #f0f0f0;
  border-radius: 20px;
  padding: 20px;
  height: auto;
  overflow-y: auto;
  max-height: 100%;

  @media (max-width: 768px) {
    padding: 10px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const EventItem = styled.li`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 20px;
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  h1 {
    font-size: 1em;
    color: #333;
    margin: 10px 0 5px;
  }

  h2 {
    font-size: 0.8em;
    color: #777;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 0.9em;
      margin: 5px 0;
    }

    h2 {
      font-size: 0.7em;
      margin: 5px 0;
    }
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const CategoryBubble = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.7em;
`;

const events = [
  { title: "Chicago EDM Concert", category: "Music", image: "https://source.unsplash.com/featured/?concert" },
  { title: "Underground Comedy Club", category: "Comedy", image: "https://source.unsplash.com/featured/?comedy" },
  { title: "Rock Music Festival", category: "Festival", image: "https://source.unsplash.com/featured/?festival" },
  { title: "Chicago Golf Tournament", category: "Sports", image: "https://source.unsplash.com/featured/?golf" },
  { title: "Sing Karaoke!", category: "Entertainment", image: "https://source.unsplash.com/featured/?karaoke" },
  { title: "Art Exhibition", category: "Art", image: "https://source.unsplash.com/featured/?art" },
  { title: "Food Truck Festival", category: "Food", image: "https://source.unsplash.com/featured/?foodtruck" },
  { title: "Jazz Night", category: "Music", image: "https://source.unsplash.com/featured/?jazz" },
  { title: "Open Mic Poetry", category: "Poetry", image: "https://source.unsplash.com/featured/?poetry" },
  { title: "Indie Film Screening", category: "Film", image: "https://source.unsplash.com/featured/?film" },
  { title: "Local Farmers Market", category: "Market", image: "https://source.unsplash.com/featured/?market" },
  { title: "Craft Beer Tasting", category: "Drinks", image: "https://source.unsplash.com/featured/?beer" },
  { title: "Tech Meetup", category: "Tech", image: "https://source.unsplash.com/featured/?tech" },
  { title: "Book Reading", category: "Books", image: "https://source.unsplash.com/featured/?books" },
  { title: "Yoga in the Park", category: "Wellness", image: "https://source.unsplash.com/featured/?yoga" },
];

const Pad = () => {
  const [tiltAngle, setTiltAngle] = useState(21);

  useEffect(() => {
    const handleScroll = () => {
      const padElement = document.getElementById('pad');
      if (padElement) {
        const rect = padElement.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const padMiddle = rect.top + (rect.height / 2);
        const viewportMiddle = windowHeight / 2;
        const maxTilt = 21;

        if (padMiddle <= viewportMiddle) {
          setTiltAngle(0);
        } else if (rect.top >= 0) {
          const tilt = ((padMiddle - viewportMiddle) / viewportMiddle) * maxTilt;
          setTiltAngle(Math.min(tilt, maxTilt));
        } else {
          setTiltAngle(maxTilt);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <PadWrapper>
      <PadContainer id="pad" tiltAngle={tiltAngle}>
        <PadScreen>
          <EventList>
            {events.map((event, index) => (
              <EventItem key={index}>
                <img src={event.image} alt={event.title} />
                <CategoryBubble>{event.category}</CategoryBubble>
                <h1>{event.title}</h1>
                <h2>{event.category}</h2>
              </EventItem>
            ))}
          </EventList>
        </PadScreen>
      </PadContainer>
    </PadWrapper>
  );
};

export default Pad;
