import React, { useMemo } from "react";
import { connect } from "react-redux";
import moviesApi from "../../../api/moviesApi";
import ModalPopup from "../../../Components/ModalPopup";
import { actFindMovieTrailer } from "../../HOME/HomePage/modules/action";

import MyTable from "../MyTable.js";

const validateFunc = (rowData, field) => {
  // console.log(rowData);
  //cho phép thực hiện xóa với mọi trường hợp
  if (rowData.tableData?.editing === "delete") return true;

  // console.log(rowData);
  //truong hợp add thì rowData là obj rỗng nên phải tạo obj rowData với key=field/ value='' để validate ngay lập tức
  if (field !== "hinhAnh" && !rowData[field]) rowData[field] = "";

  //TH update thì obj rowData đã có các key là field và cũng đã có giá trị
  if (field !== "hinhAnh" && rowData[field].length < 1) {
    return {
      isValid: false,
      helperText: `${field} không được để trống`,
    };
  } else if (
    field === "hinhAnh" &&
    typeof rowData[field] === "string" &&
    rowData.tableData?.editing !== "update"
  ) {
    return {
      isValid: false,
      helperText: `Bạn phải chọn hình ảnh`,
    };
  }

  if (field !== "danhGia" && rowData[field].length < 4) {
    return {
      isValid: false,
      helperText: `${field} quá ngắn`,
    };
  } else if (
    field === "danhGia" &&
    (parseFloat(rowData[field]) > 10 ||
      parseFloat(rowData[field] < 0) ||
      !String(rowData[field]).match(/^[0-9]{1,2}$/))
  ) {
    return {
      isValid: false,
      helperText: `Điểm từ  0 - 10`,
    };
  }

  return true;
};

function makeColumns(props) {
  const { actGetTrailer } = props;
  return [
    {
      title: "Tên phim",
      field: "tenPhim",
      validate: (rowData) => validateFunc(rowData, "tenPhim"),
      initialEditValue: "Truyền Thuyết Quán Tiên",
    },
    {
      title: "Trailer",
      field: "trailer",
      render: (rowData) => (
        <a
          data-toggle="modal"
          data-target="#movieTrailer"
          href={`play-trailer-phim-${rowData.biDanh}`}
          style={{ color: "#01579b", textDecoration: "underline" }}
          onClick={() => actGetTrailer(rowData)}
        >
          Watch Trailer
        </a>
      ),
      validate: (rowData) => validateFunc(rowData, "trailer"),
      initialEditValue: "https://www.youtube.com/embed/TyfBgQKsEXs",
    },
    {
      title: "Hình ảnh",
      field: "hinhAnh",
      // validate: (rowData) => validateFunc(rowData, "hinhAnh"),
      render: (rowData) => (
        <img
          src={rowData.hinhAnh}
          alt={rowData.tenPhim}
          style={{ width: "50px" }}
        />
      ),
      initialEditValue: new File([new Blob()], "file placeholder for add new"),
      editComponent: (props) => {
        return (
          <div>
            <input
              type="file"
              name="hinhAnh"
              placeholder={props.columnDef.title}
              onChange={(e) => {
                // console.log(e.target.files);

                // document.getElementById(
                //   "img-upload"
                // ).src = window.URL.createObjectURL(e.target.files[0]);
                //thay đổi value của rowData (hinhAnh)
                props.onChange(e.target.files[0]);
              }}
            />
            <img
              src={
                typeof props.value === "string"
                  ? props.value
                  : window.URL.createObjectURL(props.value)
              }
              alt="preview"
              id="img-upload"
              style={{ width: "50px" }}
            />
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
        <div style={{ width: "100%", minWidth: "350px", textAlign: "justify" }}>
          {rowData.moTa}
        </div>
      ),
      editComponent: (props) => {
        return (
          <div style={{ width: "100%", minWidth: "350px" }}>
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
    {
      title: "Ngày khởi chiếu",
      field: "ngayKhoiChieu",
      type: "date",
      initialEditValue: new Date(),
      dateSetting: { locale: "en-GB" },
      validate: (rowData) => validateFunc(rowData, "ngayKhoiChieu"),
    },
    {
      title: "Đánh giá",
      field: "danhGia",
      editable: "onUpdate",
      initialEditValue: "8",
      validate: (rowData) => validateFunc(rowData, "danhGia"),
    },
  ];
}
// const columnss = [
//   {
//     title: "Tên phim",
//     field: "tenPhim",
//     validate: (rowData) => validateFunc(rowData, "tenPhim"),
//     initialEditValue: "Truyền Thuyết Quán Tiên",
//   },
//   {
//     title: "Trailer",
//     field: "trailer",
//     width: "100%",
//     render: (rowData) => (
//       <a
//         // href={rowData.trailer}
//         // target="_blank"
//         // rel="noopener noreferrer"
//         data-toggle="modal"
//         href="#movieTrailer"
//         style={{ color: "#01579b", textDecoration: "underline" }}
//         // onClick={()}
//       >
//         Watch Trailer
//       </a>
//     ),
//     validate: (rowData) => validateFunc(rowData, "trailer"),
//     initialEditValue: "https://www.youtube.com/embed/TyfBgQKsEXs",
//   },
//   {
//     title: "Hình ảnh",
//     field: "hinhAnh",
//     // validate: (rowData) => validateFunc(rowData, "hinhAnh"),
//     render: (rowData) => (
//       <img
//         src={rowData.hinhAnh}
//         alt={rowData.tenPhim}
//         style={{ width: "50px" }}
//       />
//     ),
//     initialEditValue: new File([new Blob()], "file placeholder for add new"),
//     editComponent: (props) => {
//       return (
//         <div>
//           <input
//             type="file"
//             name="hinhAnh"
//             placeholder={props.columnDef.title}
//             onChange={(e) => {
//               // console.log(e.target.files);

//               // document.getElementById(
//               //   "img-upload"
//               // ).src = window.URL.createObjectURL(e.target.files[0]);
//               //thay đổi value của rowData (hinhAnh)
//               props.onChange(e.target.files[0]);
//             }}
//           />
//           <img
//             src={
//               typeof props.value === "string"
//                 ? props.value
//                 : window.URL.createObjectURL(props.value)
//             }
//             alt="preview-update"
//             id="img-upload"
//             style={{ width: "50px" }}
//           />
//         </div>
//       );
//     },
//   },
//   {
//     title: "Mô tả",
//     field: "moTa",
//     width: "100%",
//     initialEditValue:
//       "Lấy bối cảnh Trường Sơn thời chống Mỹ, theo truyện ngắn gốc của nhà văn Xuân Thiều là năm 1966. Ba cô gái Mùi, Lan và Phượng được binh trạm trưởng giao nhiệm vụ mở quán ăn trong hang để tiếp tế cho bộ đội hành quân. Ba nữ thanh niên xung phong ở Quán Tiên, mỗi người là một mẫu phụ nữ. Mùi đàn bà, mặn mà nhưng chung thủy, kìm nén. Tuyết Lan bản năng, ngoài hiền lành trong dữ dội, mắc chứng cuồng loạn. Phượng trẻ con, vô tư nhưng sâu nặng khi yêu.",
//     render: (rowData) => (
//       <div style={{ width: "100%", minWidth: "350px", textAlign: "justify" }}>
//         {rowData.moTa}
//       </div>
//     ),
//     editComponent: (props) => {
//       return (
//         <div style={{ width: "100%", minWidth: "350px" }}>
//           <textarea
//             rows="10"
//             style={{ width: "100%" }}
//             placeholder="great movie"
//             onChange={(e) => props.onChange(e.target.value)}
//             defaultValue={props.value || ""}
//           ></textarea>
//         </div>
//       );
//     },
//     validate: (rowData) => validateFunc(rowData, "moTa"),
//   },
//   {
//     title: "Ngày khởi chiếu",
//     field: "ngayKhoiChieu",
//     type: "date",
//     initialEditValue: new Date(),
//     dateSetting: { locale: "en-GB" },
//     validate: (rowData) => validateFunc(rowData, "ngayKhoiChieu"),
//   },
//   {
//     title: "Đánh giá",
//     field: "danhGia",
//     editable: "onUpdate",
//     initialEditValue: "8",
//     validate: (rowData) => validateFunc(rowData, "danhGia"),
//   },
// ];

function MoviesTable(props) {
  const columns = useMemo(() => makeColumns(props), [props]);
  return (
    <>
      <MyTable
        title="Movie List"
        tableType="Movie Table"
        columns={columns}
        customTableOption={{ filtering: false }}
        getAPI={moviesApi.getDanhSachPhim}
        addAPI={moviesApi.postThemPhim}
        updateAPI={moviesApi.postCapNhatPhim}
        deleteAPI={moviesApi.deleteMovie}
      />
      <ModalPopup />
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    actGetTrailer: (movie) => {
      dispatch(actFindMovieTrailer(movie));
    },
  };
};
export default connect(null, mapDispatchToProps)(MoviesTable);
