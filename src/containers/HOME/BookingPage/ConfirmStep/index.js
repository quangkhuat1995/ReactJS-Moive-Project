import PropTypes from "prop-types";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  actBuyTicket,
  actRefreshBuyTicket,
} from "../../../../Components/Seat/modules/action";
import { USER_KEY } from "../../../../constants/config";
// /utils
import { renderGheDangChon } from "../../../../utils/movies";
import { BookingPageContext } from "../testIndex";

const styleGiaTien = (numPrice) => {
  return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function ConfirmStep(props) {
  const { buyTicket, refreshSeatState, danhSachVe } = props;
  const { state, dispatch } = useContext(BookingPageContext);
  // const {state,dispatch} = context
  const { step, isOpen, totalComboCost } = state;

  const history = useHistory();
  const params = useParams();

  const handleBuyTicket = (e) => {
    e.persist();
    e.preventDefault();
    //nếu đang mở combo thì nút next hoạt động như nút tắt combo (và hiển thị lại step 2)
    if (isOpen) {
      dispatch({ type: "close-combo" });
      return;
    }
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

  return (
    <section id="confirm">
      <div className="confirm-wrapper row">
        <div className="col-6 confirm__item" id="showseat">
          {isOpen
            ? totalComboCost
              ? `${styleGiaTien(totalComboCost)} vnđ`
              : ""
            : renderGheDangChon(danhSachVe)}
        </div>

        <div className="col-6 confirm__item" id="btnGoNext">
          {step === 1 ? (
            <button
              className="btn-confirm"
              onClick={() => dispatch({ type: "next" })}
              disabled={danhSachVe && danhSachVe.length === 0}
            >
              Tiếp tục
            </button>
          ) : (
            //step === 2 nếu ko mở combobox thì hiển thị thanh toán, ngược lại nút thanh toán sẽ là nút đóng combobox
            <button
              className="btn-confirm"
              onClick={handleBuyTicket}
              disabled={danhSachVe && danhSachVe.length === 0}
            >
              {isOpen ? "Tiếp tục" : "Thanh Toán"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

ConfirmStep.propTypes = {
  danhSachVe: PropTypes.array.isRequired,
};
ConfirmStep.defaultProps = {
  danhSachVe: [],
};

const mapStateToProps = (state) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmStep);
