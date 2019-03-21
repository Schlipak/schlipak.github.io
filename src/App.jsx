import React from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';

import Cursor from './components/Cursor';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import ScrollSnap from './components/ScrollSnap';

import { Neutrals, Theme } from './constants';

const App = ({ isWideScreen, shouldShowCursor }) => (
  <>
    <ScrollSnap id="home" />
    {shouldShowCursor && <Cursor color={Neutrals.black.dark} accent={Theme.primary.light} />}
    {isWideScreen && <Navbar color={Neutrals.black.dark} accent={Theme.primary.light} />}
    <MainContent />
  </>
);

App.propTypes = {
  isWideScreen: PropTypes.bool.isRequired,
  shouldShowCursor: PropTypes.bool.isRequired,
};

const mapSizesToProps = ({ width }) => ({
  isWideScreen: width >= 900,
  shouldShowCursor: width >= 1025,
});

export default withSizes(mapSizesToProps)(App);
