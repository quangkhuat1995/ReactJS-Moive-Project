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
    return axiosClient.post(uri, data, token); //tham số thứ 3 phải là config?
  },
};

export default bookingApi;
