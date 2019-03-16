import React from 'react';
import styled from 'styled-components';

import Hero from './Sections/Hero';
import RepoList from './Sections/RepoList';

import ScrollSnap from './ScrollSnap';
import ContactForm from './Form/ContactForm';

import { Neutrals } from '../constants';
import Footer from './Sections/Footer';
import Timeline from './Timeline';

const MainWrapper = styled.main`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  scroll-snap-type: y proximity;
  perspective: 1px;
  transform-style: preserve-3d;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  pointer-events: all;
  z-index: 200;
`;

const MainContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 2em;

  background-color: ${Neutrals.white.light};
  color: ${Neutrals.black.dark};

  overflow-x: hidden;
`;

export default () => (
  <MainWrapper id="main">
    <ScrollSnap id="home" />
    <Hero title="Guillaume de&nbsp;Matos" />
    <MainContainer>
      <ScrollSnap id="contentTop" />
      <Timeline
        events={[
          {
            id: 1,
            name: 'Test',
            date: 2019,
            left: false,
          },
          {
            id: 2,
            name: (
              <>
                <p>This is a paragraph</p>
                <p>This is another</p>
              </>
            ),
            date: 2019,
            left: true,
          },
          {
            id: 3,
            name: 'Test',
            date: 2019,
            left: false,
          },
          {
            id: 4,
            name: 'Test',
            date: 2019,
            left: true,
          },
        ]}
      />
      <RepoList id="projects" />
      <ContactForm id="contact" />
    </MainContainer>
    <Footer />
  </MainWrapper>
);
