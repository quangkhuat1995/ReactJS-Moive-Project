import { SIGN_UP_FAILED, SIGN_UP_SUCCESS, SIGN_UP_REQUEST } from "./constant";
import usersApi from "../../../../api/usersApi";

const actSignUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

//user data duoc post len sever
// "taiKhoan": "string",
// "matKhau": "string",
// "email": "string",
// "soDt": "string",
// "maNhom": "GP09",
// "maLoaiNguoiDung": "KhachHang",

const actSignUpSuccess = (user) => {
  return {
    type: SIGN_UP_SUCCESS,
    user,
  };
};
const actSignUpFailed = (error) => {
  return {
    type: SIGN_UP_FAILED,
    error,
  };
};

const actFetchSignUp = (user, history) => {
  return async (dispatch) => {
    dispatch(actSignUpRequest());
    try {
      const resData = await usersApi.postSignUp(user);
      dispatch(actSignUpSuccess(resData));
      // alert("Dang ky thanh cong, bạn có thể đăng nhập");

      history.push("/login");
    } catch (error) {
      dispatch(actSignUpFailed(error));
      console.log(error.response?.data);
    }
  };
};

export { actFetchSignUp };
