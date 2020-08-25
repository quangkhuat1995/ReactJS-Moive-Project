import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Seat from "../Seat";
// import Seat2 from "../Seat/Seat2";
const arrayName = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
function SeatRow(props) {
  const { danhSachGhe } = props.bookingMovie;
  // console.log(danhSachGhe);
  const chunkArray = (myArray, chunk_size) => {
    let results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }

    return results;
    // var result = chunkArray([1,2,3,4,5,6,7,8], 3);
    //  Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
  };
  const renderSeatRow = () => {
    if (danhSachGhe && danhSachGhe.length > 0) {
      const soCot = 16;
      const copyDanhSachGhe = [...danhSachGhe];
      const chunkedDanhSachGhe = chunkArray(copyDanhSachGhe, soCot); // => 11 hang du 6
      return chunkedDanhSachGhe.map((item, index) => {
        return (
          <div className="seatrow" key={index}>
            <Seat
              danhSachGhe={item}
              index={index}
              // gheDangChon={props.gheDangChon}
              handleChonGhe={props.handleChonGhe}
            />
          </div>
        );
      });
    }
  };
  // const TEST = () => {
  //   if (danhSachGhe && danhSachGhe.length > 0) {
  //     let soDong = arrayName.length;
  //     let soCot = Math.floor(danhSachGhe.length / arrayName.length);
  //     for (let i = 0; i < soDong; i++) {
  //       for (let j = 0; j < soCot; j++) {
  //         return (
  //           <Seat2 key={`${i}-${j}`} tenHang={arrayName} tenCot={danhSachGhe} />
  //         );
  //       }
  //     }
  //   }
  // };
  return (
    <>
      {renderSeatRow()}
      {/* {TEST()} */}
    </>
  );
}

SeatRow.propTypes = {
  danhSachGhe: PropTypes.array,
  gheDangChon: PropTypes.array,
  handleChonGhe: PropTypes.func,
};

const mapStateToProps = (state) => ({
  bookingMovie: state.bookingMoviePageReducer.bookingMovie,
});

export default connect(mapStateToProps, null)(SeatRow);
