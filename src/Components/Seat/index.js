import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { actDanhSachVe } from "./modules/action";
const arrayName = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];
function Seat(props) {
  const { danhSachGhe, index, updateMySeats } = props;
  const letter = arrayName[index];

  const renderCode = (idx) =>
    `${letter}${idx + 1 >= 10 ? idx + 1 : `0${idx + 1}`}`; // A01, J16,...

  /**  output { A01:{}, A02:{},... }*/
  const createState = () => {
    if (danhSachGhe && danhSachGhe.length > 0) {
      return danhSachGhe.reduce((acc, item, idx) => {
        return {
          ...acc,
          [renderCode(idx)]: { maGhe: null, giaVe: null, codeGhe: "" },
        };
      }, []);
    }
  };
  // console.log(createState());
  const [state, setState] = useState(() => createState());

  const handleChange = (e, item) => {
    const { name, checked } = e.target;

    if (checked) {
      setState(
        state,
        (state[name].maGhe = item.maGhe),
        (state[name].giaVe = item.giaVe),
        (state[name].codeGhe = name)
      );
    } else {
      //uncheck thì set lại state ban đầu;
      setState(state, (state[name].maGhe = null), (state[name].giaVe = null));
    }

    //filter null trong row, chỉ gửi lên store những ghế được chọn, sau khi gửi lên store mà người dùng hủy chọn thì store sẽ filter lần nữa (xem reducer.js)
    let listGhe = Object.values(state).filter((item) => {
      return item.maGhe != null;
    });
    //gửi lên store
    updateMySeats(listGhe);
  };

  const renderDanhSachGhe = () => {
    if (danhSachGhe && danhSachGhe.length > 0) {
      return danhSachGhe.map((item, idx) => {
        // let soGhe= item.tenGhe;
        // console.log(item.giaVe);

        return (
          <span className="seat-clickable" key={item.maGhe}>
            <input
              type="checkbox"
              id={`${letter}${item.tenGhe}`}
              value={`${item.maGhe}`}
              name={renderCode(idx)}
              disabled={item.daDat}
              onChange={(e) => handleChange(e, item)}
            />
            <label htmlFor={`${letter}${item.tenGhe}`} className={item.loaiGhe}>
              <span className="seatnum">{renderCode(idx)}</span>
            </label>
          </span>
        );
      });
    }
  };

  return (
    <>
      <span className="rowname seat-unclickable">{letter}</span>
      {renderDanhSachGhe()}
      {/* <span className="seat-unclickable hideOnMobile" /> */}
    </>
  );
}

Seat.propTypes = {
  index: PropTypes.number,
  danhSachGhe: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMySeats: (list) => {
      dispatch(actDanhSachVe(list));
    },
  };
};
export default connect(null, mapDispatchToProps)(Seat);
