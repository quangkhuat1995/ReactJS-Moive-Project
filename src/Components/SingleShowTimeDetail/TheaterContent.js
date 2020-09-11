import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ShowList from "./ShowList";
import PropTypes from "prop-types";

function TheaterContent(props) {
  const { detailMovie, maHeThongRap, selectDay } = props;
  const { heThongRapChieu } = detailMovie;
  /** return first item found or undefined */
  const findHeThongRapTheoMa = (maHTRap) => {
    if (heThongRapChieu && heThongRapChieu.length > 0) {
      return heThongRapChieu.find((item) => item.maHeThongRap === maHTRap);
    }
  };

  const [foundHeThongRap, setFoundHeThongRap] = useState(
    findHeThongRapTheoMa(maHeThongRap)
  );
  useEffect(() => {
    const foundHeThong = findHeThongRapTheoMa(maHeThongRap);

    if (foundHeThong) {
      let newFoundCumRapChieu = foundHeThong.cumRapChieu.reduce(
        (acc, cumRap) => {
          let lstLichChieuPhim = cumRap.lichChieuPhim.filter(
            (item) =>
              new Date(item.ngayChieuGioChieu).toLocaleDateString("it-IT") ===
              selectDay
          );
          return [...acc, { ...cumRap, lichChieuPhim: lstLichChieuPhim }];
        },
        []
      );
      let newFound = { ...foundHeThong, cumRapChieu: newFoundCumRapChieu };
      // console.log(newFound);

      setFoundHeThongRap(newFound);
    }
  }, [selectDay]);

  /**Neu khong tim thay heThongRap co lich chieu thi render UI thông báo
   *  <div>khong co lich chieu<div>
   * else render
   *  <danh sach cum rap chieu>
   */

  return (
    <>
      {foundHeThongRap ? (
        <ShowList foundHeThongRap={foundHeThongRap} />
      ) : (
        <div className="alert alert-info">
          Hiện không có lịch chiếu trên hệ thống rạp này
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    detailMovie: state.detailMovieReducer.detailMovie,
    selectDay: state.detailMovieReducer.selectDay,
  };
};

TheaterContent.propsTypes = {
  detailMovie: PropTypes.object.isRequired,
  maHeThongRap: PropTypes.string.isRequired,
  selectDay: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(TheaterContent);
