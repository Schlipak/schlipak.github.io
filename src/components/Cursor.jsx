import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setCursorPosition } from '../redux/actions';

import { Neutrals, Theme } from '../constants';

const StyledCursor = styled.div`
  position: fixed;

  border-radius: 50%;
  pointer-events: none;
  overflow: visible;

  @media (max-device-width: 1025px) {
    & {
      display: none;
    }
  }
`;

const SmallCursor = styled(StyledCursor)`
  width: 6px;
  height: 6px;
  left: -3px;
  top: -3px;

  background-color: ${props => (props.isFixed ? props.accent : props.colorOverride || props.color)};
  opacity: 1;
  z-index: 11000;

  transition-property: width, height, left, top, opacity, background-color;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  will-change: width, height, left, top;

  ${props => props.isClicked
    && css`
      width: 30px;
      height: 30px;
      left: -15px;
      top: -15px;

      opacity: 0.5;
    `}
`;

const LargeCursor = styled(StyledCursor)`
  width: 30px;
  height: 30px;
  left: -15px;
  top: -15px;

  color: ${props => (props.isFixed ? props.accentOverride || props.accent : props.colorOverride || props.color)};
  border: 3px solid currentColor;
  opacity: ${props => (props.isFixed ? 1 : 0.5)};

  transition-property: color, opacity, width, height, left, top;
  transition-duration: ${props => (props.isFixed ? 0.2 : 0.4)}s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  will-change: width, height, left, top;
  transform: translateZ(0);

  z-index: 12000;

  ${props => props.isClicked
    && !props.isFixed
    && css`
      width: 40px !important;
      height: 40px !important;
      left: -20px !important;
      top: -20px !important;

      opacity: 0;
    `}
`;

const Cursor = ({
  color,
  colorOverride,
  accent,
  accentOverride,

  target,
  position,

  setCursorPosition: setCursorPositionAction,
}) => {
  let animationFrameId;

  const [isClicked, setIsClicked] = useState(false);

  const cursorRef = useRef();
  const circleRef = useRef();

  const lerp = (a, b, n) => (1 - n) * a + n * b;

  const updatePosition = (event) => {
    const { clientX, clientY } = event;

    setCursorPositionAction(clientX, clientY);
  };

  const getTargetPosition = () => {
    if (!target) {
      return {
        x: 0,
        y: 0,
        size: 0,
      };
    }

    const {
      left, top, width, height,
    } = target.getBoundingClientRect();
    const size = Math.max(width, height);

    return {
      x: Math.round(left + width / 2),
      y: Math.round(top + height / 2),
      size,
    };
  };

  const updateCursor = () => {
    const { current: cursor } = cursorRef;
    const { current: circle } = circleRef;

    const { x, y } = position;
    const {
      x: cx, y: cy, width, height,
    } = circle.getBoundingClientRect();

    const { x: targetX, y: targetY, size } = getTargetPosition();

    const currentSize = lerp(width, target ? size : 30, 1);

    circle.style.width = `${currentSize}px`;
    circle.style.height = `${currentSize}px`;
    circle.style.left = `-${currentSize / 2}px`;
    circle.style.top = `-${currentSize / 2}px`;

    const dx = lerp(cx + width / 2, target ? targetX : x, 0.2);
    const dy = lerp(cy + height / 2, target ? targetY : y, 0.2);

    cursor.style.transform = `matrix(1, 0, 0, 1, ${x}, ${y})`;
    circle.style.transform = `translate3D(${dx}px, ${dy}px, 0px)`;

    animationFrameId = requestAnimationFrame(updateCursor);
  };

  const setActiveClickedState = () => setIsClicked(true);
  const removeActiveClickedState = () => setIsClicked(false);

  useEffect(() => {
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', setActiveClickedState);
    document.addEventListener('mouseup', removeActiveClickedState);
    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', setActiveClickedState);
      document.removeEventListener('mouseup', removeActiveClickedState);
    };
  });

  return (
    <>
      <SmallCursor
        ref={cursorRef}
        color={color}
        colorOverride={colorOverride}
        accent={accent}
        isClicked={isClicked}
      />
      <LargeCursor
        ref={circleRef}
        color={color}
        colorOverride={colorOverride}
        accent={accent}
        accentOverride={accentOverride}
        isFixed={target}
        isClicked={isClicked}
      />
    </>
  );
};

Cursor.propTypes = {
  color: PropTypes.string,
  colorOverride: PropTypes.string,
  accent: PropTypes.string,
  accentOverride: PropTypes.string,

  target: PropTypes.instanceOf(Element),
  position: PropTypes.objectOf(PropTypes.number).isRequired,

  setCursorPosition: PropTypes.func.isRequired,
};

Cursor.defaultProps = {
  color: Neutrals.white.lighter,
  colorOverride: null,
  accent: Theme.primary.light,
  accentOverride: null,

  target: null,
};

const mapStateToProps = state => ({ ...state.cursor });
const mapDispatchToProps = dispatch => bindActionCreators({ setCursorPosition }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cursor);
