import {
  LIST_HE_THONG_RAP_REQUEST,
  LIST_HE_THONG_RAP_SUCCESS,
  LIST_HE_THONG_RAP_FAILED,
  LAY_THONG_TIN_LICH_CHIEU_REQUEST,
  LAY_THONG_TIN_LICH_CHIEU_SUCCESS,
  LAY_THONG_TIN_LICH_CHIEU_FAILED,
} from "./constant";

const initialState = {
  loading: false,
  listHeThongRap: [],
  listHeThongLichChieu: [],
  error: null,
};

const listHeThongRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_HE_THONG_RAP_REQUEST:
    case LAY_THONG_TIN_LICH_CHIEU_REQUEST:
      state.loading = true;
      state.listHeThongRap = [];
      state.listHeThongLichChieu = [];
      state.error = null;
      return { ...state };

    case LIST_HE_THONG_RAP_SUCCESS:
      state.loading = false;
      state.listHeThongRap = action.data;
      return { ...state };
    case LAY_THONG_TIN_LICH_CHIEU_SUCCESS:
      state.listHeThongLichChieu = action.data;
      return { ...state };

    case LIST_HE_THONG_RAP_FAILED:
      state.listHeThongRap = [];
      state.error = action.error;
      return { ...state };
    case LAY_THONG_TIN_LICH_CHIEU_FAILED:
      state.listHeThongLichChieu = [];
      state.error = action.error;
      return { ...state };

    default:
      return { ...state };
  }
};

export default listHeThongRapReducer;
