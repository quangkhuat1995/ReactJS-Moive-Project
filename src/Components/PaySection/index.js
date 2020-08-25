import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Pay(props) {
  const { danhSachGhe } = props;
  const { thongTinPhim } = props.bookingMovie;
  const layThongTinGhe = (type) => {
    if (danhSachGhe && danhSachGhe.length > 0) {
      switch (type) {
        case "codeGhe":
          return danhSachGhe.map((item) => {
            return item.codeGhe;
          });

        case "giaVe":
          return danhSachGhe.reduce((acc, item) => {
            return acc + item.giaVe;
          }, 0);

        default:
          break;
      }
    }
  };
  const renderGheDangChon = () => {
    let dsGhe = layThongTinGhe("codeGhe");
    if (dsGhe && dsGhe.length > 0) {
      return dsGhe.join(", ");
    } else {
      return "Vui lòng chọn ghế";
    }
  };
  console.log(layThongTinGhe("giaVe"));

  const renderGiaTien = () => {
    let giaTien = layThongTinGhe("giaVe");
    if (danhSachGhe && danhSachGhe.length > 0) {
      return giaTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
    }
  };

  const renderCumRap = () => {
    let ten = thongTinPhim.tenCumRap;
    if (ten.includes("Cineplex")) {
      return ten.split("Cineplex -");
    }
    return ten.split("-");
  };
  if (!thongTinPhim) return null;
  return (
    <form id="pay">
      <div className="pay__item--wrapper">
        <div className="total">
          <span id="totalMoney">{renderGiaTien()} đ</span>
        </div>
      </div>
      <div className="pay__item--wrapper">
        <div className="film__name font-weight-bold">
          <span id="filmname">{thongTinPhim.tenPhim}</span>
        </div>
      </div>
      <div className="pay__item--wrapper">
        <div className="showday row">
          <div className="col-6">Ngày giờ chiếu:</div>
          <div className="col-6 text-right font-weight-bold">
            <span id="date">{thongTinPhim.ngayChieu}</span> - 
            <span id="time">{thongTinPhim.gioChieu}</span>
          </div>
        </div>
      </div>
      <div className="pay__item--wrapper">
        <div className="theater row">
          <div className="col-4">Cụm rạp:</div>
          <div className="col-8 text-right font-weight-bold">
            <span id="cumrap">{renderCumRap()[0]}</span> -
            <span id="chinhanh">{renderCumRap()[1]}</span>
          </div>
        </div>
      </div>
      <div className="pay__item--wrapper">
        <div className="rap row">
          <div className="col-4">Rạp:</div>
          <div className="col-8 text-right">
            <span id="rapnumber">{thongTinPhim.tenRap}</span>
          </div>
        </div>
      </div>
      <div className="pay__item--wrapper">
        <div className="seatchosen row">
          <div className="col-8 myseat">
            <span>Ghế</span> <span id="myseat">{renderGheDangChon()}</span>
          </div>
          <div className="col-4 text-right font-weight-bold" id="demoMoney">
            {renderGiaTien()} đ
          </div>
        </div>
      </div>

      <div className="pay__item--wrapper">
        <div className="discountsection row">
          <div className="col-6">Ưu đãi:</div>
          <div className="col-6 text-right">
            <span id="coupon">0%</span>
          </div>
        </div>
      </div>
      <div className="pay__item--wrapper">
        <div className="howtopay">
          <p>Hình thức thanh toán</p>
          <div className="radio-selection">
            {/* ATM */}
            <div className="radio__item">
              <input
                className="radio__item--input"
                type="radio"
                name="howtopay"
                id="ATM"
                defaultValue="ATM"
              />
              <label className="radio__item--label label__ATM" htmlFor="ATM">
                <div className="pay__figure">
                  <img src="./images/ATM.png" alt="atm" />
                </div>
                <p className="pay__text">Thẻ ATM nội địa</p>
              </label>
            </div>
            {/* VISA */}
            <div className="radio__item">
              <input
                className="radio__item--input"
                type="radio"
                name="howtopay"
                id="VISA"
                defaultValue="VISA"
              />
              <label className="radio__item--label" htmlFor="VISA">
                <div className="pay__figure">
                  <img src="./images/visa_mastercard.png" alt="visa card" />
                </div>
                <p className="pay__text">Visa, Master, JCB</p>
              </label>
            </div>
            {/* CASH */}
            <div className="radio__item">
              <input
                className="radio__item--input"
                type="radio"
                name="howtopay"
                id="CASH"
                defaultValue="CASH"
              />
              <label className="radio__item--label" htmlFor="CASH">
                <div className="pay__figure">
                  <img src="./images/cash.png" alt="cash" />
                </div>
                <p className="pay__text">Thanh toán tiền mặt</p>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="confirm__item btnPayMoney--desk" data-goto="pay">
        <button className="btn-confirm">Thanh Toán</button>
      </div>
    </form>
  );
}

Pay.propTypes = {
  bookingMovie: PropTypes.object,
  danhSachGhe: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    bookingMovie: state.bookingMoviePageReducer.bookingMovie,
  };
};
export default connect(mapStateToProps, null)(Pay);
