import React from 'react';
import styled from 'styled-components';

import Hero from './Sections/Hero';
import RepoList from './Sections/RepoList';

import ScrollSnap from './ScrollSnap';
import ContactForm from './Form/ContactForm';

import { Neutrals } from '../constants';
import Footer from './Sections/Footer';

const MainWrapper = styled.main`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  scroll-snap-type: y proximity;
  perspective: 1px;
  transform-style: preserve-3d;

  overflow-x: hidden;
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
  padding-top: 2em;

  background-color: ${Neutrals.white.light};
  color: ${Neutrals.black.dark};
`;

export default () => (
  <MainWrapper>
    <ScrollSnap id="home" />
    <Hero title="Guillaume de&nbsp;Matos" />
    <MainContainer>
      <ScrollSnap />
      <ScrollSnap id="projects" />
      <RepoList />
      <ScrollSnap id="contact" />
      <ContactForm />
    </MainContainer>
    <Footer />
  </MainWrapper>
);
