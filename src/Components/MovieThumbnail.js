import React, { Component } from "react";
import { Link } from "react-router-dom";
import { actFindMovieTrailer } from "./../containers/HOME/HomePage/modules/action";
import { connect } from "react-redux";
import play from "./../images/play.png";
// import { actFetchDetailMovie } from "../containers/HOME/DetailPage/modules/action";

class MovieThumbnail extends Component {
  // renderDate = (string) => {
  //   //movie.ngayKhoiChieu = "2020-08-14T00:00:00"
  //   let date = string
  //     .slice(5, 10) // "08-14"
  //     .split("-") // ["08","14"]
  //     .reverse()
  //     .join("/");
  //   return date;
  // };
  render() {
    const { movie, renderDate } = this.props; // render date nay duoc nhan tu Comp cha: singleMovieItem

    return (
      <div className="movieThumbnail__img">
        <Link
          to={`/phim/${movie.maPhim}-${movie.biDanh}`}
          className="img__link"
          style={{
            background: `url(${movie.hinhAnh}) center center/cover`,
          }}
        >
          {/* <img src={movie.hinhAnh} alt /> */}
        </Link>
        {/* display none ben SAP chieu */}
        <div className="playBtn__overlay">
          <a
            href={`play-trailer-${movie.maPhim}-${movie.biDanh}`}
            data-toggle="modal"
            data-target="#movieTrailer"
            className="play__link"
            onClick={() => this.props.getMovieDetail(movie.maPhim)}
          >
            <img src={play} alt="play trailer" />
          </a>
        </div>
        {/* display none ben DANG chieu */}
        <div className="publish__date">{movie.ngayKhoiChieu && renderDate}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieDetail: (id) => {
      dispatch(actFindMovieTrailer(id));
      // && dispatch(actFetchDetailMovie(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(MovieThumbnail);
