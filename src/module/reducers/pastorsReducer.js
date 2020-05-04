import { GET_PASTOR_SUCCESS, GET_PASTOR_START, GET_PASTOR_ERROR } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  values: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PASTOR_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PASTOR_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: payload,
      };
    case GET_PASTOR_ERROR:
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
