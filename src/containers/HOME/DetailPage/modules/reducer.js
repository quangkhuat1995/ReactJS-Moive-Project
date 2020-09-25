import {
  DETAIL_MOVIE_REQUEST,
  DETAIL_MOVIE_SUCCESS,
  DETAIL_MOVIE_FAILED,
  SELECT_DAY,
} from "./constant";
import { TODAY } from "./../../../../constants/config";
const initialState = {
  loading: false,
  detailMovie: {},
  error: null,
  selectDay: new Date(TODAY).toLocaleDateString("it-IT"),
  // 2019-01-01 ~~> 1/1/2019
};

const detailMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_MOVIE_REQUEST:
      state.loading = true;
      state.detailMovie = {};
      state.error = null;
      return { ...state };

    case DETAIL_MOVIE_SUCCESS:
      state.loading = false;
      state.detailMovie = action.data;
      state.error = null;
      return { ...state };

    case DETAIL_MOVIE_FAILED:
      state.loading = false;
      state.detailMovie = {};
      state.error = action.error;
      return { ...state };

    case SELECT_DAY:
      state.selectDay = action.selectDay;
      return { ...state };
    default:
      return { ...state };
  }
};

export default detailMovieReducer;
