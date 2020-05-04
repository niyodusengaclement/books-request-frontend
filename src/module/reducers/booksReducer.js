import { REQUEST_BOOKS_SUCCESS, REQUEST_BOOKS_ERROR, ADD_BOOK_START, ADD_BOOK_SUCCESS, ADD_BOOK_ERROR, GET_OTHER_BOOKS_SUCCESS } from "../actions";

const initialState = {
  isLoading: false,
  isLoaded: false,
  newBook: {},
  otherBooks: [],
  books: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_BOOKS_SUCCESS:
      return {
        ...state,
        books: payload,
        isLoaded: true,
        isLoading: false,
      };
    case REQUEST_BOOKS_ERROR:
      return {
        ...state,
        books: payload,
        isLoaded: false,
        isLoading: false,
      };
      case ADD_BOOK_START:
        return {
          ...state,
          isLoaded: false,
          isLoading: true,
        };
      case ADD_BOOK_SUCCESS:
        return {
          ...state,
          newBook: payload,
          isLoaded: true,
          isLoading: false,
        };
      case GET_OTHER_BOOKS_SUCCESS:
        return {
          ...state,
          otherBooks: payload,
          isLoaded: true,
          isLoading: false,
        };
        case ADD_BOOK_ERROR:
          return {
            ...state,
            isLoaded: false,
            isLoading: false,
          };
    default:
      return state;
  }
};
