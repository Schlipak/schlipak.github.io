import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import FeatherIcon from './FeatherIcon';
import { Neutrals, Colors } from '../constants';

const ErrorBoundaryDisplay = styled.div`
  display: block;
  width: 100%;
  margin: 1em 0;
  padding: 2em;

  background-color: ${Colors.red.dark};
  background: linear-gradient(to bottom right, ${Colors.red.light} 0%, ${Colors.red.dark} 100%);
  color: ${Neutrals.white.lighter};
  border-radius: 0.5rem;
  box-shadow: 0 1rem 2rem -0.75rem ${Colors.red.dark};
`;

const Title = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0;

  > *:not(:last-child) {
    margin-right: 0.5em;
  }
`;

const ErrorBacktrace = styled.div``;

const ErrorBacktraceSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 0.25em;
  }
`;

const Chevron = styled(FeatherIcon)`
  transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${props => props.open
    && css`
      transform: rotate(90deg);
    `}
`;

const ErrorBacktraceContent = styled.div`
  display: block;
  position: relative;

  text-align: start;
  opacity: 0;
  height: 0;

  transition-property: opacity, height;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

  overflow: hidden;

  ${props => props.measuring
    && css`
      position: absolute;
      height: unset;
      visibility: hidden;
      pointer-events: none;
    `}

  ${props => props.open
    && css`
      position: relative;
      height: ${props.height}px;
      opacity: 1;
    `}

  > pre {
    position: relative;
    margin-bottom: 0;
    padding-left: 1em;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;

      background-color: ${Neutrals.white.lighter};
      opacity: 0.25;
      border-radius: 2px;
    }
  }
`;

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);

    this.contentRef = createRef();
    this.state = {
      error: null,
      info: null,
      open: false,
      measuring: true,
      height: null,
    };
  }

  componentDidUpdate() {
    const { height: previousHeight } = this.state;

    if (previousHeight !== null) return;

    const { current: content } = this.contentRef;

    if (!content) return;

    const { height } = content.getBoundingClientRect();

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ measuring: false, height });
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { contentRef } = this;
    const { children } = this.props;
    const {
      error, info, open, measuring, height,
    } = this.state;

    if (error) {
      const errorInfo = info.componentStack
        .trim()
        .split('\n')
        .map(line => line.trim())
        .join('\n');

      return (
        <ErrorBoundaryDisplay>
          <Title>
            <FeatherIcon name="alert-circle" />
            <span>Something went wrong</span>
          </Title>
          <ErrorBacktrace>
            <ErrorBacktraceSummary onClick={() => this.setState({ open: !open })}>
              <Chevron name="chevron-right" open={open} />
              <span>Show developer info</span>
            </ErrorBacktraceSummary>
            <ErrorBacktraceContent
              open={open}
              measuring={measuring}
              height={height}
              ref={contentRef}
            >
              <p>{error.toString()}</p>
              <pre>{errorInfo}</pre>
            </ErrorBacktraceContent>
          </ErrorBacktrace>
        </ErrorBoundaryDisplay>
      );
    }

    return children;
  }
}
