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
  /**TODO đọc lại docs chỗ này */
  postDatVe: (data, token) => {
    const uri = `/QuanLyDatVe/DatVe`;
    const config = {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    };
    return axiosClient.post(uri, data, config); //tham số thứ 3 phải là config
  },

  // {
  //   "maPhim": 0,
  //   "ngayChieuGioChieu": "string", // dd/mm/yyyy 10:10:00
  //   "maRap": 0,
  //   "giaVe": 0
  // }
  postTaoLichChieu: (data, token) => {
    const uri = `/QuanLyDatVe/TaoLichChieu`;
    const config = {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    };
    return axiosClient.post(uri, data, config);
  },
};

export default bookingApi;
