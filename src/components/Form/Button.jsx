import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Theme, Neutrals } from '../../constants';

const StyledButton = styled.button`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 1em 1.5em;

  border: none;
  outline: none;

  font-size: 1em;
  border-radius: 4px;
  background: linear-gradient(
    to bottom right,
    ${props => props.backgroundColor[0]} 0%,
    ${props => props.backgroundColor[1]} 100%
  );
  color: ${props => props.textColor};
  box-shadow: 0 0 0 0 transparent, 0 1rem 2rem -0.75rem ${props => props.backgroundColor[1]};
  transform: translateY(0);

  transition-property: box-shadow, transform;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus {
    box-shadow: 0 0 0 4px
        ${props => (props.backgroundColor[1] === Theme.primary.dark
    ? Neutrals.black.dark
    : Theme.primary.dark)},
      0 0.25rem 1rem -0.25rem ${props => props.backgroundColor[1]};
  }

  &:active {
    box-shadow: 0 0 0 0 transparent, 0 0.25rem 1rem -0.25rem ${props => props.backgroundColor[1]};
    transform: translateY(2px);
  }

  > *:not(:last-child) {
    margin-inline-end: 0.5em;
  }
`;

// eslint-disable-next-line react/button-has-type
const Button = ({
  children,
  type,

  onClick,

  backgroundColor,
  textColor,
}) => (
  <StyledButton
    type={type}
    backgroundColor={backgroundColor}
    textColor={textColor}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),

  onClick: PropTypes.func,

  backgroundColor: PropTypes.arrayOf(PropTypes.string),
  textColor: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  type: 'button',

  onClick: null,

  backgroundColor: [Theme.primary.light, Theme.primary.dark],
  textColor: Neutrals.white.lighter,
};

export default Button;
