import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setCursorColor, resetCursorColor } from '../../redux/actions';
import { Theme } from '../../constants';
import HeroImage from './HeroImage';

const HeroContainer = styled.section`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  background-color: ${Theme.primary.dark};
  z-index: 0;
`;

const HeroTitle = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;

  font-size: 13vmin;
  font-weight: normal;
  text-align: center;
  color: #f1f2f6;

  z-index: 100;

  & > *:not(.sub) {
    font-display: swap;
    font-family: 'Abril Fatface', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  & > .sub {
    font-size: 35%;
    font-weight: normal;
    text-transform: uppercase;
    color: #dfe4ea;

    font-display: swap;
    font-family: 'Kameron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    &::before {
      content: '';
      display: block;
      position: relative;
      left: 1em;
      width: calc(100% - 2em);
      height: 2px;
      margin: 0.5em 0;
      margin-bottom: 1em;

      background-color: #dfe4ea;
      border-radius: 2px;
    }
  }
`;

const Hero = ({
  title,
  subtitle,

  setCursorColor: setCursorColorAction,
  resetCursorColor: resetCursorColorAction,
}) => (
  <HeroContainer
    onMouseEnter={() => setCursorColorAction('#f1f2f6')}
    onMouseLeave={resetCursorColorAction}
  >
    <HeroImage src={['/img/toulouse.webp']} fallback="/img/toulouse.jpg" alt="Toulouse" />
    <HeroTitle>
      <>
        <span>{title}</span>
        <span className="sub">{subtitle}</span>
      </>
    </HeroTitle>
  </HeroContainer>
);

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,

  setCursorColor: PropTypes.func.isRequired,
  resetCursorColor: PropTypes.func.isRequired,
};

Hero.defaultProps = {
  subtitle: null,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setCursorColor,
    resetCursorColor,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hero);
