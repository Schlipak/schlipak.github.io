import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';

import { Theme } from '../constants';

export const SectionTitleWrapper = styled.h2`
  position: relative;
  width: 100%;

  font-size: 1.65rem;
  text-align: start;
`;

export const SectionTitleInner = styled.div`
  position: relative;
  display: inline-block;

  z-index: 1;
`;

export const SectionTitleLabel = styled.span`
  z-index: 100;
`;

export const StyledScrollAnimation = styled(ScrollAnimation)`
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;

  pointer-events: none;
  z-index: -1;
`;

export const SectionTitleHighlight = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 0.6em;
  left: 1em;
  bottom: 0;

  background-color: ${Theme.primary.light};
  opacity: 0.25;
`;

const SectionTitle = ({ children }) => (
  <SectionTitleWrapper>
    <SectionTitleInner>
      <SectionTitleLabel>{children}</SectionTitleLabel>
      <StyledScrollAnimation animateIn="growRight" scrollableParentSelector="#main" offset={20}>
        <SectionTitleHighlight />
      </StyledScrollAnimation>
    </SectionTitleInner>
  </SectionTitleWrapper>
);

SectionTitle.propTypes = {
  children: PropTypes.node,
};

SectionTitle.defaultProps = {
  children: null,
};

export default SectionTitle;
