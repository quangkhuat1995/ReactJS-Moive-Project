import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actBuyTicket } from "../Seat/modules/action";
import { useParams, useLocation } from "react-router-dom";
import Radio from "./../Radio";
import { USER_KEY } from "../../constants/config";

function Pay(props) {
  const { danhSachVe } = props;
  const { thongTinPhim } = props.bookingMovie;
  const param = useParams();
  const location = useLocation();
  console.log(location);

  const layThongTinVe = (type) => {
    if (danhSachVe && danhSachVe.length > 0) {
      switch (type) {
        case "codeGhe":
          return danhSachVe.map((item) => {
            return item.codeGhe;
          });
        case "giaVe":
          return danhSachVe.reduce((acc, item) => {
            return acc + item.giaVe;
          }, 0);

        default:
          break;
      }
    }
  };
  const renderGheDangChon = () => {
    let dsVe = layThongTinVe("codeGhe");
    if (dsVe && dsVe.length > 0) {
      return dsVe.sort().join(", ");
    } else {
      return "Vui lòng chọn ghế";
    }
  };
  // console.log(layThongTinVe("giaVe"));

  const renderGiaTien = () => {
    let giaTien = layThongTinVe("giaVe");
    if (danhSachVe && danhSachVe.length > 0) {
      return giaTien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
    }
  };

  const renderTenCumRap = () => {
    let ten = thongTinPhim.tenCumRap;
    if (ten.includes("Cineplex")) {
      return ten.split("Cineplex -");
    }
    return ten.split("-");
  };

  const handleBuyTicket = (e) => {
    e.preventDefault();
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      const data = {
        maLichChieu: parseInt(param.maLichChieu),
        taiKhoanNguoiDung: JSON.parse(user).taiKhoan,
        danhSachVe,
      };

      console.log("pay", data);
      props.buyTicket(data);
    } else {
      alert("Bạn cần đăng nhập trước");
      // history.push("/login");
    }
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
            <span id="date">{thongTinPhim.ngayChieu}</span> -{" "}
            <span id="time">{thongTinPhim.gioChieu}</span>
          </div>
        </div>
      </div>
      <div className="pay__item--wrapper">
        <div className="theater row">
          <div className="col-4">Cụm rạp:</div>
          <div className="col-8 text-right font-weight-bold">
            <span id="cumrap">{renderTenCumRap()[0]}</span> -
            <span id="chinhanh">{renderTenCumRap()[1]}</span>
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
            {danhSachVe && danhSachVe.length > 0 && <span>Ghế </span>}
            <span id="myseat">{renderGheDangChon()}</span>
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
            <Radio name="howtopay" value="ATM" />
            <Radio name="howtopay" value="VISA" />
            <Radio name="howtopay" value="CASH" />
          </div>
        </div>
      </div>

      <div className="confirm__item btnPayMoney--desk">
        <button
          className="btn-confirm"
          onClick={handleBuyTicket}
          disabled={danhSachVe && danhSachVe.length === 0}
        >
          Thanh Toán
        </button>
      </div>
    </form>
  );
}

Pay.propTypes = {
  bookingMovie: PropTypes.object,
  danhSachVe: PropTypes.array.isRequired,
};
Pay.defaultProps = {
  bookingMovie: {},
  danhSachVe: [],
};
const mapStateToProps = (state) => {
  return {
    bookingMovie: state.bookingMoviePageReducer.bookingMovie,
    danhSachVe: state.buyTicketReducer.danhSachVe,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    buyTicket: (data) => {
      dispatch(actBuyTicket(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pay);
