import {
  SET_CURSOR_TARGET,
  REMOVE_CURSOR_TARGET,
  SET_CURSOR_POSITION,
  SET_CURSOR_COLOR,
  RESET_CURSOR_COLOR,
} from '../actions/types';

const initialState = {
  target: null,
  position: { x: 0, y: 0 },
  colorOverride: '#2f3542',
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_CURSOR_POSITION: {
    const { x, y } = action.payload;

    return { ...state, position: { x, y } };
  }
  case SET_CURSOR_TARGET: {
    const { target } = action.payload;

    return { ...state, target };
  }
  case REMOVE_CURSOR_TARGET:
    return { ...state, target: null };
  case SET_CURSOR_COLOR: {
    const { color } = action.payload;
    return { ...state, colorOverride: color };
  }
  case RESET_CURSOR_COLOR:
    return { ...state, colorOverride: '#2f3542' };
  default:
    return state;
  }
};
