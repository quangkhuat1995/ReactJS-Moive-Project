import {
  LIST_MOVIE_REQUEST,
  LIST_MOVIE_SUCCESS,
  LIST_MOVIE_FAILED,
  DETAIL_MOVIE_MODAL,
} from "./constant";

const initialState = {
  loading: false,
  listMovie: [],
  error: null,
  detailMovie: {},
};

const listMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_MOVIE_REQUEST:
      state.loading = true;
      state.listMovie = [];
      state.error = null;
      return { ...state };
    case LIST_MOVIE_SUCCESS:
      state.loading = false;
      state.listMovie = action.data;
      state.error = null;
      return { ...state };
    case LIST_MOVIE_FAILED:
      state.loading = false;
      state.listMovie = [];
      state.error = action.error;
      return { ...state };

    case DETAIL_MOVIE_MODAL:
      if (typeof action.id === "number") {
        let index = state.listMovie.findIndex((item) => {
          return item.maPhim === action.id;
        });

        if (index !== -1) {
          state.detailMovie = state.listMovie[index];
        }
      } else {
        //nếu ko truyền id dạng số vào mà truyền object thì cho detailMovie= object đó luôn. trường hopẹ dành cho mở modal carousel từ homepage
        state.detailMovie = action.id;
      }

      return { ...state };

    default:
      return { ...state };
  }
};
export default listMovieReducer;
