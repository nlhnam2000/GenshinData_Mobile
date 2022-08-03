import * as types from './types';

export const SetResultLanguage = lang => dispatch => {
  dispatch({
    type: types.SET_LANGUAGE,
    payload: {
      resultLanguage: lang ? lang : 'English',
    },
  });
};
