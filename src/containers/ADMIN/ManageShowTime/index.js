import Paper from "@material-ui/core/Paper";
import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { connect } from "react-redux";
import { actFetchListHeThongRap } from "../../../Components/TheaterList/modules/action";
import useTitle from "../../../Hook/useTitle";
import useAdminStyles from "../../../style/useAdminStyle";
import { actFetchListMoive } from "../../HOME/HomePage/modules/action";
import MainContent from "../MainContent";
import SearchShowtime from "./SearchShowtime";
import ShowtimeTable from "./ShowtimeTable";

const initialState = {
  maPhim: "",
  maHeThongRap: "",
  maCumRap: "",
  maRap: "",

  ngayChieuGioChieu: "",
  giaVe: "75000",
  canSubmit: false,
};
const reducer = (state, action) => {
  const { type, field, data } = action;
  switch (type) {
    case "CHOOSE_FIELD":
      // let canSubmit = Object.keys(state).every((key) => {
      //   return state[key].toString() !== "";
      // });
      return {
        ...state,
        [field]: data,
      };
    case "CHOOSE_AGAIN":
      return {
        ...state,
        maCumRap: "",
        maRap: "",
        canSubmit: false,
      };

    case "CHECK_ALLOW":
      let canSubmit = Object.keys(state).every((key) => {
        return state[key] !== "";
      });
      if (canSubmit) {
        return {
          ...state,
          canSubmit: true,
        };
      }
      return { ...state };

    case "NOT_ALLOW":
      return { ...state, canSubmit: false };

    case "CLEAR_FORM":
      return { ...initialState, maPhim: state.maPhim };

    default:
      break;
  }
};
export const AddShowtimeContext = createContext();
function ManageShowtime(props) {
  useTitle("Thêm lịch chiếu", "admin");
  const classes = useAdminStyles();
  const {
    fetchGetListMovie,
    fetchGetListHeThongRap,
    loadingListMovie,
    loadingListHTR,
  } = props;
  useEffect(() => {
    fetchGetListMovie();
    fetchGetListHeThongRap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  if (loadingListMovie || loadingListHTR) return <div>Đang lấy dữ liệu...</div>;
  return (
    <AddShowtimeContext.Provider value={contextValue}>
      <MainContent title="Manage Showtime">
        <Paper className={classes.paper}>
          <SearchShowtime />
        </Paper>
        {/* truyền mã phim để hiển thị lịch chiếu theo phim */}
        {/* <ShowtimeTable maPhim={state.maPhim}/> */}
        <Paper className={classes.paper}>
          <ShowtimeTable />
        </Paper>
      </MainContent>
    </AddShowtimeContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    loadingListMovie: state.listMovieReducer.loading,
    loadingListHTR: state.listHeThongRapReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetListMovie: () => {
      dispatch(actFetchListMoive());
    },
    fetchGetListHeThongRap: () => {
      dispatch(actFetchListHeThongRap());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShowtime);
