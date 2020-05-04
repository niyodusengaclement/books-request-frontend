import { REQUEST_LANGUAGES_ERROR, REQUEST_LANGUAGES_SUCCESS } from "../actions";

const initialState = {
  lang: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_LANGUAGES_SUCCESS:
      return {
        ...state,
        lang: payload,
      };
    case REQUEST_LANGUAGES_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
