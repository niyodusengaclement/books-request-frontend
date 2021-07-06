import {
  GET_FIELDS_AS_GUEST,
  GET_DISTRICTS_AS_GUEST,
  GET_CHURCHES_AS_GUEST,
} from "../actions";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FIELDS_AS_GUEST:
      return {
        ...state,
        fields: {
          error: payload?.error,
          data: payload?.error ? null : payload,
        },
      };
    case GET_DISTRICTS_AS_GUEST:
      return {
        ...state,
        districts: {
          error: payload?.error,
          data: payload?.error ? null : payload,
        },
      };
    case GET_CHURCHES_AS_GUEST:
      return {
        ...state,
        churches: {
          error: payload?.error,
          data: payload?.error ? null : payload,
        },
      };
    default:
      return state;
  }
};
