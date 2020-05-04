import { GET_DASHBOARD_START, GET_DASHBOARD_SUCCESS, GET_DASHBOARD_ERROR} from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  dashboard: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        dashboard: payload,
      };
    case GET_DASHBOARD_ERROR:
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
