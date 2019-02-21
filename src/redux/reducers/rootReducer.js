import { combineReducers } from 'redux';

import cursor from './cursor';
import repos from './repos';

export default combineReducers({ cursor, repos });
