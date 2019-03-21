import React, { forwardRef, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Lottie from 'react-lottie';

const FormAnimationWrapper = styled.div`
  position: absolute;
  height: 40%;
  top: 50%;

  transform: translateY(-50%) scale(1);
  opacity: 1;
  transition-property: transform, opacity;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  pointer-events: none;
  z-index: 900;

  svg {
    width: unset !important;
    height: 100% !important;
  }

  ${props => props.isHidden
    && css`
      transform: translateY(-50%) scale(0.75);
      opacity: 0;
    `}
`;

const FormAnimation = forwardRef(({ animationData, onComplete }, ref) => {
  const [isStopped, setIsStopped] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useImperativeHandle(ref, () => ({
    stop: () => setIsStopped(true),
    start: () => setIsStopped(false),
    hide: () => setIsHidden(true),
    show: () => setIsHidden(false),
  }));

  return (
    <FormAnimationWrapper isHidden={isHidden}>
      <Lottie
        options={{
          loop: false,
          autoplay: false,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        isStopped={isStopped}
        isPaused={isStopped}
        eventListeners={[{ eventName: 'complete', callback: onComplete }]}
      />
    </FormAnimationWrapper>
  );
});

FormAnimation.propTypes = {
  animationData: PropTypes.objectOf(PropTypes.any).isRequired,
  onComplete: PropTypes.func,
};

FormAnimation.defaultProps = {
  onComplete: null,
};

export default FormAnimation;
