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

  postAddAccount: (user) => {
    const uri = "/QuanLyNguoiDung/ThemNguoiDung";

    return axiosClient.post(uri, user);
  },

  deleteAccount: (taiKhoan) => {
    const uri = `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`;

    return axiosClient.delete(uri);
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
  editAccount: (user) => {
    const uri = `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;

    return axiosClient.put(uri, user);
  },

  //info= {taiKhoan: '' }
  getAccountInfo: (info) => {
    const uri = `/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return axiosClient.post(uri, info);
  },
};

export default usersApi;
