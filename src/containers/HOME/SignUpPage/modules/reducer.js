import { SIGN_UP_FAILED, SIGN_UP_SUCCESS, SIGN_UP_REQUEST } from "./constant";

const initialState = {
  loading: false,
  user: {},
  error: null,
};

const userSignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      state.loading = true;
      state.user = action.user;
      state.error = null;
      return { ...state };

    case SIGN_UP_SUCCESS:
      state.loading = false;
      state.user = action.user;
      state.error = null;
      return { ...state };

    case SIGN_UP_FAILED:
      state.loading = false;
      state.user = {};
      state.error = action.error;
      return { ...state };

    default:
      return { ...state };
  }
};

export default userSignUpReducer;
