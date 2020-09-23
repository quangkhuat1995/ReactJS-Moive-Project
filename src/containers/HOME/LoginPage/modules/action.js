import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "./constant";
import usersApi from "../../../../api/usersApi";
import { USER_KEY } from "../../../../constants/config";

const actLoginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
//post user = {taiKhoan:"string", matKhau: "string"}
const actLoginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};
const actLoginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error,
  };
};

// resData = {
//   "taiKhoan": "dpnguyen",
//   "hoTen": "Nguyen",
//   "email": "dpnguyen@gmail.com",
//   "soDT": "0938564278",
//   "maNhom": "GP01",
//   "maLoaiNguoiDung": "QuanTri",
//   "accessToken": "eyJhbG...."
// }
const actFetchUserLogin = (user, history) => {
  return async (dispatch) => {
    try {
      dispatch(actLoginRequest());
      const resData = await usersApi.postLogIn(user);
      // console.log(resData);
      dispatch(actLoginSuccess(resData));

      if (resData.maLoaiNguoiDung === "KhachHang") {
        // alert("dang nhap thanh cong");
        localStorage.setItem(USER_KEY, JSON.stringify(resData));
        //TODO: chuyển hướng về trang trước đó
        history.push("/");
        // history.goBack();
      } else {
        alert("Không thể đăng nhập bằng tài khoản này");
      }
    } catch (error) {
      dispatch(actLoginFailed(error));
      // console.log(error.response?.data);
    }
  };
};

export { actFetchUserLogin };
