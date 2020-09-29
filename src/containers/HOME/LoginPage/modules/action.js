import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "./constant";
import usersApi from "../../../../api/usersApi";
import { USER_KEY } from "../../../../constants/config";
import Swal from "sweetalert2";

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
const actLogout = (e) => {
  return (dispatch) => {
    e.persist();
    Swal.fire({
      title: "Bạn có chắc muốn đăng xuất?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Đã đăng xuất", "Cám ơn bạn đã sử dụng Tix.", "success");
        dispatch({ type: LOG_OUT });
      } else {
        e.preventDefault();
      }
    });
  };
  // return {
  //   type: LOG_OUT,
  // };
};
const findPrevPathname = (history = {}) => {
  if (history.location?.state?.from) {
    console.log(history.location.state.from.pathname);
    return history.location.state.from.pathname;
  }
  return "/";
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
    dispatch(actLoginRequest());
    try {
      const resData = await usersApi.postLogIn(user);
      // console.log(resData);
      dispatch(actLoginSuccess(resData));

      if (resData.maLoaiNguoiDung === "KhachHang") {
        // alert("dang nhap thanh cong");
        localStorage.setItem(USER_KEY, JSON.stringify(resData));

        history.push(`${findPrevPathname(history)}`);
      } else {
        alert("Không thể đăng nhập bằng tài khoản này");
      }
    } catch (error) {
      dispatch(actLoginFailed(error));
      // console.log(error.response?.data);
    }
  };
};

// const actLogout = () => {
//   ;
// };

export { actFetchUserLogin, actLogout };
