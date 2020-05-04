import { CREATE_REQUEST_START, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_ERROR, GET_REQUEST_SUCCESS, GET_REQUEST_ERROR, GET_SINGLE_REQUEST_SUCCESS, UPDATE_REQUEST_SUCCESS, UPDATE_REQUEST_START, GET_OTHER_REQUESTS_SUCCESS } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  singleRequest: {},
  updated: {},
  requests: [],
  otherRequests: [],
  newRequest: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        newRequest: payload,
        isLoading: false,
        isLoaded: true,
      };
    case CREATE_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
        isLoaded: false,
      };
    case GET_REQUEST_SUCCESS:
      return {
        ...state,
        requests: payload,
        isLoading: false,
        isLoaded: true,
      }
    case GET_OTHER_REQUESTS_SUCCESS:
      return {
        ...state,
        otherRequests: payload,
        isLoading: false,
        isLoaded: true,
      }
      case GET_SINGLE_REQUEST_SUCCESS:
        return {
          ...state,
          singleRequest: payload,
          isLoading: false,
          isLoaded: true,
        };
    case GET_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
        isLoaded: false,
      }
    case UPDATE_REQUEST_START:
      return {
        ...state,
        isLoading: true,
        singleRequest: null,
      }
    case UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        updated: payload,
        isLoading: false,
        isLoaded: true,
      };
    default:
      return state;
  }
};
