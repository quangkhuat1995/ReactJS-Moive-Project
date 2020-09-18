import MaterialTable from "material-table";
import React, { useEffect, forwardRef } from "react";

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

const findUpatedKey = (newData = {}, oldData = {}) => {
  const updatedKeys = Object.keys(newData).filter((key, idx) => {
    return oldData[key] !== newData[key];
  });
  updatedKeys.pop(); // bỏ key tableData
  return updatedKeys.join(", ");
};

const validateFunc = (rowData, field) => {
  //cho phép thực hiện xóa với mọi trường hợp
  if (rowData.tableData?.editing === "delete") return true;

  // console.log(rowData);
  //truong hợp add thì rowData là obj rỗng nên phải tạo obj rowData với key=field/ value='' để validate ngay lập tức
  if (!rowData[field]) rowData[field] = "";

  //Do nếu cập nhật tài khoản sẽ fail API, nên TH tài khoản nào đã tạo fail validate sẽ được cho pass luôn (để có thể thực hiện chức năng update và delete)
  if (
    (field === "taiKhoan" || field === "hoTen") &&
    rowData[field].length >= 0 &&
    rowData.tableData?.editing // add new sẽ ko có key này nên sẽ false =>vẫn thực hiện valid 2 field trên khi add new
  ) {
    return {
      isValid: true,
      helperText: "",
    };
  }

  //TH update thì obj rowData đã có các key là field và cũng đã có giá trị
  if (rowData[field].length < 1) {
    return {
      isValid: false,
      helperText: `${field} không được để trống`,
    };
  }
  if (rowData[field].length < 6) {
    return {
      isValid: false,
      helperText: `${field} quá ngắn`,
    };
  }
  if (field === "email" && !validateEmail(rowData[field])) {
    return {
      isValid: false,
      helperText: `${field} không đúng định dạng`,
    };
  }

  return true;
};
const columns = [
  {
    title: "Tài khoản",
    field: "taiKhoan",
    readonly: true,
    editable: "onAdd",
    validate: (rowData) => validateFunc(rowData, "taiKhoan"),
  },
  {
    title: "Mật khẩu",
    field: "matKhau",
    validate: (rowData) => validateFunc(rowData, "matKhau"),
  },
  {
    title: "Họ tên",
    field: "hoTen",
    readonly: true,
    editable: "onAdd",
    validate: (rowData) => validateFunc(rowData, "hoTen"),
  },
  {
    title: "Email",
    field: "email",
    validate: (rowData) => validateFunc(rowData, "email"),
  },
  {
    title: "SĐT",
    field: "soDt",
    type: "numeric",
    validate: (rowData) => validateFunc(rowData, "soDt"),
  },
  {
    title: "Loại",
    field: "maLoaiNguoiDung",
    lookup: { QuanTri: "Admin", KhachHang: "User" },
    initialEditValue: "KhachHang",
  },
];
function AccountTable() {
  const isMobile = useMedia("(max-width:768px)");
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    usersApi
      .getAccountList()
      .then((res) => {
        setAccountList(res);
      })
      .catch((error) => console.log("Error"));
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const handleRowUpdate = (newData, oldData, resolve, reject) => {
    usersApi
      .editAccount({ ...newData, maNhom: "GP09" }, getToken())
      .then((res) => {
        const accountListUpdate = [...accountList];
        const index = oldData.tableData.id;
        accountListUpdate[index] = newData;

        //update lai Table UI
        setAccountList([...accountListUpdate]);

        alert(
          `Đã cập nhật ${findUpatedKey(newData, oldData)} người dùng: ${
            res.taiKhoan
          }`
        );
        resolve();
      })
      .catch((error) => {
        alert(error.response.data);
        reject();
      });
  };
  const handleRowAdd = (newData, resolve, reject) => {
    newData.maNhom = "GP09";

    usersApi
      .postAddAccount(newData, getToken())
      .then((res) => {
        let accountListToAdd = [...accountList];
        accountListToAdd.unshift(newData);
        setAccountList(accountListToAdd);
        alert(`Thêm thành công người dùng: ${res.taiKhoan}`);
        resolve();
      })
      .catch((error) => {
        alert(error?.response?.data);
        reject();
      });
  };

  const handleRowDelete = (oldData, resolve, reject) => {
    usersApi
      .deleteAccount(oldData.taiKhoan, getToken())
      .then((res) => {
        const accountListDelete = [...accountList];
        const index = oldData.tableData.id;
        accountListDelete.splice(index, 1);
        setAccountList([...accountListDelete]);
        alert(`${res}: ${oldData.taiKhoan}`);
        resolve();
      })
      .catch((error) => {
        alert(error?.response?.data);
        reject();
      });
  };

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
          headerStyle: {
            fontWeight: "900",
            backgroundColor: "#01579b",
            color: "#fff",
          },
          addRowPosition: "first",
          filtering: true,
          padding: isMobile ? "dense" : "default",
          // padding: "dense",
          maxBodyHeight: "70vh",
          draggable: false,
          rowStyle: (rowData, idx, num) => ({
            background: idx % 2 ? "#c7c6ca" : "initial",
          }),
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resovle, reject) => {
              handleRowAdd(newData, resovle, reject);
            }),
          /**
           * EDIT
           */

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleRowUpdate(newData, oldData, resolve, reject);
            }),
          /**
           * DELETE
           */
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve, reject);
              // return reject(error);
            }),
        }}
      />
    </>
  );
}

export default AccountTable;
