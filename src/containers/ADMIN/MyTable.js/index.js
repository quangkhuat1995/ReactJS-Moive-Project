import MaterialTable from "material-table";
import React, { useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
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
import useTable from "./useTable";
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

const findUpatedKey = (newData = {}, oldData = {}) => {
  const updatedKeys = Object.keys(newData).filter((key, idx) => {
    return oldData[key] !== newData[key];
  });
  updatedKeys.pop(); // bỏ key tableData
  return updatedKeys.join(", ");
};
const alertCase = (caseType, tableType, res, newData = {}, oldData = {}) => {
  switch (caseType) {
    case "update":
      if (tableType === "Account Table") {
        alert(
          `Đã cập nhật ${findUpatedKey(newData, oldData)} người dùng: ${
            res.taiKhoan
          }`
        );
      } else if (
        tableType === "Movie Table" ||
        tableType === "Showtime Table"
      ) {
        alert(
          `Đã cập nhật ${findUpatedKey(newData, oldData)} phim: ${res.tenPhim}`
        );
      }
      break;

    case "delete":
      if (tableType === "Account Table") {
        alert(`${res} tài khoản: ${oldData.taiKhoan}`);
      } else if (
        tableType === "Movie Table" ||
        tableType === "Showtime Table"
      ) {
        alert(`${res} phim: ${oldData.tenPhim}`);
      }
      break;

    case "add":
      if (tableType === "Account Table") {
        alert(`Thêm thành công người dùng: ${res.taiKhoan}`);
      } else if (
        tableType === "Movie Table" ||
        tableType === "Showtime Table"
      ) {
        alert(`Thêm thành công phim: ${res.tenPhim}`);
      }
      break;

    default:
      alert("Action done!!");
      break;
  }
};
const transformString = (text = "") => {
  return text.trim().toLowerCase().split("").join("-");
};

function MyTable(props) {
  //useTable(props.type)
  // usC;
  const { tableType, getAPI, addAPI, updateAPI, deleteAPI } = props;
  const isMobile = useMedia("(max-width:768px)");

  const {
    data,
    setData,
    callAPI,
    handleRowUpdate,
    handleRowAdd,
    handleRowDelete,
  } = useTable(tableType);

  useEffect(() => {
    callAPI(props.getAPI, null);
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [props.getAPI]);

  return (
    <>
      <MaterialTable
        title={props.title}
        icons={tableIcons}
        localization={{
          body: {
            editRow: {
              deleteText:
                "Dữ liệu bị xóa sẽ không thể khôi phục. Bạn có chắc muốn xóa?",
            },
          },
        }}
        columns={props.columns}
        data={data}
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
          ...props.customTableOption,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resovle, reject) => {
              handleRowAdd(newData, resovle, reject, props.addAPI);
            }),
          /**
           * EDIT
           */

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              // let body = {};
              // if (tableType === "Account Table") {
              //   body = { ...newData, maNhom: "GP09" };
              // } else if (tableType === "Movie Table") {
              //   body = {
              //     ...newData,
              //     maNhom: "GP09",
              //     maPhim: transformString(newData.tenPhim),
              //   };
              // }

              handleRowUpdate(
                newData,
                oldData,
                resolve,
                reject,
                props.updateAPI
              );

              // callAPI(updateAPI, { ...body }, getToken())
              //   .then((res) => {
              //     const dataUpdate = [...data];
              //     const index = oldData.tableData.id;
              //     dataUpdate[index] = body;

              //     //update lai Table UI
              //     setData([...dataUpdate]);

              //     alertCase("update", tableType, res, body, oldData);
              //     // alert(
              //     //   `Đã cập nhật ${findUpatedKey(newData, oldData)} người dùng: ${
              //     //     res.taiKhoan
              //     //   }`
              //     // );
              //     resolve();
              //   })
              //   .catch((error) => {
              //     alert(error.response.data);
              //     reject();
              //   });
            }),
          /**
           * DELETE
           */
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve, reject, props.deleteAPI);
              // // return reject(error);
              // callAPI(deleteAPI, oldData.taiKhoan, getToken())
              //   .then((res) => {
              //     const dataDelete = [...data];
              //     const index = oldData.tableData.id;
              //     dataDelete.splice(index, 1);
              //     setData([...dataDelete]);

              //     alertCase("delete", tableType, res, null, oldData);
              //     // alert(`${res}: ${oldData.taiKhoan}`);

              //     resolve();
              //   })
              //   .catch((error) => {
              //     alert(error?.response?.data);
              //     reject();
              //   });
            }),
        }}
      />
    </>
  );
}

MyTable.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  tableType: PropTypes.string.isRequired,
  customTableOption: PropTypes.object,

  getAPI: PropTypes.func.isRequired,
  addAPI: PropTypes.func.isRequired,
  updateAPI: PropTypes.func.isRequired,
  deleteAPI: PropTypes.func,
};
MyTable.defaultProps = {
  title: "Account List",
  columns: [],
  tableType: "Account Table",
  getAPI: () => {},
  addAPI: () => {},
  updateAPI: () => {},
  deleteAPI: () => {},
};
export default MyTable;
