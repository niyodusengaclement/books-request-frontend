import { GET_PASTOR_CHURCHES_SUCCESS, GET_PASTOR_CHURCHES_ERROR, GET_PASTOR_CHURCHES_START } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  pastorChurches: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PASTOR_CHURCHES_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PASTOR_CHURCHES_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        pastorChurches: payload,
      };
    case GET_PASTOR_CHURCHES_ERROR:
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
