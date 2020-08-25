import { DANH_SACH_LICH_CHIEU_THEO_NGAY } from "./constant";

const actSortedNgayChieuGioChieu = (ngayChieuGioChieu) => {
  return {
    type: DANH_SACH_LICH_CHIEU_THEO_NGAY,
    ngayChieuGioChieu,
  };
};

export { actSortedNgayChieuGioChieu };
