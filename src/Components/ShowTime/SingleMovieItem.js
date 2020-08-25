import React from "react";
import { Link } from "react-router-dom";
// import { callAPI } from "./../../callAPI";
// import { requests } from "./../../requests";
import MovieThumbnail from "../MovieThumbnail";
import WithDetailMovieStyle from "./../../HOC/withDetailMovieStyle";
function SingleMovieItem(props) {
  const { movie } = props;
  //props nay duoc nhan tu HOC
  const { stylePoint, renderStar, renderAge, renderDate } = props;
  // let day = renderDate(5)
  return (
    <div className="movieThumbnail col-6 col-sm-4 col-md-3">
      <MovieThumbnail movie={movie} renderDate={renderDate(5)} />
      <span className={renderAge[0]}>{renderAge[1]}</span>
      <div className="showing__head">
        <span className={renderAge[0]}>{renderAge[1]}</span> {movie.tenPhim}
        <div className="playBtn__overlay btnContainer">
          <Link
            to={`/phim/${movie.maPhim}-${movie.biDanh}`}
            className="btnBuyTicket"
          >
            MUA VÉ
          </Link>
        </div>
      </div>
      {/* <p className="showing__length">
          {this.state.movie.thoiLuong ? this.state.movie.thoiLuong : " 100"}{" "}
          phút - TIX {stylePoint(movie.danhGia)}
        </p> */}
      <div className="showing__point">
        <span>{stylePoint(movie.danhGia)}</span>
        <div className="star">{renderStar}</div>
      </div>
    </div>
  );
}

export default WithDetailMovieStyle(SingleMovieItem, "movie");
