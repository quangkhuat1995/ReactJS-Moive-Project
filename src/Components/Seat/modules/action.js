import {
  BUY_TICKET_REQUEST,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAILED,
  CHOSING_TICKETS,
  REFRESH_STATE_TICKET,
} from "./constant";
import bookingApi from "../../../api/bookingApi";

//hàm này CHỈ cập nhật lại mảng danhSachVe. maLichChieu và taiKhoanNguoiDung sẽ xử lý dựa vào state isLoggedIn. Hàm này kích hoạt mỗi khi user click chọn ghế (onChange)
const actDanhSachVe = (danhSachVe) => {
  //danhSachVe: Array<object>
  return {
    type: CHOSING_TICKETS,
    danhSachVe,
  };
};

//sau khi mua xong thì refresh state lại như ban đầu (lúc chưa mua)
const actRefreshBuyTicket = () => {
  return {
    type: REFRESH_STATE_TICKET,
  };
};

const actFetchBuyTicketRequest = () => {
  return {
    type: BUY_TICKET_REQUEST,
  };
};

const actFetchBuyTicketSuccess = (data) => {
  return {
    type: BUY_TICKET_SUCCESS,
    data,
  };
};

const actFetchBuyTicketFailed = (error) => {
  return {
    type: BUY_TICKET_FAILED,
    error,
  };
};

// data cần post = {
//   "maLichChieu": 0,
//   "danhSachVe": [
//     {
//       "maGhe": 0,
//       "giaVe": 0
//     }
//   ],
//   "taiKhoanNguoiDung": "string"
// }

//post data to sever to book ticket
const actBuyTicket = (data, token) => {
  let configData = actConfigDanhSachVe(data);
  return async (dispatch) => {
    dispatch(actFetchBuyTicketRequest());
    try {
      const resData = await bookingApi.postDatVe(configData, token); // nhận về result: '"Đặt vé thành công!"'
      dispatch(actFetchBuyTicketSuccess(resData));
    } catch (error) {
      dispatch(actFetchBuyTicketFailed(error));
    }
  };
};

//hàm này config data trước khi gửi lên API do Data (dataSend) của mình có dạng
// dataSend post = {
//   "maLichChieu": 0,
//   "danhSachVe": [
//     {
//       "maGhe": 0,
//       "giaVe": 0,
//        "codeGhe": "A01"     <====== cần xóa trước khi gửi
//     }
//   ],
//   "taiKhoanNguoiDung": "string"
// }

const actConfigDanhSachVe = (data) => {
  let configData = {};
  if (data && data.danhSachVe.length > 0) {
    let newDsVe = data.danhSachVe.map((item) => {
      delete item.codeGhe;
      return item;
    });
    configData = {
      ...data,
      danhSachVe: newDsVe,
    };
  }
  return configData;
};

//helper function, đọc comment ở file ./reducer.js của modules này
/**
 *
 *  listVeDuocChon: Array<Object>
 */
const filterDanhSachVe = (listVeDuocChon) => {
  let dsVeNhanDuoc = [];
  dsVeNhanDuoc = [...dsVeNhanDuoc, ...listVeDuocChon];

  //remove dulicate, lấy key cần để kiểm tra là maGhe
  let filteredDanhSachVe = dsVeNhanDuoc
    .reduce(
      (items, item) =>
        items.find((x) => x.maGhe === item.maGhe)
          ? [...items]
          : [...items, item],
      []
    )
    //then remove null
    .filter((item) => item.maGhe !== null);
  return filteredDanhSachVe;
};

export { actBuyTicket, actRefreshBuyTicket, actDanhSachVe, filterDanhSachVe };
