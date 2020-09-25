import { USER_KEY } from "../../../../constants/config";
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "./constant";

const user = localStorage.getItem(USER_KEY);
const initialState = {
  loading: false,
  user: null, //obj
  error: null,
  isLoggedIn: JSON.parse(user)?.maLoaiNguoiDung === "KhachHang" ? true : false,
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      state.loading = true;
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
      return { ...state };

    case LOGIN_SUCCESS:
      state.loading = false;
      state.user = action.user;
      state.isLoggedIn = true;
      state.error = null;
      return { ...state };

    case LOGIN_FAILED:
      state.loading = false;
      state.user = null;
      state.error = action.error;
      state.isLoggedIn = false;
      return { ...state };

    case LOG_OUT:
      // state.isLoggedIn = false;
      localStorage.removeItem(USER_KEY);
      return { ...initialState, isLoggedIn: false };

    default:
      return { ...state };
  }
};

export default userLoginReducer;
