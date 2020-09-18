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

  getAccountList: () => {
    const uri = "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09";
    return axiosClient.get(uri);
  },

  postAddAccount: (user, token) => {
    const uri = "/QuanLyNguoiDung/ThemNguoiDung";
    const config = {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    };
    return axiosClient.post(uri, user, config);
  },

  deleteAccount: (taiKhoan, token) => {
    const uri = `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`;
    const config = {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    };
    return axiosClient.delete(uri, config);
  },

  // {
  //   "taiKhoan": "boyz",
  //   "matKhau": "123456",
  //   "email": "DuyQuang@gmail.com",
  //   "soDt": "123456",
  //   "maNhom": "GP09",
  //   "maLoaiNguoiDung": "QuanTri",
  //   "hoTen": "Duy Quang"
  // }
  editAccount: (user, token) => {
    const uri = `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    const config = {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    };
    return axiosClient.put(uri, user, config);
  },

  //info= {taiKhoan: '' }
  getAccountInfo: (info) => {
    const uri = `/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return axiosClient.post(uri, info);
  },
};

export default usersApi;
