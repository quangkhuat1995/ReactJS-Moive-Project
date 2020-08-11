import {
  LIST_HE_THONG_RAP_REQUEST,
  LIST_HE_THONG_RAP_SUCCESS,
  LIST_HE_THONG_RAP_FAILED,
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

const actFetchListHeThongRap = () => {
  return (dispatch) => {
    dispatch(actListHeThongRapRequest());
    callAPI(requests().layThongTinHeThongRap, "GET")
      .then((result) => {
        // console.log(result.data);
        // this.setState({
        //   heThongRap: result.data,
        // });
        dispatch(actListHeThongRapSuccess(result.data));
      })
      .catch((error) => dispatch(actListHeThongRapFailed(error)));
  };
};

export { actFetchListHeThongRap };
