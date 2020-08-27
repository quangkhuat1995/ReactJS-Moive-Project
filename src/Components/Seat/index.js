import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
  const { danhSachGhe, index } = props;
  const letter = arrayName[index];

  const renderCode = (idx) =>
    `${letter}${idx + 1 >= 10 ? idx + 1 : `0${idx + 1}`}`; //A11

  //Tao 1 obj state co key = name cua input, value la obj chua 2 key maGhe, giaVe
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
  // console.log(state);

  const handleChange = (e, item) => {
    // console.log(item);

    e.persist();
    const { name, checked, defaultValue, value, dataset } = e.target;
    // console.log(dataset.render); dataset.giaVe maVe = value;

    // console.log(checked);
    // state[e.target.name] = e.target.checked;
    if (checked) {
      setState(
        state,
        (state[name].maGhe = item.maGhe),
        (state[name].giaVe = item.giaVe),
        (state[name].codeGhe = name)
      );
    } else {
      setState(state, (state[name].maGhe = null), (state[name].giaVe = null));
    }
    // console.log(Object.values(state));
    let haha = Object.values(state).filter((item) => {
      return item.maGhe != null;
    });
    // console.log(...haha);
    // console.log(haha);
    props.handleChonGhe(haha);
  };

  // useEffect(() => {
  //   let haha = Object.values(state).filter((item) => {
  //     return item.maGhe != null;
  //   });
  //   // console.log(haha);
  //   props.handleChonGhe(haha);
  // }, []);

  const renderDanhSachGhe = () => {
    if (danhSachGhe && danhSachGhe.length > 0) {
      return danhSachGhe.map((item, idx) => {
        // let soGhe= item.tenGhe;
        // console.log(item.giaVe);

        return (
          <span
            className="seat-clickable"
            data-id={`${letter}${item.tenGhe}`}
            key={item.maGhe}
          >
            <input
              type="checkbox"
              id={`${letter}${item.tenGhe}`}
              value={`${item.maGhe}`}
              name={renderCode(idx)}
              disabled={item.daDat}
              onChange={(e) => handleChange(e, item)}
              // data-render={renderCode(idx)}
            />
            <label
              htmlFor={`${letter}${item.tenGhe}`}
              className={item.loaiGhe}
              // onclick="showClickedSeat('A01')"
            >
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
  handleChonGhe: PropTypes.func,
};

export default Seat;
