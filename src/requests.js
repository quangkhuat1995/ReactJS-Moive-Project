export const requests = (
  soTrang = null,
  soPhanTuTrenTrang = null, //8
  maPhim = null
) => {
  return {
    layDanhSachPhim: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`,
    layDanhSachPhimPhanTrang: `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
    layThongTinPhim: `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
    layThongTinLichChieuPhim: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
    layThongTinHeThongRap: `/QuanLyRap/LayThongTinHeThongRap`,
    layThongTinCumRapTheoHeThong: `/QuanLyRap/LayThongTinCumRapTheoHeThong`,
    LayThongTinLichChieuHeThongRap: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09`,
    LayDanhSachPhongVe: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=`,
  };
};
