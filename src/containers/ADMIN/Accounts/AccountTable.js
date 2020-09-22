import React from "react";

import usersApi from "../../../api/usersApi";
import MyTable from "../MyTable.js";

const validateEmail = (email) => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
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
  return (
    <>
      <MyTable
        title="Account List"
        tableType="Account Table"
        columns={columns}
        // data={accountList}
        // api={usersApi}
        getAPI={usersApi.getAccountList}
        addAPI={usersApi.postAddAccount}
        updateAPI={usersApi.editAccount}
        deleteAPI={usersApi.deleteAccount}
      />
    </>
  );
}

export default AccountTable;
