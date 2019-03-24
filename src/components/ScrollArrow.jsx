import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import FeatherIcon from './FeatherIcon';

const Container = styled.div`
  display: block;
  position: relative;
  padding: 0;
  width: 1em;
  height: 1em;

  font-size: ${props => props.size};

  ${props => props.direction === 'up'
    && css`
      transform: rotate(0.5turn);
    `}

  & > .chevron {
    position: absolute;
    top: 0;
    left: 50%;

    animation-duration: 4s;
    animation-delay: 4s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);

    @keyframes AnimationScrollDownArrowChevronEnter {
      from {
        transform: translate(-50%, -75%) scale(0.5);
        opacity: 0;
      }

      25%,
      to {
        transform: translate(-50%, 0) scale(1);
        opacity: 1;
      }
    }

    @keyframes AnimationScrollDownArrowChevronLeave {
      from {
        transform: translate(-50%, 0) scale(1);
        opacity: 1;
      }

      25%,
      to {
        transform: translate(-50%, 75%) scale(0.5);
        opacity: 0;
      }
    }

    &:first-child {
      animation-name: AnimationScrollDownArrowChevronEnter;
    }

    &:last-child {
      animation-name: AnimationScrollDownArrowChevronLeave;
    }
  }
`;

const ScrollDownArrow = ({ size, direction, ...rest }) => (
  <Container size={size} direction={direction} {...rest}>
    <FeatherIcon name="chevron-down" size="1em" className="chevron" />
    <FeatherIcon name="chevron-down" size="1em" className="chevron" />
  </Container>
);

ScrollDownArrow.propTypes = {
  size: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down']),
};

ScrollDownArrow.defaultProps = {
  size: '3.25em',
  direction: 'down',
};

export default ScrollDownArrow;
