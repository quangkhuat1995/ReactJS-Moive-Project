import React, { useEffect } from "react";
import { connect } from "react-redux";
import BookingTheater from "../../../Components/BookingTheater";
import Loading from "../../../Components/Loading";
import NoteSeat from "../../../Components/NoteSeat";
import Pay from "../../../Components/PaySection";
import { actRefreshBuyTicket } from "../../../Components/Seat/modules/action";
import SeatRow from "../../../Components/SeatRow";
import TimeWaiting from "../../../Components/TimeWaiting";
import useSetBackground from "../../../Hook/useSetBackground";
import useTitle from "../../../Hook/useTitle";
import { actFetchBookingMoviePage } from "./modules/actions";

function BookingPage(props) {
  useTitle("Đặt vé");
  useSetBackground();
  const { fetchMovieDetailPage, loading } = props;

  const maLichChieu = props.match.params.maLichChieu;
  useEffect(() => {
    fetchMovieDetailPage(maLichChieu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <section className="main-wrapper row">
        {/* BOOKING SEAT */}
        <main className=" seat__section col-12 col-md-9">
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
        {/* PAY SECTION */}
        <aside id="pay-section" className="col-12 col-md-3">
          <Pay />
        </aside>
      </section>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieDetailPage: (maLichChieu) => {
      dispatch(actFetchBookingMoviePage(maLichChieu));
    },
    refreshSeatState: () => {
      dispatch(actRefreshBuyTicket());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.bookingMoviePageReducer.loading,
    // isLoggedIn: state.userStatusReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
