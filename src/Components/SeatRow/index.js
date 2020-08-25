import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Seat from "../Seat";

function SeatRow(props) {
  const { danhSachGhe } = props.bookingMovie;
  console.log(danhSachGhe);
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
      const chunkedDanhSachGhe = chunkArray(danhSachGhe, soCot); // => 11 hang du 6
      return chunkedDanhSachGhe.map((item, index) => {
        return (
          <div className="seatrow" key={index}>
            <Seat danhSachGhe={item} index={index} />
          </div>
        );
      });
    }
  };
  return <>{renderSeatRow()}</>;
}

SeatRow.propTypes = {
  danhSachGhe: PropTypes.array,
};

const mapStateToProps = (state) => ({
  bookingMovie: state.bookingMoviePageReducer.bookingMovie,
});

export default connect(mapStateToProps, null)(SeatRow);
