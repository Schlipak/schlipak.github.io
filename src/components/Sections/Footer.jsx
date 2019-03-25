import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import CursorLink from '../CursorLink';
import ScrollArrow from '../ScrollArrow';

import { Neutrals, Theme } from '../../constants';
import { languages } from '../../i18n';

const Footer = styled.footer`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 1em 2em;

  background-color: ${Neutrals.white.dark};
  z-index: 200;

  @media screen and (max-width: 900px) {
    font-size: 0.75em;
    padding: 1em;
  }
`;

const LangLabel = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;

  text-transform: uppercase;
  font-size: 1.15rem;

  ${props => props.isCurrent
    && css`
      color: ${Theme.primary.dark};
    `}
`;

const VerticalSeparator = styled.div`
  display: block;
  position: relative;
  width: 1px;
  height: 3.5rem;
  margin: 0 1em;

  background-color: ${Neutrals.black.lighter};
  opacity: 0.5;
`;

export default () => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  return (
    <Footer>
      <div>
        {languages.map(lang => (
          <CursorLink
            key={lang}
            href={`#lang-${lang}`}
            color={Neutrals.black.dark}
            accent={Theme.primary.light}
            targetOpacity={0.75}
            padding="1.25em"
            onClick={(event) => {
              event.preventDefault();
              i18n.changeLanguage(lang);
            }}
          >
            <LangLabel isCurrent={lang === language.split('-')[0]}>{lang}</LangLabel>
          </CursorLink>
        ))}
      </div>

      <VerticalSeparator />

      <CursorLink
        href="#home"
        color={Neutrals.black.dark}
        accent={Theme.primary.light}
        targetOpacity={0.75}
        padding="1.25em"
        onClick={() => window.scrollTo(0, 0)}
      >
        <ScrollArrow size="2rem" direction="up" />
      </CursorLink>
    </Footer>
  );
};
