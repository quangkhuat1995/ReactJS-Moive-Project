import React from "react";
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
  const renderDanhSachGhe = () => {
    if (danhSachGhe && danhSachGhe.length > 0) {
      return danhSachGhe.map((item, idx) => {
        // let soGhe= item.tenGhe;
        return (
          <span
            className="seat-clickable"
            data-id={`${letter}${item.tenGhe}`}
            key={item.maGhe}
          >
            <input
              type="checkbox"
              id={`${letter}${item.tenGhe}`}
              defaultValue={`${item.tenGhe}`}
              name={`${item.tenGhe}`}
              disabled={item.daDat}
            />
            <label
              htmlFor={`${letter}${item.tenGhe}`}
              data-chosable="true"
              className={item.loaiGhe}
              // onclick="showClickedSeat('A01')"
            >
              <span className="seatnum">
                {`${letter}${idx > 9 ? idx + 1 : `0${idx + 1}`}`}
              </span>
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

export default Seat;
