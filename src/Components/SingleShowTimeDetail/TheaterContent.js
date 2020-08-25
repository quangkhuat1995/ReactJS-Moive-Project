import React from "react";
import { connect } from "react-redux";
import ShowList from "./ShowList";

function TheaterContent(props) {
  const { detailMovie, maHeThongRap } = props;
  const { heThongRapChieu } = detailMovie;
  /** return first item found or undefined */
  const findHeThongRapTheoMa = (maHTRap) => {
    if (heThongRapChieu && heThongRapChieu.length > 0) {
      return heThongRapChieu.find((item) => item.maHeThongRap === maHTRap);
    }
  };
  /**Neu khong tim thay heThongRap co lich chieu thi render
   *  <div>khong co lich chieu<div>
   * else render
   *  <danh sach cum rap chieu>
   */
  const renderContentHeThongRap = (maHTRap) => {
    const foundHeThongRap = findHeThongRapTheoMa(maHTRap);
    if (foundHeThongRap) {
      return <ShowList singleHeThongRapChieu={foundHeThongRap} />;
    } else {
      return <div className="alert alert-info">Hiện không có lịch Chiếu</div>;
    }
  };

  return <>{renderContentHeThongRap(maHeThongRap)}</>;
}

const mapStateToProps = (state) => {
  return {
    detailMovie: state.detailMovieReducer.detailMovie,
  };
};
export default connect(mapStateToProps, null)(TheaterContent);
