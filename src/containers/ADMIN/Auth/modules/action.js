import {
  AUTH_ADMIN_REQUEST,
  AUTH_ADMIN_SUCCESS,
  AUTH_ADMIN_FAILED,
} from "./constant";
import Axios from "axios";
const actAuthRequest = () => {
  return {
    type: AUTH_ADMIN_REQUEST,
  };
};
const actAuthSuccess = (user) => {
  return {
    type: AUTH_ADMIN_SUCCESS,
    user,
  };
};
const actAuthFailed = (error) => {
  return {
    type: AUTH_ADMIN_FAILED,
    error,
  };
};
const actFetchAdminLogin = (user, history) => {
  return (dispatch) => {
    dispatch(actAuthRequest());
    Axios({
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: user,
    })
      .then((result) => {
        dispatch(actAuthSuccess(result.data));
        //dua xuong localStorge
        if (result.data.maLoaiNguoiDung === "QuanTri") {
          localStorage.setItem("userAdmin", JSON.stringify(result.data));
          //sau do, thanh cong thi chuyen huong sang trang dashboard
          history.push("/dashboard");
        } else {
          alert("Tai khoan khong co quyen truy cap");
        }
      })
      .catch((error) => {
        dispatch(actAuthFailed(error));
      });
  };
};

export { actFetchAdminLogin };
