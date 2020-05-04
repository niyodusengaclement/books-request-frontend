import {  GET_YEARS_START, GET_YEARS_SUCCESS, GET_YEARS_ERROR } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  values: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_YEARS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_YEARS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: payload,
      };
    case GET_YEARS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: payload,
      };
    default:
      return state;
  }
};
