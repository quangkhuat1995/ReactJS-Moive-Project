import { combineReducers } from "redux";
import listMovieReducer from "./../../containers/HOME/HomePage/modules/reducer";
import listHeThongRapReducer from "./../../Components/TheaterList/modules/reducer";
import detailMovieReducer from "./../../containers/HOME/DetailPage/modules/reducer";
import authAdminReducer from "./../../containers/ADMIN/Auth/modules/reducer";
import bookingMoviePageReducer from "./../../containers/HOME/BookingPage/modules/reducer";
import userSignUpReducer from "./../../containers/HOME/SignUpPage/modules/reducer";
import userLoginReducer from "./../../containers/HOME/LoginPage/modules/reducer";

import buyTicketReducer from "./../../Components/Seat/modules/reducer";

import reviewsReducer from "./../../Components/DiscussSection/modules/reducer";

const rootReducer = combineReducers({
  listMovieReducer, // hien thi danh sach phim trong page home/showtime
  listHeThongRapReducer, // hien thi danh sach cac rap trong page home/theaterlist
  detailMovieReducer, // chi tiet tung bo phim o trang detail
  authAdminReducer,
  bookingMoviePageReducer,

  userSignUpReducer,
  userLoginReducer,

  buyTicketReducer,
  reviewsReducer,
});

export { rootReducer };
