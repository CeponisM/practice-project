import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  perspective: 1000px;
`;

const PadContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  padding: 20px;
  background: #222222;
  border: 4px solid #6c6c6c;
  border-radius: 30px;
  box-shadow: 
    0px 0px 0px rgba(0, 0, 0, 0.3),
    0px 9px 20px rgba(0, 0, 0, 0.29),
    0px 37px 37px rgba(0, 0, 0, 0.26),
    0px 84px 50px rgba(0, 0, 0, 0.15),
    0px 149px 60px rgba(0, 0, 0, 0.04),
    0px 233px 65px rgba(0, 0, 0, 0.01);
  transform: ${({ tiltAngle }) => `rotateX(${tiltAngle}deg)`};
  transform-origin: bottom;
  transition: transform 0.35s ease-out;
  backface-visibility: hidden;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    transform: none;
    max-height: 600px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  &::-webkit-scrollbar {
    display: none;
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
    scrollbar-width: none;
  }

  &::-webkit-scrollbar {
    display: none;
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
  transition: transform 0.15s ease, box-shadow 0.5s ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 20px;
    transform: scale(1.05);
  }

  .lazy-load-image-background {
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
    scrollbar-width: none;
  }

  &::-webkit-scrollbar {
    display: none;
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
  { title: "Chicago EDM Concert", category: "Music", image: "images/EDM_Concert.jpg" },
  { title: "Underground Comedy Club", category: "Comedy", image: "images/Comedy_Club.jpg" },
  { title: "Rock Music Festival", category: "Festival", image: "images/Rock_Music_Festival.jpg" },
  { title: "Chicago Golf Tournament", category: "Sports", image: "images/Golf_Tournament.jpg" },
  { title: "Sing Karaoke!", category: "Entertainment", image: "images/Karaoke.jpg" },
  { title: "Art Exhibition", category: "Art", image: "images/Art_Exhibition.jpg" },
  { title: "Food Truck Festival", category: "Food", image: "images/Food_Trucks.jpg" },
  { title: "Jazz Night", category: "Music", image: "images/Jazz_Night.jpg" },
  { title: "Open Mic Poetry", category: "Poetry", image: "images/Poetry_Reading.jpg" },
  { title: "Indie Film Screening", category: "Film", image: "images/Film_Screening.jpg" },
  { title: "Local Farmers Market", category: "Market", image: "images/Farmers_Market.jpg" },
  { title: "Craft Beer Tasting", category: "Drinks", image: "images/Beer_Tasting.jpg" },
  { title: "Tech Meetup", category: "Tech", image: "images/Tech_Meet.jpg" },
  { title: "Book Reading", category: "Books", image: "images/Book_Reading.jpg" },
  { title: "Yoga in the Park", category: "Wellness", image: "images/Park_Yoga.jpg" },
];

const Pad = () => {
  const [tiltAngle, setTiltAngle] = useState(21);
  const tiltRef = useRef(21);
  const frameRef = useRef(null);

  const calculateTilt = useCallback(() => {
    const padElement = document.getElementById('pad');
    if (!padElement) return;

    const rect = padElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const padMiddle = rect.top + rect.height / 2;
    const viewportMiddle = windowHeight / 2;
    const maxTilt = 21;

    let newTilt = 0;
    if (padMiddle > viewportMiddle) {
      newTilt = ((padMiddle - viewportMiddle) / (windowHeight - viewportMiddle)) * maxTilt;
      newTilt = Math.min(newTilt, maxTilt);
    }

    if (Math.abs(newTilt - tiltRef.current) > 0.5) {
      tiltRef.current = newTilt;
      setTiltAngle(newTilt);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(calculateTilt);
  }, [calculateTilt]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [handleScroll]);

  const memoizedEvents = useMemo(() =>
    events.map((event, index) => (
      <EventItem key={index}>
        <LazyLoadImage
          src={event.image}
          alt={event.title}
          effect="blur"
          width="100%"
          height="120px"
        />
        <CategoryBubble>{event.category}</CategoryBubble>
        <h1>{event.title}</h1>
        <h2>{event.category}</h2>
      </EventItem>
    ))
  , []);

  return (
    <PadWrapper>
      <PadContainer id="pad" tiltAngle={tiltAngle}>
        <PadScreen>
          <EventList>
            {memoizedEvents}
          </EventList>
        </PadScreen>
      </PadContainer>
    </PadWrapper>
  );
};

export default Pad;
