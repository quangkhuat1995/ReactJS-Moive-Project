import axiosClient from "./axiosClient";
const moviesApi = {
  //lấy thông tin toàn bộ danh sách phim
  getDanhSachPhim: () => {
    const uri = "/QuanLyPhim/LayDanhSachPhim?maNhom=GP09";
    return axiosClient.get(uri);
  },

  //lấy thông tin của 1 phim, bao gồm 1 mảng lichChieu<obj> không phân biệt cụm rạp
  getThongTinPhim: (maPhim) => {
    const uri = `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
    return axiosClient.get(uri);
  },

  //không co param sẽ 1 trang, 10 phần tử
  getDanhSachPhimPhanTrang: (param) => {
    const uri = `/QuanLyPhim/LayDanhSachPhimPhanTrang`;
    // param = ?maNhom=GP09&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    return axiosClient.get(uri, { param });
  },

  postThemPhim: (movie, token) => {
    const uri = `/QuanLyPhim/ThemPhim`;
    const config = {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    };
    return axiosClient.post(uri, movie, config);
  },

  postCapNhatPhim: (movie, token) => {
    const uri = `/QuanLyPhim/CapNhatPhim`;
    const config = {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    };
    return axiosClient.post(uri, movie, config);
  },

  deleteMovie: (maPhim, token) => {
    const uri = `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    const config = {
      headers: {
        ["Authorization"]: `Bearer ${token}`,
      },
    };
    return axiosClient.delete(uri, config);
  },
};

export default moviesApi;
