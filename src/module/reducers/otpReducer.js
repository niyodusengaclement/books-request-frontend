import { SEND_OTP_SUCCESS, SEND_OTP_ERROR } from "../actions";

const initialState = {
  user: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case SEND_OTP_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
