import { SIGN_UP_FAILED, SIGN_UP_SUCCESS, SIGN_UP_REQUEST } from "./constant";
import { callAPI } from "../../../../callAPI";
import { requests } from "../../../../requests";

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
// "maNhom": "string",
// "maLoaiNguoiDung": "string",

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
  return (dispatch) => {
    dispatch(actSignUpRequest());
    callAPI(requests(null, null, null).dangKy, "POST", user)
      .then((result) => {
        dispatch(actSignUpSuccess(result.data));
        alert("Dang ky thanh cong");
        // history.goBack();
        // history.push("/login");
      })
      .catch((error) => {
        dispatch(actSignUpFailed(error));
        // history.push("/login");
        history.goBack();
      });
  };
};

export { actFetchSignUp };
