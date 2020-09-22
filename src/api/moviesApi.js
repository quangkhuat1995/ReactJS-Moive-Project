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

  // postImages: (fileImg, token) => {
  //   const uri = `/QuanLyPhim/UploadHinhAnhPhim`;
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   return axiosClient.post(uri, fileImg, config);
  // },

  postThemPhim: (movie) => {
    const uri = `/QuanLyPhim/ThemPhimUploadHinh`;
    //trong obj movie có key hinhAnh là file nên phải chuyển sang formData
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post(uri, formData);
  },

  postCapNhatPhim: (movie) => {
    const uri = `/QuanLyPhim/CapNhatPhimUpload`;
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }

    console.log(formData.get("hinhAnh"));

    return axiosClient.post(uri, formData);
  },

  deleteMovie: (maPhim) => {
    const uri = `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;

    return axiosClient.delete(uri);
  },
};

export default moviesApi;
