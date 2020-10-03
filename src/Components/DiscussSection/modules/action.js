import newsApi from "../../../api/newsApi";
import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILED,
  POST_REVIEWS_REQUEST,
  POST_REVIEWS_SUCCESS,
  POST_REVIEWS_FAILED,
} from "./constant";

const actGetReviews = () => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const resData = await newsApi.getDiscussPost();

      dispatch(success(resData.data));
    } catch (error) {
      dispatch(failed(error));
      console.log(error);
    }
  };
  function request() {
    return {
      type: GET_REVIEWS_REQUEST,
    };
  }
  function success(data) {
    return {
      type: GET_REVIEWS_SUCCESS,
      data,
    };
  }
  function failed(err) {
    return {
      type: GET_REVIEWS_FAILED,
      err,
    };
  }
};

const actPostReviews = (newPost) => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const resData = await newsApi.postDiscuss(newPost);

      dispatch(success(resData.data));
    } catch (error) {
      dispatch(failed(error));
    }
  };

  function request() {
    return {
      type: POST_REVIEWS_REQUEST,
    };
  }
  function success(newPost) {
    return {
      type: POST_REVIEWS_SUCCESS,
      newPost,
    };
  }
  function failed(err) {
    return {
      type: POST_REVIEWS_FAILED,
      err,
    };
  }
};
export { actGetReviews, actPostReviews };
