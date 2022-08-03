import * as types from '../action/types';

const initialState = {
  resultLanguage: 'English',
};

export default function LanguageReducer(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        resultLanguage: payload.resultLanguage,
      };

    default:
      return state;
  }
}
