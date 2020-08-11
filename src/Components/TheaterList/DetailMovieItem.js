import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DetailMovieItem extends Component {
  renderBtnTime = () => {
    const { movie } = this.props;
    if (movie.lstLichChieuTheoPhim && movie.lstLichChieuTheoPhim.length > 0) {
      return movie.lstLichChieuTheoPhim.map((item, index) => {
        return (
          <Link
            key={item.maLichChieu}
            to={`/lich-chieu/${item.maLichChieu}`}
            className="btn btn-time"
          >
            {new Date(item.ngayChieuGioChieu).toLocaleTimeString()}
          </Link>
        );
      });
    }
  };
  render() {
    const { movie, ma } = this.props;
    return (
      <div className="theater__movies--item">
        <div
          className="theater__movies--item--info"
          data-toggle="collapse"
          data-target={`#${ma}_${movie.maPhim}`}
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
          id={`${ma}_${movie.maPhim}`}
        >
          {this.renderBtnTime()}
        </div>
      </div>
    );
  }
}
