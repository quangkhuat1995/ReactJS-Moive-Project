import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
// const getToken = () => {
//   const userAdmin = localStorage.getItem("userAdmin");
//   if (userAdmin) {
//     return JSON.parse(userAdmin).accessToken;
//   }
//   return null;
// };

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
  return text.trim().toLowerCase().split(" ").join("-");
};

function useTable(tableType) {
  //data of table
  const [data, setData] = useState([]);

  const callAPI = useCallback((api, body, ...option) => {
    // console.log("api call");

    if (!api) return alert("something wrong!!");

    //post,put,delete
    if (body !== null) {
      return api(body, ...option);
    }
    //get (then set initial Data),
    return (
      api(...option)
        // api(body,...option)
        .then((res) => {
          setData(res);
        })
        .catch((error) => {
          alert(error.response.data);
        })
    );
  }, []);

  const handleRowUpdate = (newData, oldData, resolve, reject, updateAPI) => {
    console.log(newData);
    let body = {};
    if (tableType === "Account Table") {
      body = { ...newData };
    } else if (tableType === "Movie Table") {
      body = {
        ...newData,

        // biDanh: newData.biDanh || transformString(newData.tenPhim),
      };
    }
    // usersApi
    //   .editAccount({ ...newData, maNhom: "GP09" }, getToken())
    callAPI(updateAPI, { ...body, maNhom: "GP09" })
      .then((res) => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;

        //update lai Table UI
        setData([...dataUpdate]);

        alertCase("update", tableType, res, newData, oldData);
        // alert(
        //   `Đã cập nhật ${findUpatedKey(newData, oldData)} người dùng: ${
        //     res.taiKhoan
        //   }`
        // );
        resolve();
      })
      .catch((error) => {
        alert(error.response.data);
        reject();
      });
  };

  const handleRowAdd = (newData, resolve, reject, addAPI) => {
    let body = {};
    if (tableType === "Account Table") {
      body = { ...newData, maNhom: "GP09" };
    } else if (tableType === "Movie Table") {
      body = {
        ...newData,
        maNhom: "GP09",
        biDanh: newData.biDanh || transformString(newData.tenPhim),
        ngayKhoiChieu: new Date(newData.ngayKhoiChieu).toLocaleDateString(
          "en-GB"
        ),
      };
      console.log(body);
    }

    // usersApi
    // .postAddAccount(newData, getToken())
    callAPI(addAPI, body)
      .then((res) => {
        let dataToAdd = [...data];
        dataToAdd.unshift(newData);
        setData(dataToAdd);

        alertCase("add", tableType, res, newData, null);
        // alert(`Thêm thành công người dùng: ${res.taiKhoan}`);

        resolve();
      })
      .catch((error) => {
        alert(error?.response?.data);
        reject();
      });
  };

  const handleRowDelete = (oldData, resolve, reject, deleteAPI) => {
    let body = null;
    if (tableType === "Account Table") {
      body = oldData.taiKhoan;
    } else if (tableType === "Movie Table") {
      body = oldData.maPhim;
    }

    // usersApi
    //   .deleteAccount(oldData.taiKhoan, getToken())
    callAPI(deleteAPI, body)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);

        alertCase("delete", tableType, res, null, oldData);
        // alert(`${res}: ${oldData.taiKhoan}`);

        resolve();
      })
      .catch((error) => {
        alert(error?.response?.data);
        reject();
      });
  };

  return {
    data,
    setData,
    callAPI,
    handleRowUpdate,
    handleRowAdd,
    handleRowDelete,
  };
}

useTable.propTypes = {
  // tableType: PropTypes.string.isRequired,
};

export default useTable;
