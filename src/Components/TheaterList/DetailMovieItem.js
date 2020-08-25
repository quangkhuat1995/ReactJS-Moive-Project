import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DetailMovieItem extends Component {
  renderBtnTime = () => {
    let { lstLichChieuTheoPhim } = this.props.movie;
    if (lstLichChieuTheoPhim && lstLichChieuTheoPhim.length > 0) {
      // cat phim co lich chieu qua dai.
      /** SAU NAY SORT LAI THEO NGAY HIEN TAI */
      if (lstLichChieuTheoPhim.length > 10) {
        lstLichChieuTheoPhim = lstLichChieuTheoPhim.splice(0, 10);
      }
      return lstLichChieuTheoPhim.map((item, index) => {
        return (
          <Link
            key={item.maLichChieu}
            to={`/booking/${item.maLichChieu}`}
            className="btn btn-time"
          >
            {new Date(item.ngayChieuGioChieu).toLocaleTimeString()}
          </Link>
        );
      });
    }
  };
  render() {
    const { movie, maCumRap } = this.props;
    return (
      <div className="theater__movies--item">
        <div
          className="theater__movies--item--info"
          data-toggle="collapse"
          data-target={`#${maCumRap}_${movie.maPhim}`}
        >
          <img
            className="theater__image"
            src={movie.hinhAnh}
            alt={movie.tenPhim}
          />
          <div className="wrapInfo">
            <span className="movieName">
              <span className="showing__age">C13</span> - {movie.tenPhim}
            </span>
            <span className="movieDetail">116 phút - TIX 8.6 - IMDb 0</span>
          </div>
        </div>
        <div
          className="row pt-3 collapse show timeList"
          id={`${maCumRap}_${movie.maPhim}`}
        >
          {this.renderBtnTime()}
        </div>
      </div>
    );
  }
}
