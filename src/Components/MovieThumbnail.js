import React from "react";
import { Link } from "react-router-dom";
import { actFindMovieTrailer } from "./../containers/HOME/HomePage/modules/action";
import { connect } from "react-redux";
// import { actFetchDetailMovie } from "../containers/HOME/DetailPage/modules/action";
const play = "/images/play.png";

function MovieThumbnail(props) {
  const { movie, renderDate } = props; // render date nay duoc nhan tu Comp cha: singleMovieItem

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
          data-target="#movieTrailer"
          data-toggle="modal"
          className="play__link"
          onClick={() => props.getMovieDetail(movie)}
        >
          <img src={play} alt="play trailer" />
        </a>
      </div>
      {/* display none ben DANG chieu */}
      <div className="publish__date">{movie.ngayKhoiChieu && renderDate}</div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieDetail: (movie) => {
      dispatch(actFindMovieTrailer(movie));
      // && dispatch(actFetchDetailMovie(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(MovieThumbnail);
