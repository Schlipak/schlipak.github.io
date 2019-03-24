import {
  SET_CURSOR_TARGET,
  REMOVE_CURSOR_TARGET,
  SET_CURSOR_POSITION,
  SET_CURSOR_COLOR,
  RESET_CURSOR_COLOR,
  FETCH_REPOS_REQUESTED,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
  RESTORE_REPOS_FROM_STORAGE,
  SET_CURSOR_ACCENT,
  RESET_CURSOR_ACCENT,
} from './types';

export * from './types';

export const setCursorPosition = (x, y) => ({
  type: SET_CURSOR_POSITION,
  payload: { x, y },
});

export const setCursorTarget = target => ({
  type: SET_CURSOR_TARGET,
  payload: { target },
});

export const removeCursorTarget = () => ({
  type: REMOVE_CURSOR_TARGET,
});

export const setCursorColor = color => ({
  type: SET_CURSOR_COLOR,
  payload: { color },
});

export const resetCursorColor = () => ({
  type: RESET_CURSOR_COLOR,
});

export const setCursorAccent = accent => ({
  type: SET_CURSOR_ACCENT,
  payload: { accent },
});

export const resetCursorAccent = () => ({
  type: RESET_CURSOR_ACCENT,
});

export const handleRestoreReposFromStorage = repos => ({
  type: RESTORE_REPOS_FROM_STORAGE,
  payload: { repos },
});

export const handleFetchReposSuccess = repos => ({
  type: FETCH_REPOS_SUCCESS,
  payload: { repos },
});

export const handleFetchReposFailure = error => ({
  type: FETCH_REPOS_FAILURE,
  payload: { error },
});

export const fetchRepos = () => async (dispatch) => {
  dispatch({ type: FETCH_REPOS_REQUESTED });

  const storage = localStorage.getItem('repos');

  if (storage) {
    const json = JSON.parse(storage);
    const { expires, repos } = json;

    if (expires > Math.floor(Date.now() / 1000)) {
      return dispatch(handleRestoreReposFromStorage(repos));
    }
  }

  return fetch('https://api.github.com/users/Schlipak/repos')
    .then(response => response.ok && response.json())
    .then(repos => dispatch(handleFetchReposSuccess(repos)))
    .catch(error => dispatch(handleFetchReposFailure(error)));
};
