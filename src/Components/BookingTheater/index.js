import React from "react";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
BookingTheater.propsTypes = {
  bookingMovie: PropsTypes.object,
};
function BookingTheater(props) {
  const { bookingMovie } = props;
  const { thongTinPhim } = bookingMovie;

  const renderTenCumRap = () => {
    let ten = thongTinPhim.tenCumRap;
    if (ten.includes("Cineplex")) {
      return ten.split("Cineplex -");
    }
    return ten.split("-");
  };
  if (thongTinPhim) {
    return (
      <div className="top__left">
        <div className="cinema-logo">
          <img src={thongTinPhim.hinhAnh} alt={thongTinPhim.tenPhim} />
        </div>
        <div className="cinema-info">
          <p className="address">
            <span className={`cinema-name ${renderTenCumRap()[0]}`}>
              {renderTenCumRap()[0]}
            </span>
            <span className="cinema-brand">
              - {renderTenCumRap()[1]} - {thongTinPhim.tenRap}
            </span>
          </p>
          <p className="day-show">{thongTinPhim.diaChi}</p>
        </div>
      </div>
    );
  }
  return null;
}
const mapStateToProps = (state) => {
  return {
    bookingMovie: state.bookingMoviePageReducer.bookingMovie,
  };
};
export default connect(mapStateToProps, null)(BookingTheater);
