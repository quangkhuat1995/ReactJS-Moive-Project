import axiosClient from "./axiosClient";
const theatersApi = {
  //lấy thông tin toàn bộ danh sách hệ thống rạp
  getThongTinHeThongRap: () => {
    const uri = "/QuanLyRap/LayThongTinHeThongRap";
    return axiosClient.get(uri);
  },

  //lấy toàn bộ thông tin lịch chiếu của tất cả hệ thống
  getThongTinLichChieuHeThongRap: () => {
    const uri = "/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09";
    return axiosClient.get(uri);
  },

  //thông tin của 1 bộ phim, kèm theo thông tin các rạp có chiếu phim đó
  getThongTinLichChieuPhim: (maPhim) => {
    const uri = `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    return axiosClient.get(uri);
  },
};

export default theatersApi;
