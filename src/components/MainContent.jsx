import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

  background-color: ${Neutrals.white.light};
  color: ${Neutrals.black.dark};

  overflow-x: hidden;
`;

export default () => {
  const { t } = useTranslation();

  return (
    <MainWrapper>
      <ScrollSnap id="home" />
      <Hero title="Guillaume de&nbsp;Matos" />
      <MainContainer>
        <ScrollSnap id="contentTop" />
        <p>{t('hello')}</p>
        <RepoList id="projects" />
        <ContactForm id="contact" />
      </MainContainer>
      <Footer />
    </MainWrapper>
  );
};
