import {
  LIST_HE_THONG_RAP_REQUEST,
  LIST_HE_THONG_RAP_SUCCESS,
  LIST_HE_THONG_RAP_FAILED,
} from "./constant";

const initialState = {
  loading: false,
  listHeThongRap: [],
  error: null,
};

const listHeThongRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_HE_THONG_RAP_REQUEST:
      state.loading = true;
      state.listHeThongRap = [];
      state.error = null;
      return { ...state };

    case LIST_HE_THONG_RAP_SUCCESS:
      state.loading = false;
      state.listHeThongRap = action.data;
      state.error = null;
      return { ...state };

    case LIST_HE_THONG_RAP_FAILED:
      state.loading = false;
      state.listHeThongRap = [];
      state.error = action.error;
      return { ...state };

    default:
      return { ...state };
  }
};

export default listHeThongRapReducer;
