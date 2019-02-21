import React from 'react';
import styled from 'styled-components';

import CursorLink from '../CursorLink';

import { Neutrals, Theme } from '../../constants';
import FeatherIcon from '../FeatherIcon';

const Footer = styled.footer`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
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

export default () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer>
      <div>
        &copy;&nbsp;
        {currentYear}
      </div>
      <div>
        <CursorLink
          href=""
          color={Neutrals.black.dark}
          accent={Theme.primary.light}
          targetOpacity={0.75}
          external
        >
          <FeatherIcon name="feather" size="1.5em" />
        </CursorLink>
      </div>
    </Footer>
  );
};
