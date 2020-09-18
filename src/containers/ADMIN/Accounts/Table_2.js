import MaterialTable from "material-table";
import PropTypes from "prop-types";
import React, { useEffect, forwardRef } from "react";
import { connect } from "react-redux";
import {
  actFetchAddAccount,
  actFetchDeleteAccount,
  actFetchGetListAccount,
  actFetchEditAccount,
} from "./modules/actions";
import useMedia from "./../../../Hook/useMedia";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { useState } from "react";
import usersApi from "../../../api/usersApi";
// import Alert from "@material-ui/";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const validateEmail = (email) => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
};
const getToken = () => {
  const userAdmin = localStorage.getItem("userAdmin");
  if (userAdmin) {
    return JSON.parse(userAdmin).accessToken;
  }
  return null;
};

const getData = (query, handleAction) => {
  return new Promise((resovle, reject) => {
    Promise.resolve(handleAction).then((data) => {
      console.log(data);

      // const TableData = data.map((r) => ({ ...r }));
      resovle({
        // data: data,
        // // page: query.page,
        // // totalCount,
      });
    });
  });
};
const columns = [
  {
    title: "Tài khoản",
    field: "taiKhoan",
    readonly: true,
    // editable: "onAdd",
    //  validate: rowData =>
  },
  { title: "Mật khẩu", field: "matKhau" },
  {
    title: "Họ tên",
    field: "hoTen",
    readonly: true,
    //  editable: "onAdd"
  },
  { title: "Email", field: "email" },
  { title: "SĐT", field: "soDt" },
  {
    title: "Loại",
    field: "maLoaiNguoiDung",
    lookup: { QuanTri: "Admin", KhachHang: "User" },
    initialEditValue: "KhachHang",
  },
];

function AccountTable(props) {
  const isMobile = useMedia("(max-width:768px)");
  const [accountList, setAccountList] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const {
    listAccount,
    error,
    fetchListAccount,
    fetchDeleteAccount,
    fetchAddAccount,
    fetchEditAccount,
    account_delete,
    account_edit,
  } = props;

  useEffect(() => {
    // fetchListAccount();
    usersApi
      .getAccountList()
      .then((res) => {
        setAccountList(res);
      })
      .catch((error) => console.log("Error"));
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    newData.maNhom = "GP09";

    //validation
    let errorList = [];
    // if(newData.first_name === ""){
    //   errorList.push("Please enter first name")
    // }
    // if(newData.last_name === ""){
    //   errorList.push("Please enter last name")
    // }
    // if(newData.email === "" || validateEmail(newData.email) === false){
    //   errorList.push("Please enter a valid email")
    // }

    if (errorList.length < 1) {
      // valid
      usersApi
        .editAccount(newData, getToken())
        .then((res) => {
          const accountListUpdate = [...accountList];
          const index = oldData.tableData.id;
          accountListUpdate[index] = newData;

          //update lai Table UI
          setAccountList([...accountListUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };
  const handleRowAdd = (newData, resolve) => {
    newData.maNhom = "GP09";
    //validation
    let errorList = [];
    // if(newData.first_name === undefined){
    //   errorList.push("Please enter first name")
    // }
    // if(newData.last_name === undefined){
    //   errorList.push("Please enter last name")
    // }
    // if(newData.email === undefined || validateEmail(newData.email) === false){
    //   errorList.push("Please enter a valid email")
    // }

    if (errorList.length < 1) {
      //no error
      usersApi
        .postAddAccount(newData, getToken())
        .then((res) => {
          let accountListToAdd = [...accountList];
          accountListToAdd.unshift(newData);
          setAccountList(accountListToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          console.log(error?.response?.data);

          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    usersApi
      .deleteAccount(oldData.taiKhoan, getToken())
      .then((res) => {
        const accountListDelete = [...accountList];
        const index = oldData.tableData.id;
        accountListDelete.splice(index, 1);
        setAccountList([...accountListDelete]);
        resolve();
      })
      .catch((error) => {
        console.log(error?.response?.data);
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };
  if (error) {
    console.log("LỖI", error?.response?.data);
    // alert(error?.response?.data);
  }

  // if (account_delete) console.log(account_delete);
  // if (account_edit) console.log(account_edit);
  return (
    <>
      <MaterialTable
        title="Account List"
        icons={tableIcons}
        localization={{
          body: {
            editRow: {
              deleteText:
                "Dữ liệu bị xóa sẽ không thể khôi phục. Bạn có chắc muốn xóa?",
            },
          },
        }}
        columns={columns}
        data={accountList}
        options={{
          headerStyle: { fontWeight: "900" },
          addRowPosition: "first",
          filtering: true,
          // padding: isMobile ? "dense" : "default",
          padding: "dense",
          maxBodyHeight: "70vh",
          rowStyle: (rowData, idx, num) => ({
            background: idx % 2 ? "#c7c6ca" : "initial",
          }),
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resovle) => {
              handleRowAdd(newData, resovle);
            }),
          /**
           * EDIT
           */

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          /**
           * DELETE
           */
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve);
              // return reject(error);
            }),
        }}
      />
      <div>
        {iserror && (
          <div className="alert alert-danger">
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>;
            })}
          </div>
        )}
      </div>
    </>
  );
}

AccountTable.propTypes = {
  listAccount: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    listAccount: state.accountReducer.listAccount,
    error: state.accountReducer.error,
    account_delete: state.accountReducer.account_delete,
    account_edit: state.accountReducer.account_edit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListAccount: () => {
      dispatch(actFetchGetListAccount());
    },
    fetchDeleteAccount: (taiKhoan) => {
      dispatch(actFetchDeleteAccount(taiKhoan));
    },
    fetchAddAccount: (taiKhoan) => {
      dispatch(actFetchAddAccount(taiKhoan));
    },
    fetchEditAccount: (user) => {
      dispatch(actFetchEditAccount(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);
