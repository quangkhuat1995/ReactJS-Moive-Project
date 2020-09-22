import {
  ACCOUNTS_REQUEST,
  ACCOUNTS_FAILED,
  GET_LIST_ACCOUNTS_SUCCESS,
  ADD_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_ACCOUNT_SUCCESS,
} from "./constants";

const initialState = {
  loading: false,
  error: null,
  account_add: null, //data trả về sau khi add account
  listAccount: [], //data trả về sau khi lấy ds account
  account_delete: null, // data nhận về sau khi xóa account (string)
  account_edit: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNTS_REQUEST:
      state.loading = true;
      //khi load lại bất kì api nào thì tất cả state về như cũ (TODO: có cần thiết???)
      // state.account_add = null;
      // state.listAccount = [];
      // state.account_delete = null;
      // state.account_edit = null;
      // state.error = null;
      return { ...state };
    /**
     * Giữ nguyên state của các success khác vẫn.
     */
    case GET_LIST_ACCOUNTS_SUCCESS:
      state.loading = false;
      state.listAccount = action.data;
      state.error = null;
      return { ...state };

    case ADD_ACCOUNT_SUCCESS:
      state.loading = false;
      state.account_add = action.data;
      state.error = null;
      return { ...state };

    case DELETE_ACCOUNT_SUCCESS:
      state.loading = false;
      state.account_delete = action.data;
      state.error = null;
      return { ...state };

    case EDIT_ACCOUNT_SUCCESS:
      state.loading = false;
      state.account_edit = action.data;
      state.error = null;
      return { ...state };

    case ACCOUNTS_FAILED:
      state.loading = false;
      // state.account_add = action.data;
      // state.listAccount = action.data;
      state.error = action.error;
      return { ...state };

    default:
      return { ...state };
  }
};

export default accountReducer;
