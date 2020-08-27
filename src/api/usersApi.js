import axiosClient from "./axiosClient";

const usersApi = {
  //post user:object gồm taiKhoan, matKhau, email,...
  postSignUp: (user) => {
    const uri = "/QuanLyNguoiDung/DangKy";
    return axiosClient.post(uri, user);
  },

  //post user:object taiKhoan, matKhau => nhận về data có accessToken
  postLogIn: (user) => {
    const uri = "/QuanLyNguoiDung/DangNhap";
    return axiosClient.post(uri, user);
  },
};

export default usersApi;
