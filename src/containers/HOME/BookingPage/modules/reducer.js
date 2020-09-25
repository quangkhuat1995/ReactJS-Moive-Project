import {
  BOOKING_MOVIE_PAGE_REQUEST,
  BOOKING_MOVIE_PAGE_SUCCESS,
  BOOKING_MOVIE_PAGE_FAILED,
} from "./constants";

const initialState = {
  loading: false,
  bookingMovie: {},
  error: null,
};

const bookingMoviePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_MOVIE_PAGE_REQUEST:
      state.loading = true;
      state.bookingMovie = {};
      state.error = null;
      return { ...state };

    case BOOKING_MOVIE_PAGE_SUCCESS:
      state.loading = false;
      state.bookingMovie = action.data;
      state.error = null;
      return { ...state };

    case BOOKING_MOVIE_PAGE_FAILED:
      state.loading = false;
      state.bookingMovie = {};
      state.error = action.error;
      return { ...state };

    default:
      return { ...state };
  }
};
export default bookingMoviePageReducer;
