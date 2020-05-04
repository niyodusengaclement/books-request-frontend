import { REQUEST_ACCOUNT_SUCCESS, REQUEST_ACCOUNT_ERROR, REQUEST_ACCOUNT_START } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  user: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_ACCOUNT_START:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        user: payload,
      };
    case REQUEST_ACCOUNT_ERROR:
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
