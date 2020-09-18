import usersApi from "../../../../api/usersApi.js";
import {
  ACCOUNTS_REQUEST,
  ACCOUNTS_FAILED,
  GET_LIST_ACCOUNTS_SUCCESS,
  ADD_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_ACCOUNT_SUCCESS,
} from "./constants";

let token = "";
const userAdmin = localStorage.getItem("userAdmin");
if (userAdmin) {
  token = JSON.parse(userAdmin).accessToken;
}

const actAccountRequest = () => {
  return {
    type: ACCOUNTS_REQUEST,
  };
};

const actAccountFailed = (error) => {
  return {
    type: ACCOUNTS_FAILED,
    error,
  };
};

const actAddAccountSuccess = (data) => {
  return {
    type: ADD_ACCOUNT_SUCCESS,
    data,
  };
};

const actGetListAccountSuccess = (data) => {
  return {
    type: GET_LIST_ACCOUNTS_SUCCESS,
    data,
  };
};

const actEditAccountSuccess = (data) => {
  return {
    type: EDIT_ACCOUNT_SUCCESS,
    data,
  };
};

const actDeleteAccountSuccess = (data) => {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    data, // nhận về string: xóa thành công
  };
};

const actFetchAddAccount = (user) => {
  return (dispatch) => {
    // dispatch(actAccountRequest());
    usersApi
      .postAddAccount(user, token)
      .then((result) => {
        dispatch(actAddAccountSuccess(result));
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err.response.data);
      });
  };
};

const actFetchGetListAccount = () => {
  return (dispatch) => {
    // dispatch(actAccountRequest());

    usersApi
      .getAccountList()
      .then((result) => {
        dispatch(actGetListAccountSuccess(result));
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err);
      });
  };
};

const actFetchDeleteAccount = (taiKhoan) => {
  return (dispatch) => {
    // dispatch(actAccountRequest());
    usersApi
      .deleteAccount(taiKhoan, token)
      .then((resData) => {
        dispatch(actDeleteAccountSuccess(resData));
      })
      .catch((err) => {
        alert(err.response.data);
        dispatch(actAccountFailed(err));
      });
  };
};

const actFetchEditAccount = (user) => {
  return (dispatch) => {
    // dispatch(actAccountRequest());
    usersApi
      .editAccount(user, token)
      .then((resData) => {
        dispatch(actEditAccountSuccess(resData));
      })
      .catch((err) => {
        alert(err.response.data);
        dispatch(actAccountFailed(err));
      });
  };
};

export {
  actFetchAddAccount,
  actFetchGetListAccount,
  actFetchDeleteAccount,
  actFetchEditAccount,
};
