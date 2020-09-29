import React, { useMemo } from "react";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
import { renderTenCumRap } from "../../utils/movies";

function BookingTheater(props) {
  const { bookingMovie } = props;
  const { thongTinPhim } = bookingMovie;

  // const renderTenCumRap = () => {
  //   let ten = thongTinPhim.tenCumRap;
  //   if (ten.includes("Cineplex")) {
  //     return ten.split("Cineplex -");
  //   }
  //   return ten.split("-");
  // };
  const tenCumRap = useMemo(() => renderTenCumRap(thongTinPhim), [
    thongTinPhim,
  ]);

  if (!thongTinPhim) return null;
  return (
    <div className="top__left">
      <div className="cinema-logo">
        <img src={thongTinPhim.hinhAnh} alt={thongTinPhim.tenPhim} />
      </div>
      <div className="cinema-info">
        <p className="address">
          <span className={`cinema-name ${tenCumRap[0]}`}>{tenCumRap[0]}</span>
          <span className="cinema-brand">
            - {tenCumRap[1]} - {thongTinPhim.tenRap}
          </span>
        </p>
        <p className="diaChi">{thongTinPhim.diaChi}</p>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    bookingMovie: state.bookingMoviePageReducer.bookingMovie,
  };
};
BookingTheater.propsTypes = {
  bookingMovie: PropsTypes.object,
};
export default connect(mapStateToProps, null)(BookingTheater);
