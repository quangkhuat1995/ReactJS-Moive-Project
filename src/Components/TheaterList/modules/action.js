import {
  LIST_HE_THONG_RAP_REQUEST,
  LIST_HE_THONG_RAP_SUCCESS,
  LIST_HE_THONG_RAP_FAILED,
  LAY_THONG_TIN_LICH_CHIEU_REQUEST,
  LAY_THONG_TIN_LICH_CHIEU_SUCCESS,
  LAY_THONG_TIN_LICH_CHIEU_FAILED,
} from "./constant";

import { callAPI } from "../../../callAPI";
import { requests } from "../../../requests";

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
  return (dispatch) => {
    dispatch(actThongTinLichChieuRequest());
    callAPI(requests().LayThongTinLichChieuHeThongRap, "GET")
      .then((result) => dispatch(actThongTinLichChieuSuccess(result.data)))
      .catch((error) => {
        dispatch(actThongTinLichChieuFailed(error));
      });
  };
};

const actFetchListHeThongRap = () => {
  return (dispatch) => {
    dispatch(actListHeThongRapRequest());
    callAPI(requests().layThongTinHeThongRap, "GET")
      .then((result) => {
        dispatch(actListHeThongRapSuccess(result.data));
      })
      .catch((error) => dispatch(actListHeThongRapFailed(error)));
  };
};

export { actFetchListHeThongRap, actFetchThongTinLichChieu };
