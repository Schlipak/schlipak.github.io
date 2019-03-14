import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Theme, Neutrals } from '../../constants';

const HeroImageWrapper = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transform-style: preserve-3d;
  background-color: transparent;
  overflow: hidden;
`;

const Image = styled.div`
  display: block;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  filter: brightness(50%);

  @supports (mix-blend-mode: multiply) {
    filter: saturate(0%) brightness(100%);
    mix-blend-mode: multiply;
  }

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`;

const SwipeAnimationContainer = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: ${Neutrals.black.medium};
  transform: translate3d(0, 0, 0);

  animation-name: Animation-Swipe-Container-Background;
  animation-duration: 1s;
  animation-delay: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  pointer-events: none;
  z-index: 0;

  @keyframes Animation-Swipe-Container-Background {
    from: {
      background-color: ${Neutrals.black.medium};
    }
    to {
      background-color: ${Theme.primary.dark};
    }
  }
`;

const SwipeLayer = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: ${props => props.backgroundColor};

  transform-origin: top;
  transform: translateY(-100%) scale(1);
  border-radius: 0 0 100vmin 100vmin;

  animation-name: Animation-Swipe-Layer;
  animation-duration: ${props => props.duration || 1.5}s;
  animation-delay: ${props => props.delay || 0}s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  @keyframes Animation-Swipe-Layer {
    from: {
      transform: translateY(-100%) scale(1);
    }
    to {
      transform: translateY(0) scale(2);
    }
  }
`;

const HeroImage = ({ src, fallback, alt }) => (
  <HeroImageWrapper>
    <SwipeAnimationContainer>
      {Theme.shades.map((shade, i) => (
        <SwipeLayer key={shade} backgroundColor={shade} delay={1 + 0.5 * i} />
      ))}
    </SwipeAnimationContainer>
    <Image>
      <picture>
        {src.map(uri => (
          <source key={uri} srcSet={uri} alt={alt} type="image/webp" />
        ))}
        <img src={fallback} alt={alt} />
      </picture>
    </Image>
  </HeroImageWrapper>
);

HeroImage.propTypes = {
  src: PropTypes.arrayOf(PropTypes.string).isRequired,
  fallback: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default HeroImage;
