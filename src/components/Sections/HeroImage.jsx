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

  overflow: hidden;
`;

const Image = styled.div`
  display: block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;

  filter: brightness(50%);

  @supports (mix-blend-mode: multiply) {
    filter: saturate(0%) brightness(100%);
    mix-blend-mode: multiply;
  }
`;

const HeroImage = ({ src, fallback, alt }) => (
  <HeroImageWrapper>
    <Image>
      <picture>
        {src.map(uri => (
          <source key={uri} srcSet={uri} alt={alt} />
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
