import {
  BUY_TICKET_REQUEST,
  BUY_TICKET_SUCCESS,
  BUY_TICKET_FAILED,
  CHOSING_TICKETS,
  REFRESH_STATE_TICKET,
} from "./constant";
import { filterDanhSachVe } from "./action";
/**
 data = {
  maLichChieu: 0,
  danhSachVe: [
    {
      maGhe: 0,
      giaVe: 0,
    },
  ],
  taiKhoanNguoiDung: "string",
}
 */

const initialState = {
  //state nhận về sau khi gửi
  loading: false,
  result: null, //"Đặt vé thành công!"
  error: null,

  //mảng trong data cần post đi
  danhSachVe: [],
};

const buyTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_TICKET_REQUEST:
      state.loading = true;
      state.result = null;
      state.error = null;
      return { ...state };

    case BUY_TICKET_SUCCESS:
      state.loading = false;
      state.result = action.data;
      state.error = null;
      return { ...state };

    case BUY_TICKET_FAILED:
      state.loading = false;
      state.result = null;
      state.error = action.error;
      return { ...state };

    case CHOSING_TICKETS:
      /**Cần filter lại 2 TH:
       1. TH chỉ chọn thêm ghế: Nếu user chọn thêm 1 ghế thì action.danhSachVe sẽ có 2 phần tử được add thêm vào danhSachVe (đang có sẵn 1 ghế) -> sẽ lặp ghế cũ (xảy ra double ghế đầu tiên, tức mảng sẽ có 3 phần tử trong khi user chỉ chọn 2 ghế), tương tự khi chọn 3 ghế thì (danhSachVe) sẽ có 6 pt, 4->10.

       2. TH hủy chọn ghế: Tương tự như trên nhưng lúc này các phần tử đã được chọn trong mảng sẽ không mất đi mà chỉ thay đổi value thành null, length mảng vẫn bị tăng lên giống giải thích trên

       =>> Cần filter lại 2 trường hợp, filter lặp và filter null.

       3. Sau đó mới update danhSachVe vào state.
      */

      //add every seats user chose (or unchose)
      let danhSachVe = [...state.danhSachVe, ...action.danhSachVe];
      // filter null and duplicate
      danhSachVe = filterDanhSachVe(danhSachVe);

      //update state
      state.danhSachVe = danhSachVe;

      return { ...state };

    case REFRESH_STATE_TICKET:
      // state= initialState;
      return { ...initialState };

    default:
      return { ...state };
  }
};

export default buyTicketReducer;
