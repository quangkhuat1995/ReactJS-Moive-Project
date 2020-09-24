import React from "react";
import PropTypes from "prop-types";
import { actFindMovieTrailer } from "../../containers/HOME/HomePage/modules/action";
import { connect } from "react-redux";
const play = "/images/play.png";

function CarouselItem(props) {
  const { detailMovie, isHero } = props;
  if (!detailMovie) return null;
  return (
    <div className="carousel__item">
      <div className="carousel__img">
        <img
          className="img__bg"
          src={detailMovie.hinhAnh}
          alt={detailMovie.tenPhim}
        />
      </div>
      {/* extra content on detail page */}
      {isHero && <div className="blur__overlay" />}
      {/* end extra content on detail page */}
      <div className="playBtn__overlay">
        <a
          href={`play-trailer-${detailMovie.maPhim}-${detailMovie.biDanh}`}
          data-toggle="modal"
          data-target="#movieTrailer"
          className="play__link"
          onClick={() => props.getMovieDetail(detailMovie)}
        >
          <img src={play} alt="play trailer" />
        </a>
      </div>
    </div>
  );
}

CarouselItem.propTypes = {
  isHero: PropTypes.bool,
  detailMovie: PropTypes.object.isRequired,
};
CarouselItem.defaultProps = {
  isHero: false,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieDetail: (id) => {
      dispatch(actFindMovieTrailer(id));
      // && dispatch(actFetchDetailMovie(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(CarouselItem);
