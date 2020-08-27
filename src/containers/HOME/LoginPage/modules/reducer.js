import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "./constant";

const initialState = {
  loading: false,
  user: null, //obj
  error: null,
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      state.loading = true;
      state.user = action.user;
      state.error = null;
      return { ...state };

    case LOGIN_SUCCESS:
      state.loading = false;
      state.user = action.user;
      state.error = null;
      return { ...state };

    case LOGIN_FAILED:
      state.loading = false;
      state.user = null;
      state.error = action.error;
      return { ...state };

    default:
      return { ...state };
  }
};

export default userLoginReducer;
