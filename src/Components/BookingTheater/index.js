import React from "react";

function BookingTheater(props) {
  const { thongTinPhim } = props;

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

export default BookingTheater;
