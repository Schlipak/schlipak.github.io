import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Colors, Neutrals, Theme } from '../../constants';

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  background-color: ${Neutrals.white.medium};
  border-radius: 4px;
  overflow: visible;

  box-shadow: 0 0 0 0 transparent;
  transition-property: box-shadow;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  margin-top: 2em;
  cursor: none;

  ${props => props.focused
    && css`
      box-shadow: 0 0 0 4px ${Theme.primary.light};
    `}

  ${props => props.error
    && css`
      box-shadow: 0 0 0 4px ${Colors.red.dark};
    `}
`;

const LabelText = styled.span`
  display: inline-block;
  position: absolute;
  top: 1.15em;
  left: 1em;

  color: ${Neutrals.black.dark};
  line-height: 1;
  transform-origin: left center;
  transform: translate(0, 0) scale(1);
  opacity: 0.75;

  transition-property: transform, opacity;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  pointer-events: none;

  ${props => (props.focused || props.hasValue)
    && css`
      transform: translate(-0.5em, calc(-100% - 1.15em)) scale(0.9);
      opacity: 1;
    `}

  ${props => props.required
    && css`
      &::after {
        content: '*';
        margin: 0 0.2em;
        vertical-align: sub;

        color: ${Colors.red.dark};
        font-weight: bold;
      }
    `}
`;

const LabelError = styled.span`
  display: block;
  position: absolute;
  top: calc(100% + 0.35em);
  right: 0;

  color: ${Colors.red.dark};
  font-size: 0.85em;
  white-space: nowrap;

  opacity: 0;
  transform: translateY(-100%);

  transition-property: opacity, transform;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  ${props => props.error
    && css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  padding: 1em;
  border-radius: 4px;
  overflow: hidden;

  font-size: 1em;
  cursor: none;

  &:-webkit-autofill {
    &,
    &:hover,
    &:focus {
      -webkit-box-shadow: 0 0 0px 1000px ${Neutrals.white.medium} inset;
      z-index: 100;
    }
  }
`;

const StyledInputWithTextarea = StyledInput.withComponent('textarea');
const StyledTextarea = styled(StyledInputWithTextarea)`
  min-height: 10em;
  resize: none;

  font-display: swap;
  font-family: 'Fira Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const hasError = (input, type) => {
  if (type === 'email') {
    if (!input || !input.match(/^[^@]+@[^@]+$/)) {
      return { has: true, text: 'Please input a valid email address' };
    }
  }

  if (!input && !input.length) {
    return { has: true, text: 'Please fill out this field' };
  }

  return { has: false, text: 'No error' };
};

const Input = ({
  children, type, name, required,
}) => {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState({ has: false, text: 'No error' });

  const validate = (newValue = value) => {
    const newError = hasError(newValue, type);

    if (newError.has) {
      setError(newError);
    } else {
      setError({ ...error, has: false });
    }
  };

  const validateAndUpdate = (newValue) => {
    setValue(newValue);

    if (error.has) {
      validate(newValue);
    }
  };

  const validateAndSetFocused = (state) => {
    validate();
    setFocused(state);
  };

  return (
    <InputWrapper>
      <Label htmlFor={name} focused={focused} error={error.has}>
        <LabelText focused={focused} hasValue={value} required={required}>
          {children}
        </LabelText>
        {type === 'textarea' && (
          <StyledTextarea
            name={name}
            value={value}
            required={required}
            onFocus={() => validateAndSetFocused(true)}
            onBlur={() => validateAndSetFocused(false)}
            onChange={event => validateAndUpdate(event.target.value)}
          />
        )}
        {type !== 'textarea' && (
          <StyledInput
            type={type}
            name={name}
            value={value}
            required={required}
            onFocus={() => validateAndSetFocused(true)}
            onBlur={() => validateAndSetFocused(false)}
            onChange={event => validateAndUpdate(event.target.value)}
          />
        )}
      </Label>
      <LabelError error={error.has}>{error.text}</LabelError>
    </InputWrapper>
  );
};

Input.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Input.defaultProps = {
  children: null,
  type: 'text',
  required: false,
};

export default Input;
