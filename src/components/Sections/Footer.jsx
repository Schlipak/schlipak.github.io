import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import CursorLink from '../CursorLink';

import { Neutrals, Theme } from '../../constants';

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

  @media screen and (max-width: 900px) {
    font-size: 0.75em;
    padding: 1em;
  }
`;

const LangLabel = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;

  text-transform: uppercase;

  ${props => props.isCurrent
    && css`
      color: ${Theme.primary.dark};
    `}
`;

const languages = ['fr', 'en'];

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
            onClick={(event) => {
              event.preventDefault();
              i18n.changeLanguage(lang);
            }}
          >
            <LangLabel isCurrent={lang === language.split('-')[0]}>{lang}</LangLabel>
          </CursorLink>
        ))}
      </div>
    </Footer>
  );
};
