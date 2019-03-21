import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Neutrals } from '../constants';
import { education, experience } from '../constants/timelines';

import Hero from './Sections/Hero';
import ResponsiveContainer from './ResponsiveContainer';
import SectionTitle from './SectionTitle';

import RepoList from './Sections/RepoList';
import ContactForm from './Form/ContactForm';

import Timeline from './Timeline';
import Footer from './Sections/Footer';

const SectionContainer = ResponsiveContainer();

const MainWrapper = styled.main`
  position: relative;
  display: block;
  width: 100%;
`;

const MainContainerWrapper = styled.section`
  position: relative;
  display: block;
  width: 100%;
  margin-top: 100vh;

  background-color: transparent;
  color: ${Neutrals.black.dark};

  z-index: 200;
`;

const MainContainer = styled.div`
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
`;

export default () => {
  const { t } = useTranslation();

  return (
    <MainWrapper id="main">
      <Hero title="Guillaume de&nbsp;Matos" subtitle={t('header.title')} />

      <MainContainerWrapper>
        <MainContainer>
          <SectionContainer id="education">
            <SectionTitle>{t('navbar.education')}</SectionTitle>
            <Timeline events={education} />
          </SectionContainer>
          <SectionContainer id="experience">
            <SectionTitle>{t('navbar.experience')}</SectionTitle>
            <Timeline events={experience} />
          </SectionContainer>
          <RepoList id="projects" />
          <ContactForm id="contact" />
        </MainContainer>
        <Footer />
      </MainContainerWrapper>
    </MainWrapper>
  );
};
