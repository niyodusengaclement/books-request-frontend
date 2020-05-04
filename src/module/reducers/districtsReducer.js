import { GET_DISTRICTS_START, GET_DISTRICTS_SUCCESS, GET_DISTRICTS_ERROR, GET_FIELDS_SUCCESS } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  districts: [],
  fields: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DISTRICTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DISTRICTS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        districts: payload,
      };
    case GET_FIELDS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        fields: payload,
      };
    case GET_DISTRICTS_ERROR:
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
