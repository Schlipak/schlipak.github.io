import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

  /* filter: brightness(50%);

  @supports (mix-blend-mode: multiply) {
    filter: saturate(0%) brightness(100%);
    mix-blend-mode: multiply;
  } */

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`;

const HeroImage = ({ src, fallback, alt }) => (
  <HeroImageWrapper>
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
