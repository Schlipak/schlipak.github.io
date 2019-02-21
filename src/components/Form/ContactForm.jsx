import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';

import Button from './Button';
import ResponsiveContainer from '../ResponsiveContainer';
import FeatherIcon from '../FeatherIcon';
import { Neutrals } from '../../constants';

const Form = ResponsiveContainer('form');

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
  margin-top: 2em;

  > *:not(:last-child) {
    margin-right: 0.5em;
  }
`;

const ContactForm = () => (
  <Form>
    <Input name="name" type="text" required>
      Name
    </Input>
    <Input name="_replyto" type="email" required>
      Email
    </Input>
    <Input name="message" type="textarea" required>
      Message
    </Input>

    <input type="hidden" name="_subject" value="Contact Schlipak.github.io" />
    <input type="hidden" name="_next" value="https://schlipak.github.io" />
    <HiddenInput type="text" name="_gotcha" />

    <FormControls>
      <Button
        type="reset"
        backgroundColor={[Neutrals.white.medium, Neutrals.white.dark]}
        textColor={Neutrals.black.dark}
      >
        <span>Clear</span>
      </Button>

      <Button type="submit">
        <FeatherIcon name="send" />
        <span>Send</span>
      </Button>
    </FormControls>
  </Form>
);

export default ContactForm;
