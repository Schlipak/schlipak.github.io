import {
  FETCH_REPOS_REQUESTED,
  RESTORE_REPOS_FROM_STORAGE,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
} from '../actions/types';

const initialState = {
  repos: Array(8)
    .fill({ empty: true })
    .map((e, i) => ({ ...e, id: i })),
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_REPOS_REQUESTED:
    return { ...state, loading: true };
  case RESTORE_REPOS_FROM_STORAGE: {
    const { repos } = action.payload;

    return {
      ...state,
      repos,
      loading: false,
      error: null,
    };
  }
  case FETCH_REPOS_SUCCESS: {
    const { repos: rawList } = action.payload;
    const repos = rawList.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    const storage = {
      expires: Math.floor(Date.now() / 1000) + 86400,
      repos,
    };

    localStorage.setItem('repos', JSON.stringify(storage));

    return {
      ...state,
      repos,
      loading: false,
      error: null,
    };
  }
  case FETCH_REPOS_FAILURE: {
    const { error } = action.payload;

    return { ...state, loading: false, error };
  }
  default:
    return state;
  }
};
