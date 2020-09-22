import axiosClient from "./axiosClient";
const bookingApi = {
  //lấy thông tin phòng vé của 1 bộ phim
  getDanhSachPhongVe: (maLichChieu) => {
    const uri = `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    return axiosClient.get(uri);
  },

  //post dat ve
  // data= {
  //   "maLichChieu": 0,
  //   "danhSachVe": [
  //     {
  //       "maGhe": 0,
  //       "giaVe": 0
  //     }
  //   ],
  //   "taiKhoanNguoiDung": "string"
  // }
  postDatVe: (data) => {
    const uri = `/QuanLyDatVe/DatVe`;

    return axiosClient.post(uri, data);
  },

  // {
  //   "maPhim": 0,
  //   "ngayChieuGioChieu": "string", // dd/mm/yyyy 10:10:00
  //   "maRap": 0,
  //   "giaVe": 0
  // }
  postTaoLichChieu: (data) => {
    const uri = `/QuanLyDatVe/TaoLichChieu`;

    return axiosClient.post(uri, data);
  },
};

export default bookingApi;
