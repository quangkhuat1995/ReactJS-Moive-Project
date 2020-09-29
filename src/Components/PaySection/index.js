import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actBuyTicket, actRefreshBuyTicket } from "../Seat/modules/action";
import { useParams, useHistory } from "react-router-dom";
import Radio from "./../Radio";
import { MOBILE_MEDIA, USER_KEY } from "../../constants/config";
import Swal from "sweetalert2";
import useMedia from "../../Hook/useMedia";

//utils
import {
  renderGheDangChon,
  renderGiaTien,
  renderTenCumRap,
} from "../../utils/movies";

function Pay(props) {
  const { danhSachVe, buyTicket, refreshSeatState } = props;
  const { thongTinPhim } = props.bookingMovie;
  const history = useHistory();
  const params = useParams();
  const isMobile = useMedia(MOBILE_MEDIA);

  const tenCumRap = useMemo(() => renderTenCumRap(thongTinPhim), [
    thongTinPhim,
  ]);

  const handleBuyTicket = (e) => {
    e.persist();
    e.preventDefault();
    const user = localStorage.getItem(USER_KEY);
    const data = {
      maLichChieu: parseInt(params.maLichChieu),
      taiKhoanNguoiDung: JSON.parse(user).taiKhoan,
      danhSachVe,
    };

    Swal.fire({
      title: "Thông tin đặt vé sẽ được gửi qua email",
      text: "Hãy kiểm tra thông tin trước khi xác nhận!",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
    }).then((res) => {
      if (res.value) {
        buyTicket(data);
        Swal.fire({
          icon: "success",
          text: "Đặt vé thành công",
          width: "400px",
          padding: "0 0 20px 0",
        })
          .then(() => refreshSeatState())
          .then(() => history.push("/"));
      } else {
        e.preventDefault();
      }
    });
  };

  if (!thongTinPhim) return null;
  return (
    <>
      <div className="pay-wrapper">
        <div className="header--space" />
        <div className="pay__item--wrapper">
          <div className="total">
            <span id="totalMoney">{renderGiaTien(danhSachVe)} đ</span>
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
              <span id="cumrap">{tenCumRap[0]}</span> -
              <span id="chinhanh">{tenCumRap[1]}</span>
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
              <span id="myseat">{renderGheDangChon(danhSachVe)}</span>
            </div>
            <div className="col-4 text-right font-weight-bold" id="demoMoney">
              {renderGiaTien(danhSachVe)} đ
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
      </div>

      {!isMobile && (
        <div className="confirm__group">
          <div className="confirm__item">
            <button
              className="btn-confirm"
              onClick={handleBuyTicket}
              disabled={danhSachVe && danhSachVe.length === 0}
            >
              Thanh Toán
            </button>
          </div>
        </div>
      )}
    </>
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
    refreshSeatState: () => {
      dispatch(actRefreshBuyTicket());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pay);
