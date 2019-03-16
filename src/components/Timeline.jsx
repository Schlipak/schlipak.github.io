import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Neutrals, Theme } from '../constants';

const TimelineWrapper = styled.ul`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 2em 0;
  padding: 0;

  list-style: none;

  &::before {
    content: '';
    display: 'block';
    position: absolute;
    top: 0;
    left: calc(50% - 1px);
    width: 2px;
    height: 100%;

    background-color: ${Neutrals.black.lighter};
    border-radius: 2px;
  }
`;

const TimelineEvent = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4rem;
  align-items: stretch;
  width: 100%;
  margin: 1em 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0.1875em;
    left: calc(50% - 0.375em);
    width: 0.75em;
    height: 0.75em;

    border-radius: 50%;
    box-shadow: 0 0 0 0.25em ${Neutrals.white.light};
    background-color: ${Theme.primary.light};
    background: linear-gradient(
      to bottom right,
      ${Theme.primary.light} 0%,
      ${Theme.primary.dark} 100%
    );
  }
`;

const TimelineContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  flex-basis: 1;
  flex-grow: 1;

  &:first-child {
    align-items: flex-end;
  }

  p {
    margin: 0.25em 0;

    &:first-child {
      margin-block-start: 0;
    }
  }
`;

const Timeline = ({ events }) => (
  <TimelineWrapper>
    {events.map((event) => {
      const {
        id, name, date, left,
      } = event;

      return (
        <TimelineEvent key={id}>
          {left && <TimelineContent>{name}</TimelineContent>}
          <TimelineContent>{date}</TimelineContent>
          {!left && <TimelineContent>{name}</TimelineContent>}
        </TimelineEvent>
      );
    })}
  </TimelineWrapper>
);

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

Timeline.defaultProps = {
  events: [],
};

export default Timeline;
