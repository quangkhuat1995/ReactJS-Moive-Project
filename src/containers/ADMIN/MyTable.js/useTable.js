import { useState, useCallback } from "react";

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
        alert(`${res} phim: ${oldData.tenPhim}`); //xoa thành công...
      }
      break;

    case "add":
      if (tableType === "Account Table") {
        alert(`Thêm thành công người dùng: ${res.taiKhoan || newData.tenPhim}`);
      } else if (
        tableType === "Movie Table" ||
        tableType === "Showtime Table"
      ) {
        alert(`Thêm thành công phim: ${res.tenPhim || newData.tenPhim}`);
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
  const [isChanged, setIsChanged] = useState(true);
  const callAPI = useCallback(
    (api, body) => {
      // console.log("api call");
      //no api endpoint
      if (api === undefined) return;

      //post,put,delete
      if (body !== null) {
        return api(body);
      }
      //get (then set initial Data),
      return (
        api()
          // api(body,...option)
          .then((res) => {
            setData(res);
            //chỉ gọi lại api get với table Movie
            if (tableType === "Movie Table") {
              setIsChanged(false);
            }
          })
          .catch((error) => {
            alert(error.response.data);
          })
      );
    },
    [tableType]
  );

  const handleRowUpdate = (newData, oldData, resolve, reject, updateAPI) => {
    // let newHinhAnh = newData.hinhAnh;

    // if (typeof newData.hinhAnh === "string") {
    //   newHinhAnh = await urlToObj(newData.hinhAnh);
    // }

    let body = {};
    if (tableType === "Account Table") {
      body = { ...newData };
    } else if (tableType === "Movie Table") {
      body = {
        ...newData,
        biDanh:
          oldData.tenPhim !== newData.tenPhim
            ? transformString(newData.tenPhim)
            : oldData.biDanh,
        ngayKhoiChieu: new Date(newData.ngayKhoiChieu).toLocaleDateString(
          "en-GB"
        ),
        danhGia: parseInt(newData.danhGia),
        hinhAnh: typeof newData.hinhAnh === "string" ? null : newData.hinhAnh,
      };
    }
    console.log(body);

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

        setIsChanged(true);
        resolve();
      })
      .catch((error) => {
        alert(
          "Lỗi sever, không thể cập nhật. Hãy chắc chắn bạn đã điền đầy đủ thông tin"
        );
        console.log(error);

        setIsChanged(false);
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
        biDanh: transformString(newData.tenPhim),
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
        setIsChanged(true);
        resolve();
      })
      .catch((error) => {
        alert(error?.response?.data);
        setIsChanged(false);
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
        setIsChanged(true);
        resolve();
      })
      .catch((error) => {
        alert(error?.response?.data);
        setIsChanged(false);
        reject();
      });
  };

  const handleFetchData = (getApi, ...query) => {
    callAPI(getApi, ...query)
      .then((res) => {
        setData(res);
        //chỉ gọi lại api get với table Movie
        if (tableType === "Movie Table") {
          setIsChanged(false);
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return {
    data,
    isChanged,
    callAPI,
    handleFetchData,
    handleRowUpdate,
    handleRowAdd,
    handleRowDelete,
  };
}

export default useTable;
