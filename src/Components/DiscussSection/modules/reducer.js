import { FAKE_IMG } from "../../../constants/config";
import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILED,
  POST_REVIEWS_REQUEST,
  POST_REVIEWS_SUCCESS,
  POST_REVIEWS_FAILED,
} from "./constant";

const initialState = {
  loading: false,
  posts: [],
  err: null,

  //avarate point;
  totalPoint: 0,
  //number of people comment
  people: 1, //tránh chia 0
};

const reviewsReducer = (state = initialState, action) => {
  const { type, data, err, newPost } = action;
  switch (type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        err: null,
        posts: [],
      };

    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        err: null,
        posts: data,

        totalPoint: data.reduce((acc, item) => acc + parseInt(item.point), 0),
        people: data.length,
      };
    case GET_REVIEWS_FAILED:
      return {
        ...state,
        loading: false,
        posts: [],
        err,
      };

    case POST_REVIEWS_REQUEST:
      return { ...state };
    case POST_REVIEWS_SUCCESS:
      newPost.avatar = FAKE_IMG; //keep current avatar
      return {
        ...state,
        posts: [...state.posts, newPost],
        people: state.people + 1,

        totalPoint: parseInt(state.totalPoint) + parseInt(newPost.point),
      };
    case POST_REVIEWS_FAILED:
      return { ...state };

    default:
      return { ...state };
  }
};

export default reviewsReducer;
