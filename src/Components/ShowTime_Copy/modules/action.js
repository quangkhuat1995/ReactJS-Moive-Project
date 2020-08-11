import {
  LIST_MOVIE_REQUEST,
  LIST_MOVIE_SUCCESS,
  LIST_MOVIE_FAILED,
  DETAIL_MOVIE_MODAL,
} from "./constant";
import { callAPI } from "../../../callAPI";
import { requests } from "../../../requests";

const actListMovieRequest = () => {
  return {
    type: LIST_MOVIE_REQUEST,
  };
};

const actListMovieSuccess = (data) => {
  return {
    type: LIST_MOVIE_SUCCESS,
    data,
  };
};
const actListMovieFailed = (error) => {
  return {
    type: LIST_MOVIE_FAILED,
    error,
  };
};

const actFetchListMoive = () => {
  return (dispatch) => {
    dispatch(actListMovieRequest());
    callAPI(requests().layDanhSachPhim, "GET")
      .then((result) => {
        // this.setState({
        //   listMovie: result.data,
        // });
        dispatch(actListMovieSuccess(result.data));
      })
      .catch((error) => {
        dispatch(actListMovieFailed(error));
      });
  };
};

const actFindMovieTrailer = (id) => {
  return {
    type: DETAIL_MOVIE_MODAL,
    id,
  };
};

export { actFetchListMoive, actFindMovieTrailer };
