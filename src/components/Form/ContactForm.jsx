import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ResponsiveContainer from '../ResponsiveContainer';
import Button from './Button';
import Input from './Input';
import FeatherIcon from '../FeatherIcon';

import SectionTitle from '../SectionTitle';
import FormAnimation from './FormAnimation';

import { Neutrals } from '../../constants';
import successAnimation from '../../constants/animation-success';
import ErrorBoundary from '../ErrorBoundary';

const ContactWrapper = ResponsiveContainer();
const Form = styled(ResponsiveContainer('form'))`
  padding-top: 0;
`;

const HiddenInput = styled.input`
  display: none;
  visibility: hidden;
`;

const FormControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
  width: 100%;
  margin-block-start: 2em;

  > *:not(:last-child) {
    margin-inline-end: 0.5em;
  }
`;

const ContactForm = ({ id }) => {
  const { t } = useTranslation();

  const [disabled, setDisabled] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const gotchaRef = useRef();

  const successRef = useRef();

  const handleClear = () => {
    nameRef.current.clear();
    emailRef.current.clear();
    messageRef.current.clear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { current: name } = nameRef;
    const { current: email } = emailRef;
    const { current: message } = messageRef;
    const { current: _gotcha } = gotchaRef;

    const { current: success } = successRef;

    const valid = name.validate() && email.validate() && message.validate();

    if (valid) {
      setDisabled(true);

      fetch('https://usebasin.com/f/c2474e62acfd.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          message: message.value,
          _gotcha: _gotcha.value,
        }),
      })
        .then((response) => {
          if (response.ok) {
            handleClear();

            success.show();
            success.start();
          } else {
            // TODO: Show error message
          }

          setDisabled(false);
        })
        .catch((error) => {
          // TODO: Show error message
          console.warn(error);
          setDisabled(false);
        });
    }

    return valid;
  };

  const clearAnimation = ({ current: animation }) => {
    animation.hide();
    setTimeout(animation.stop, 400);
  };

  return (
    <ContactWrapper>
      <SectionTitle>{t('navbar.contact')}</SectionTitle>

      <ErrorBoundary>
        <Form id={id} onSubmit={handleSubmit} onInvalid={handleSubmit}>
          <FormAnimation
            animationData={successAnimation}
            onComplete={() => clearAnimation(successRef)}
            ref={successRef}
          />

          <Input name="name" type="text" required ref={nameRef} disabled={disabled}>
            {t('form.fields.name')}
          </Input>

          <Input name="email" type="email" required ref={emailRef} disabled={disabled}>
            {t('form.fields.email')}
          </Input>

          <Input name="message" type="textarea" required ref={messageRef} disabled={disabled}>
            {t('form.fields.message')}
          </Input>

          <HiddenInput type="text" name="_gotcha" ref={gotchaRef} />

          <FormControls>
            <Button
              type="reset"
              backgroundColor={[Neutrals.white.medium, Neutrals.white.dark]}
              textColor={Neutrals.black.dark}
              onClick={handleClear}
              disabled={disabled}
            >
              <span>{t('form.controls.clear')}</span>
            </Button>

            <Button type="submit" disabled={disabled}>
              <FeatherIcon name="send" />
              <span>{t('form.controls.send')}</span>
            </Button>
          </FormControls>
        </Form>
      </ErrorBoundary>
    </ContactWrapper>
  );
};

ContactForm.propTypes = {
  id: PropTypes.string,
};

ContactForm.defaultProps = {
  id: null,
};

export default ContactForm;
