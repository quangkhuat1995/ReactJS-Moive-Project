import React, { Component } from "react";
import { Link } from "react-router-dom";
import { actFindMovieTrailer } from "./../containers/HOME/HomePage/modules/action";
import { connect } from "react-redux";
import play from "./../images/play.png";
// import { actFetchDetailMovie } from "../containers/HOME/DetailPage/modules/action";

class MovieThumbnail extends Component {
  renderDate = (string) => {
    //movie.ngayKhoiChieu = "2020-08-14T00:00:00"
    let date = string
      .slice(5, 10) // "2020-08-14"
      .replace("-", "/")
      .split("/") // ["2020","08","14"]
      .reverse()
      .join("/");
    return date;
  };
  render() {
    const { movie } = this.props;

    return (
      <div className="movieThumbnail__img">
        <Link
          to={`/phim/${movie.maPhim}`}
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
            href={movie.maPhim}
            data-toggle="modal"
            data-target="#movieTrailer"
            className="play__link"
            onClick={() => this.props.getMovieDetail(movie.maPhim)}
          >
            <img src={play} alt="play trailer" />
          </a>
        </div>
        {/* display none ben DANG chieu */}
        <div className="publish__date">
          {movie.ngayKhoiChieu && this.renderDate(movie.ngayKhoiChieu)}
        </div>
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
