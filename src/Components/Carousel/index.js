import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import CarouselItem from "./CarouselItem";
import SliderSlick from "../SliderSlick";
import { connect } from "react-redux";
import homeCarouselData from "./../../constants/homeCarouselData";

function Carousel(props) {
  const { isHero } = props;

  const renderCarousel = () => {
    return homeCarouselData.map((item, index) => {
      return <CarouselItem key={index} detailMovie={item} />;
    });
  };
  return (
    <section className={`carousel ${isHero ? "hero" : ""}`}>
      {/* ko có class isHero thì hiện slider banner, còn nếu có thì hiện custom 1 banner */}
      {!isHero && (
        <SliderSlick>
          {/* map here */}
          {renderCarousel()}
        </SliderSlick>
      )}
      {props.children}
    </section>
  );
}

Carousel.propTypes = {
  isHero: PropTypes.bool,
  listMovie: PropTypes.array, // store
  detailMovie: PropTypes.object,
};
Carousel.defaultProps = {
  isHero: false,
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
  };
};

export default connect(mapStateToProps, null)(Carousel);
