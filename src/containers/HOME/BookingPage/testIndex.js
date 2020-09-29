import PropTypes from "prop-types";
import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { connect } from "react-redux";
import Loading from "../../../Components/Loading";
import {
  actBuyTicket,
  actRefreshBuyTicket,
} from "../../../Components/Seat/modules/action";
import { MOBILE_MEDIA } from "../../../constants/config";
import useMedia from "../../../Hook/useMedia";
import useSetBackground from "../../../Hook/useSetBackground";
import useTitle from "../../../Hook/useTitle";
import BookingProgress from "./BookingProgress";
import DesktopView from "./BookingView/DesktopView";
import MobileView from "./BookingView/MobileView";
import ConfirmStep from "./ConfirmStep";
import { actFetchBookingMoviePage } from "./modules/actions";

const reducer = (state, action) => {
  switch (action.type) {
    case "step1":
      return {
        ...state,
        step: 1,
      };

    case "step2":
      return {
        ...state,
        step: 2,
      };

    case "step3":
      return {
        ...state,
        step: 3,
      };
    case "back":
      return {
        ...state,
        step: state.step - 1,
      };
    case "next":
      return {
        ...state,
        step: state.step + 1,
      };

    default:
      break;
  }
};

const initialState = {
  step: 1,
};

export const BookingPageContext = createContext(null);

function BookingPage(props) {
  useTitle("Đặt vé");
  useSetBackground();
  const { fetchMovieDetailPage, loading } = props;

  const maLichChieu = props.match.params.maLichChieu;
  console.log(maLichChieu);

  useEffect(() => {
    fetchMovieDetailPage(maLichChieu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  const isMobile = useMedia(MOBILE_MEDIA);

  if (loading) return <Loading />;
  return (
    <BookingPageContext.Provider value={contextValue}>
      {/* css width:75 height:80 */}
      <BookingProgress />

      {isMobile ? (
        <>
          <MobileView />
          {/* css display none dc */}
          <ConfirmStep />
        </>
      ) : (
        <DesktopView />
      )}
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
    buyTicket: (data) => {
      dispatch(actBuyTicket(data));
    },
    refreshSeatState: () => {
      dispatch(actRefreshBuyTicket());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.bookingMoviePageReducer.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
