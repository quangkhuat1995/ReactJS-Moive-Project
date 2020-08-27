import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "./constant";
import { requests } from "../../../../requests";
import { callAPI } from "../../../../callAPI";

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

// result.data = {
//   "taiKhoan": "dpnguyen",
//   "hoTen": "Nguyen",
//   "email": "dpnguyen@gmail.com",
//   "soDT": "0938564278",
//   "maNhom": "GP01",
//   "maLoaiNguoiDung": "QuanTri",
//   "accessToken": "eyJhbG...."
// }
const actFetchUserLogin = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    callAPI(requests(null, null, null).dangNhap, "POST", user)
      .then((result) => {
        //thanh cong
        dispatch(actLoginSuccess(result.data));
        //dua xuong localStorage, xoa local trc khi them vao
        if (result.data) {
          if (localStorage.getItem("userUser")) {
            localStorage.removeItem("userUser");
          }
          localStorage.setItem("userUser", JSON.stringify(result.data));

          // alert("dang nhap thanh cong");
          console.log(history);
          history.goBack();
        }
      })
      .catch((error) => {
        dispatch(actLoginFailed(error));
        // console.log(error.response.data);
      });
  };
};

export { actFetchUserLogin };
