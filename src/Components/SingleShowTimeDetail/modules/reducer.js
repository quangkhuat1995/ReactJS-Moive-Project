import { DANH_SACH_LICH_CHIEU_THEO_NGAY } from "./constant";

const initialState = {
  sortedLichChieuTheoNgay: [],
};

const sortedNgayChieuReducer = (state = initialState, action) => {
  switch (action.type) {
    case DANH_SACH_LICH_CHIEU_THEO_NGAY:
      return { ...state };
    default:
      return { ...state };
  }
};
