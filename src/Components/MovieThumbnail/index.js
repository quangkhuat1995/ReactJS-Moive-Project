import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actFindMovieTrailer } from "../../containers/HOME/HomePage/modules/action";
import PropTypes from "prop-types";
import { prefixHttp } from "../../utils/movies";

const play = "/images/play.png";

function MovieThumbnail(props) {
  const { movie, renderDate, allowNavigate } = props; // render date nay duoc nhan tu Comp cha: singleMovieItem
  const urlHinhAnh = useMemo(() => prefixHttp(movie.hinhAnh), [movie.hinhAnh]);
  return (
    <div className="movieThumbnail__img">
      <Link
        to={allowNavigate ? `/phim/${movie.maPhim}-${movie.biDanh}` : "#"}
        className="img__link"
        style={{
          background: `url(${urlHinhAnh}) no-repeat scroll center center/cover`,
        }}
      >
        {/* <img src={movie.hinhAnh} alt /> */}
      </Link>
      {/* display none ben SAP chieu */}
      <div className="playBtn__overlay">
        <a
          href={`play-trailer-${movie.maPhim || "phim"}-${movie.biDanh}`}
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

MovieThumbnail.propTypes = {
  allowNavigate: PropTypes.bool.isRequired,
  movie: PropTypes.object.isRequired,
};

MovieThumbnail.defaultProps = {
  allowNavigate: true,
  movie: {},
};

export default connect(null, mapDispatchToProps)(MovieThumbnail);
