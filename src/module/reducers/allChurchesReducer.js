import {  GET_CHURCHES_START, GET_CHURCHES_SUCCESS, GET_CHURCHES_ERROR } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  allChurches: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHURCHES_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CHURCHES_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        allChurches: payload,
      };
    case GET_CHURCHES_ERROR:
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
