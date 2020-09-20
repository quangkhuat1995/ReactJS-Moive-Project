import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import moviesApi from "../../../api/moviesApi";

import usersApi from "../../../api/usersApi";
import MyTable from "../MyTable.js";
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
const transformString = (text = "") => {
  return text.trim().toLowerCase().split(" ").join("-");
};
// function readURL(input) {
//   var url = input.value;
//   var ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
//   if (
//     input.files &&
//     input.files[0] &&
//     (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")
//   ) {
//     var reader = new FileReader();

//     reader.onload = function (e) {
//       $("#img").attr("src", e.target.result);
//     };

//     reader.readAsDataURL(input.files[0]);
//   } else {
//     $("#img").attr("src", "/assets/no_preview.png");
//   }
// }
const validateFunc = (rowData, field) => {
  //cho phép thực hiện xóa với mọi trường hợp
  if (rowData.tableData?.editing === "delete") return true;

  // console.log(rowData);
  //truong hợp add thì rowData là obj rỗng nên phải tạo obj rowData với key=field/ value='' để validate ngay lập tức
  if (!rowData[field]) rowData[field] = "";

  //Do nếu cập nhật những field không cho phép sẽ fail API, nên TH (field) nào đã tạo fail validateFunc này sẽ được cho pass luôn (để có thể thực hiện chức năng update và delete)
  if (
    (field === "maPhim" || field === "biDanh") &&
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
  if (field !== "danhGia" && rowData[field].length < 6) {
    return {
      isValid: false,
      helperText: `${field} quá ngắn`,
    };
  } else if (
    field === "danhGia" &&
    (parseFloat(rowData[field]) > 10 || parseFloat(rowData[field] < 0))
  ) {
    return {
      isValid: false,
      helperText: `Điểm từ  0 - 10`,
    };
  }

  return true;
};

const columns = [
  // {
  //   title: "Mã phim",
  //   field: "maPhim",
  //   // readonly: true,
  //   // editable: "onAdd",
  //   hidden: true,
  //   // validate: (rowData) => validateFunc(rowData, "maPhim"),
  // },
  {
    title: "Tên phim",
    field: "tenPhim",
    validate: (rowData) => validateFunc(rowData, "tenPhim"),
    initialEditValue: "Truyền Thuyết Quán Tiên",
  },
  // {
  //   title: "Bí danh",
  //   field: "biDanh",
  //   readonly: true,
  //   editable: "onAdd",
  //   hidden: true,
  //   validate: (rowData) => validateFunc(rowData, "biDanh"),
  // },
  {
    title: "Trailer",
    field: "trailer",
    width: "100%",
    validate: (rowData) => validateFunc(rowData, "trailer"),
    initialEditValue: "https://www.youtube.com/embed/TyfBgQKsEXs",
  },
  {
    title: "Hình ảnh",
    field: "hinhAnh",
    render: (rowData) => (
      <img
        src={rowData.hinhAnh}
        alt={rowData.tenPhim}
        style={{ width: "50px" }}
      />
    ),
    editComponent: (props) => {
      // console.log(props);
      return (
        <div
          // value={props.value || ""}
          // placeholder={props.columnDef.title}
          // onChange={(e) => {
          //   console.log(e.target.files);
          //   props.onChange(e.target.files[0]);
          // }}
          value={props.value || ""}
        >
          <input
            type="file"
            placeholder={props.columnDef.title}
            onChange={(e) => {
              console.log(e.target.files);

              document.getElementById(
                "img-upload"
              ).src = window.URL.createObjectURL(e.target.files[0]);

              props.onChange(e.target.files[0]);
            }}
          />
          <img src="" id="img-upload" style={{ width: "50px" }} />
        </div>
      );
    },
  },
  {
    title: "Mô tả",
    field: "moTa",
    width: "100%",
    initialEditValue:
      "Lấy bối cảnh Trường Sơn thời chống Mỹ, theo truyện ngắn gốc của nhà văn Xuân Thiều là năm 1966. Ba cô gái Mùi, Lan và Phượng được binh trạm trưởng giao nhiệm vụ mở quán ăn trong hang để tiếp tế cho bộ đội hành quân. Ba nữ thanh niên xung phong ở Quán Tiên, mỗi người là một mẫu phụ nữ. Mùi đàn bà, mặn mà nhưng chung thủy, kìm nén. Tuyết Lan bản năng, ngoài hiền lành trong dữ dội, mắc chứng cuồng loạn. Phượng trẻ con, vô tư nhưng sâu nặng khi yêu.",
    render: (rowData) => (
      <div style={{ width: "100%", minWidth: "500px" }}>{rowData.moTa}</div>
    ),
    editComponent: (props) => {
      // console.log(props);

      return (
        <div style={{ width: "100%", minWidth: "500px" }}>
          <textarea
            rows="10"
            style={{ width: "100%" }}
            placeholder="great movie"
            onChange={(e) => props.onChange(e.target.value)}
            defaultValue={props.value || ""}
          ></textarea>
        </div>
      );
    },
    validate: (rowData) => validateFunc(rowData, "moTa"),
  },
  // {
  //   title: "Mã nhóm",
  //   field: "maNhom",
  //   hidden: true,
  // },
  {
    title: "Ngày khởi chiếu",
    field: "ngayKhoiChieu",
    type: "date",
    initialEditValue: new Date(),
    dateSetting: { locale: "en-GB" },
    validate: (rowData) => validateFunc(rowData, "ngayKhoiChieu"),
    // render: (rowData) => {
    //   console.log(rowData);
    //   return <div>{rowData.ngayKhoiChieu}</div>;
    // },
  },
  {
    title: "Đánh giá",
    field: "danhGia",
    type: "numeric",
    initialEditValue: "7",
    validate: (rowData) => validateFunc(rowData, "danhGia"),
  },
];

function MoviesTable() {
  const isMobile = useMedia("(max-width:768px)");

  const [data, setData] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    moviesApi
      .getDanhSachPhim()
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [isChanged]);
  return (
    <>
      <MaterialTable
        title="test"
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
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resovle, reject) => {
              // handleRowAdd(newData, resovle, reject, props.addAPI);
              console.log(newData);

              const body = {
                ...newData,
                maNhom: "GP09",
                biDanh: transformString(newData.tenPhim),
                ngayKhoiChieu: new Date(
                  newData.ngayKhoiChieu
                ).toLocaleDateString("en-GB"),
              };
              // console.log(body.ngayKhoiChieu);
              // console.log(body.hinhAnh);

              // const formData = new FormData();
              // for (const key in body) {
              //   formData.append(key, body[key]);
              // }

              moviesApi
                .postThemPhim(body)
                .then((res) => {
                  alert("thêm phim thành công", res);
                  resovle();
                  setIsChanged(true);
                })
                .catch((err) => {
                  console.log("lỗi api", err.response.data);
                  reject();
                  setIsChanged(false);
                });
            }),
          /**
           * EDIT
           */

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              console.log(oldData);

              const body = {
                ...newData,
                maNhom: "GP09",
                biDanh:
                  oldData.tenPhim !== newData.tenPhim
                    ? transformString(newData.tenPhim)
                    : oldData.biDanh,
              };
              const formData = new FormData();
              for (const key in newData) {
                formData.append(key, newData[key]);
              }
              console.log("after", body);
              console.log(formData);

              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = body;
              //update lai Table UI
              setData([...dataUpdate]);

              resolve();

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
              // handleRowUpdate(
              //   newData,
              //   oldData,
              //   resolve,
              //   reject,
              //   props.updateAPI
              // );
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
              // handleRowDelete(oldData, resolve, reject, props.deleteAPI);
              // return reject(error);
              console.log("maPhim del", oldData.maPhim);

              moviesApi
                .deleteMovie(oldData.maPhim)
                .then((res) => {
                  console.log("delete response:", res);
                  resolve();
                  setIsChanged(true);
                })
                .catch((err) => {
                  console.log("error delete:", err);
                  reject();
                  setIsChanged(false);
                });
            }),
        }}
      />
    </>
  );
}

export default MoviesTable;
{
  /* <MyTable
title="Movie List"
tableType="Movie Table"
columns={columns}
customTableOption={{ filtering: false }}
getAPI={moviesApi.getDanhSachPhim}
addAPI={moviesApi.postThemPhim}
updateAPI={moviesApi.postCapNhatPhim}
// deleteAPI={moviesApi.deleteMovie}
/> */
}
