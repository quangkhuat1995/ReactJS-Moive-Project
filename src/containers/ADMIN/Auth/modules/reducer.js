import {
  AUTH_ADMIN_REQUEST,
  AUTH_ADMIN_SUCCESS,
  AUTH_ADMIN_FAILED,
} from "./constant";

let initialState = {
  loading: false,
  user: {},
  error: null,
};

const authAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ADMIN_REQUEST:
      state.loading = true;
      state.user = {};
      state.error = null;
      return { ...state };

    case AUTH_ADMIN_SUCCESS:
      state.loading = false;
      state.user = action.data;
      state.error = null;
      return { ...state };

    case AUTH_ADMIN_FAILED:
      state.loading = false;
      state.user = {};
      state.error = action.error;
      return { ...state };

    default:
      return { ...state };
  }
};

export default authAdminReducer;
