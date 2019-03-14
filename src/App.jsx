import React from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';

import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

import { Neutrals, Theme } from './constants';

const App = ({ isNarrowScreen, shouldShowCursor }) => (
  <>
    {shouldShowCursor && <Cursor color={Neutrals.black.dark} accent={Theme.primary.light} />}
    {!isNarrowScreen && <Navbar color={Neutrals.black.dark} accent={Theme.primary.light} />}
    <MainContent />
  </>
);

App.propTypes = {
  isNarrowScreen: PropTypes.bool.isRequired,
  shouldShowCursor: PropTypes.bool.isRequired,
};

const mapSizesToProps = ({ width }) => ({
  isNarrowScreen: width < 900,
  shouldShowCursor: width >= 1025,
});

export default withSizes(mapSizesToProps)(App);
