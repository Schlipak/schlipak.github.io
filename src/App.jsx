import React from 'react';

import Cursor from './components/Cursor';

import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

import { Neutrals, Theme } from './constants';

export default () => (
  <>
    <Cursor color={Neutrals.black.dark} accent={Theme.primary.light} />
    <Navbar color={Neutrals.black.dark} accent={Theme.primary.light} />
    <MainContent />
  </>
);
