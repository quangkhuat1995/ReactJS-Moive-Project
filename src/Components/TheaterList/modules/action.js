import {
  LIST_HE_THONG_RAP_REQUEST,
  LIST_HE_THONG_RAP_SUCCESS,
  LIST_HE_THONG_RAP_FAILED,
  LAY_THONG_TIN_LICH_CHIEU_REQUEST,
  LAY_THONG_TIN_LICH_CHIEU_SUCCESS,
  LAY_THONG_TIN_LICH_CHIEU_FAILED,
} from "./constant";

import theatersApi from "../../../api/theatersApi";

const actListHeThongRapRequest = () => {
  return {
    type: LIST_HE_THONG_RAP_REQUEST,
  };
};

const actListHeThongRapSuccess = (data) => {
  return {
    type: LIST_HE_THONG_RAP_SUCCESS,
    data,
  };
};

const actListHeThongRapFailed = (error) => {
  return {
    type: LIST_HE_THONG_RAP_FAILED,
    error,
  };
};
const actThongTinLichChieuRequest = () => {
  return {
    type: LAY_THONG_TIN_LICH_CHIEU_REQUEST,
  };
};

const actThongTinLichChieuSuccess = (data) => {
  return {
    type: LAY_THONG_TIN_LICH_CHIEU_SUCCESS,
    data,
  };
};

const actThongTinLichChieuFailed = (error) => {
  return {
    type: LAY_THONG_TIN_LICH_CHIEU_FAILED,
    error,
  };
};
const actFetchThongTinLichChieu = () => {
  return async (dispatch) => {
    dispatch(actThongTinLichChieuRequest());

    try {
      const resData = await theatersApi.getThongTinLichChieuHeThongRap();
      dispatch(actThongTinLichChieuSuccess(resData));
      // console.log(resData);
    } catch (error) {
      dispatch(actThongTinLichChieuFailed(error));
    }
  };
};

const actFetchListHeThongRap = () => {
  return async (dispatch) => {
    dispatch(actListHeThongRapRequest());
    try {
      const resData = await theatersApi.getThongTinHeThongRap();
      dispatch(actListHeThongRapSuccess(resData));
      // console.log(resData);
    } catch (error) {
      dispatch(actListHeThongRapFailed(error));
    }
  };
};

export { actFetchListHeThongRap, actFetchThongTinLichChieu };
