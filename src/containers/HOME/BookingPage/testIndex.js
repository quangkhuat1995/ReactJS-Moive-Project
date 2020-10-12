import PropTypes from "prop-types";
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import BookingTheater from "../../../Components/BookingTheater";
import ComboBox from "../../../Components/ComboBox";
import Loading from "../../../Components/Loading";
import NoteSeat from "../../../Components/NoteSeat";
import PaySection from "../../../Components/PaySection";
import SeatRow from "../../../Components/SeatRow";
import TimeWaiting from "../../../Components/TimeWaiting";

import { MOBILE_MEDIA } from "../../../constants/config";
import useMedia from "../../../Hook/useMedia";
import useSetBackground from "../../../Hook/useSetBackground";
import useTitle from "../../../Hook/useTitle";
import BookingProgress from "./BookingProgress";
import DesktopView from "./BookingView/DesktopView";
import MobileView from "./BookingView/MobileView";
import ConfirmStep from "./ConfirmStep";
import { actFetchBookingMoviePage } from "./modules/actions";
import clsx from "clsx";

const reducer = (state, action) => {
  const { step, isOpen, amount, totalComboCost } = state;
  const { price, type } = action;

  switch (type) {
    case "add":
      return {
        ...state,
        amount: amount + 1,
        totalComboCost: totalComboCost + price,
      };

    case "remove":
      return {
        ...state,
        amount: amount - 1,
        totalComboCost: totalComboCost - price,
      };

    case "back":
      return {
        ...state,
        step: step - 1,
        isOpen: false,
      };
    case "next":
      return {
        ...state,
        step: step + 1,
        isOpen: false,
      };

    case "open-combo":
      return {
        ...state,
        isOpen: true,
      };
    case "close-combo":
      return {
        ...state,
        isOpen: false,
      };
    case "toggle":
      return {
        ...state,
        isOpen: !isOpen,
      };

    default:
      break;
  }
};

const initialState = {
  step: 1,
  isOpen: false, //flag to check if user open combobox

  amount: 0,
  totalComboCost: 0,
};

export const BookingPageContext = createContext(null);

function BookingPage(props) {
  useTitle("Đặt vé");
  useSetBackground();
  // const history = useHistory();

  const { fetchMovieDetailPage, loading, isLoggedIn } = props;

  const maLichChieu = props.match.params.maLichChieu;
  useEffect(() => {
    fetchMovieDetailPage(maLichChieu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  //desktop luôn luôn hiện, còn mobile thì xét theo step
  const isMobile = useMedia(MOBILE_MEDIA);

  if (!isLoggedIn) return <Redirect to="/" />;
  if (loading) return <Loading />;

  return (
    <BookingPageContext.Provider value={contextValue}>
      {/* css width:75 height:80 */}
      <BookingProgress />

      <section className={clsx("row", !isMobile && "main-wrapper")}>
        <main
          className=" seat__section col-12 col-md-9"
          style={{
            display: `${
              !isMobile ? "block" : state.step === 1 ? "block" : "none"
            }`,
          }}
        >
          <div className="header--space" />

          <div className="seat__section--top">
            <BookingTheater />

            <TimeWaiting />
          </div>
          <div className="seat__section--map">
            <div className="screen">
              <img src="/images/screen.png" alt="screen" />
            </div>
            {/*  */}
            <div className="listseat">
              <SeatRow />
            </div>

            {/*  */}
            <div className="noteseat">
              <NoteSeat type="normal" info="Ghế thường" />
              <NoteSeat type="vip" info="Ghế VIP" />
              <NoteSeat type="current" info="Ghế đang chọn" />
              <NoteSeat type="taken" info="Ghế đã có người chọn" />
            </div>
          </div>
        </main>

        <aside
          id="pay-section"
          className="col-12 col-md-3"
          style={{
            display: `${
              !isMobile
                ? "block"
                : state.step === 2 && !state.isOpen
                ? "block"
                : "none"
            }`,
          }}
        >
          <PaySection />
        </aside>

        {isMobile && <ConfirmStep />}
      </section>
      {/* {isMobile ? (
        <>
          <MobileView />
          
          <ConfirmStep />
        </>
      ) : (
        <DesktopView />
      )} */}
      <section
        id="combo-section"
        className={state.isOpen ? "open" : ""}
        style={{
          display: `${!isMobile ? "block" : state.isOpen ? "block" : "none"}`,
        }}
      >
        <ComboBox />
      </section>
    </BookingPageContext.Provider>
  );
}

BookingPage.propTypes = {
  fetchMovieDetailPage: PropTypes.func,
  loading: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieDetailPage: (maLichChieu) => {
      dispatch(actFetchBookingMoviePage(maLichChieu));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.bookingMoviePageReducer.loading,
    isLoggedIn: state.userLoginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
