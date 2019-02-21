import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setCursorTarget, removeCursorTarget } from '../redux/actions';

import { Neutrals, Theme } from '../constants';

const TargetZone = styled.a`
  position: relative;

  color: ${props => props.color};
  text-decoration: none;
  outline: none;

  transition: color;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  user-select: none;

  &:hover {
    color: ${props => props.accent};
  }

  &:focus:not(:hover) {
    & > :first-child::before {
      opacity: 0.75;
      transform: scale(1);
    }
  }

  &:hover,
  &:focus:not(:hover) {
    & > :first-child {
      opacity: 1;
    }

    & > :nth-child(2) {
      opacity: 1;
    }
  }
`;

const TargetInner = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1.5em;

  opacity: ${props => props.targetOpacity};
  outline: none;

  transition-property: opacity;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  &::-moz-focus-inner {
    outline: none;
    border: none;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    color: ${props => props.color};
    border-radius: 100vh;
    border: 1px solid currentColor;
    box-shadow: inset 0 0 1px 0 currentColor, 0 0 1px 0 currentColor;

    opacity: 0;
    transform: scale(0.75);

    transition-property: opacity, transform;
    transition-duration: 0.4s;
  }

  @media screen and (max-width: 900px) {
    padding: 1em;
  }
`;

const CursorLink = ({
  children,
  additionalChildren,
  href,
  external,

  targetOpacity,
  additionalContentOpacity,

  color,
  accent,
  className,

  setCursorTarget: setCursorTargetAction,
  removeCursorTarget: removeCursorTargetAction,

  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const targetZoneRef = useRef();

  const handleMouseEnter = () => {
    const { current: targetZone } = targetZoneRef;

    setCursorTargetAction(targetZone);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    removeCursorTargetAction();
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <TargetZone
      href={href}
      target={external ? '_blank' : null}
      rel="noopener noreferrer"
      role="link"
      color={color}
      accent={accent}
      additionalContentOpacity={additionalContentOpacity}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TargetInner ref={targetZoneRef} tabIndex="-1" targetOpacity={targetOpacity}>
        {children}
      </TargetInner>
      {additionalChildren}
    </TargetZone>
  );
};

CursorLink.propTypes = {
  children: PropTypes.node.isRequired,
  additionalChildren: PropTypes.node,
  href: PropTypes.string,
  external: PropTypes.bool,

  targetOpacity: PropTypes.number,
  additionalContentOpacity: PropTypes.number,

  color: PropTypes.string,
  accent: PropTypes.string,
  className: PropTypes.string,

  setCursorTarget: PropTypes.func.isRequired,
  removeCursorTarget: PropTypes.func.isRequired,

  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

CursorLink.defaultProps = {
  additionalChildren: null,
  href: '#void',
  external: false,

  targetOpacity: 0.5,
  additionalContentOpacity: 0.5,

  color: Neutrals.white.lighter,
  accent: Theme.primary.light,
  className: '',

  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
};

const mapStateToProps = state => ({ ...state.cursor });
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setCursorTarget,
    removeCursorTarget,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CursorLink);
