import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ResponsiveContainer from '../ResponsiveContainer';
import Button from './Button';
import Input from './Input';
import FeatherIcon from '../FeatherIcon';

import { Neutrals } from '../../constants';
import SectionTitle from '../SectionTitle';

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

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (event) => {
    const { current: name } = nameRef;
    const { current: email } = emailRef;
    const { current: message } = messageRef;

    const valid = name.validate() && email.validate() && message.validate();

    if (!valid) {
      event.preventDefault();
    }

    return valid;
  };

  const handleClear = () => {
    nameRef.current.clear();
    emailRef.current.clear();
    messageRef.current.clear();
  };

  return (
    <ContactWrapper>
      <SectionTitle>{t('navbar.contact')}</SectionTitle>
      <Form id={id} onSubmit={handleSubmit} onInvalid={handleSubmit}>
        <Input name="name" type="text" required ref={nameRef}>
          {t('form.fields.name')}
        </Input>
        <Input name="_replyto" type="email" required ref={emailRef}>
          {t('form.fields.email')}
        </Input>
        <Input name="message" type="textarea" required ref={messageRef}>
          {t('form.fields.message')}
        </Input>

        <input type="hidden" name="_subject" value="Contact Schlipak.github.io" />
        <input type="hidden" name="_next" value="https://schlipak.github.io" />
        <HiddenInput type="text" name="_gotcha" />

        <FormControls>
          <Button
            type="reset"
            backgroundColor={[Neutrals.white.medium, Neutrals.white.dark]}
            textColor={Neutrals.black.dark}
            onClick={handleClear}
          >
            <span>{t('form.controls.clear')}</span>
          </Button>

          <Button type="submit">
            <FeatherIcon name="send" />
            <span>{t('form.controls.send')}</span>
          </Button>
        </FormControls>
      </Form>
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
