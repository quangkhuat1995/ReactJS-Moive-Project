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

const getToken = () => {
  const userAdmin = localStorage.getItem("userAdmin");
  if (userAdmin) {
    return JSON.parse(userAdmin).accessToken;
  }
  return null;
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

  const [gridData, setGridData] = useState({
    data: [],
    columns,
    resolve: () => {},
    updatedAt: new Date(),
  });

  useEffect(() => {
    // fetchListAccount();
    usersApi
      .getAccountList()
      .then((res) => {
        setGridData((state) => ({
          ...state,
          data: res,
        }));
      })
      .catch((error) => console.log("Error"));
    // setGridData((state) => ({
    //   ...state,
    //   data: listAccount,
    // }));
  }, []);
  console.log(gridData);
  // console.log(listAccount);

  useEffect(() => {
    gridData.resolve();
    console.log("RESOLVE AT:", gridData.updatedAt);
  }, [gridData]);

  const onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      newData.maNhom = "GP09";
      const data = [...gridData.data];
      data.unshift(newData);
      const updatedAt = new Date();

      usersApi
        .postAddAccount(newData, getToken())
        .then((res) => {
          setGridData({ ...gridData, data, updatedAt, resolve });
          // alert(JSON.stringify(res));
        })
        .catch((error) => {
          alert(error?.response?.data);
          console.log(error?.response?.data);
          reject(); //keep input open
        });
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      newData.maNhom = "GP09";

      const data = [...gridData.data];
      const index = data.indexOf(oldData);
      // replace old data
      data[index] = newData;
      const updatedAt = new Date();

      usersApi
        .postAddAccount(newData, getToken())
        .then((res) => {
          setGridData({ ...gridData, data, updatedAt, resolve });
        })
        .catch((error) => {
          console.log(error?.response?.data);
          alert(error?.response?.data);
          reject();
        });
    });

  const onRowDelete = (oldData) =>
    new Promise((resolve, reject) => {
      let data = [...gridData.data];
      const index = data.indexOf(oldData);
      data.splice(index, 1);
      const updatedAt = new Date();

      usersApi
        .deleteAccount(oldData.taiKhoan, getToken())
        .then((res) => {
          setGridData({ ...gridData, data, updatedAt, resolve });
        })
        .catch((error) => {
          console.log(error?.response?.data);
          alert(error?.response?.data);

          reject();
        });
    });

  return (
    <MaterialTable
      title="Your Title"
      icons={tableIcons}
      columns={gridData.columns}
      data={gridData.data}
      localization={{
        body: {
          editRow: {
            deleteText:
              "Dữ liệu bị xóa sẽ không thể khôi phục. Bạn có chắc muốn xóa?",
          },
        },
      }}
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
        isEditable: (rowData) => true,
        isDeletable: (rowData) => true,
        onRowAdd: onRowAdd,
        onRowUpdate: onRowUpdate,
        onRowDelete: onRowDelete,
      }}
    />
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
