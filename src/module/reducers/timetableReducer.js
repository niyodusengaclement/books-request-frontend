import { TIMETABLE_START, TIMETABLE_SUCCESS, TIMETABLE_ERROR } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  timetable: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TIMETABLE_START:
      return {
        ...state,
        isLoading: true,
      };
    case TIMETABLE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        timetable: payload,
      };
    case TIMETABLE_ERROR:
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
