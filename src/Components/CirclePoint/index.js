import React, { Component } from "react";
import star1 from "./../../images/star1.png";
import star2 from "./../../images/star2.png";
import WithDetailMovieStyle from "../../HOC/withDetailMovieStyle";

class CirclePoint extends Component {
  renderStyleBar = () => {
    const point = parseFloat(this.props.movie.danhGia);
    let clipPath = "";
    /** 5 điểm */
    if (point >= 0 && point <= 1.25) {
      clipPath = `polygon( 50% 0, 100% 0,${40 * point + 50}% 0, 50% 50%)`;
    }
    /** 6 điểm */
    if (point > 1.25 && point <= 3.75) {
      clipPath = `polygon(50% 0, 100% 0, 100% 50%, 100% 100%, 100% ${
        40 * point - 50
      }%, 50% 50%)`;
    }

    if (point > 3.75 && point <= 6.25) {
      clipPath = `polygon(50% 0, 100% 0, 100% 50%, 100% 100%, ${
        -40 * point + 250
      }% 100%, 50% 50%)`;
    }

    /** 7 điểm */
    if (point > 6.25 && point <= 8.75) {
      clipPath = `polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, 0 ${
        -40 * point + 350
      }%, 50% 50%`;
    }

    if (point > 8.75 && point <= 10) {
      clipPath = `polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, ${
        40 * point - 350
      }% 0, 50% 50%`;
    }
    return {
      WebkitClipPath: clipPath,
      MozClipPath: clipPath,
      msClipPath: clipPath,
      OClipPath: clipPath,
      clipPath: clipPath,
    };
  };

  render() {
    const { movie } = this.props;
    const { stylePoint, renderStar } = this.props;
    return (
      <>
        <div className="circlePercent">
          <div className="circleBorder"></div>
          <div className="point-group">
            <div className="bar" id="bar" style={this.renderStyleBar()}></div>
          </div>
          <span className="point">{stylePoint(movie.danhGia)}</span>
        </div>
        <div className="star">
          {renderStar}
          {/* <img src={star1} alt="star" />
          <img src={star1} alt="star" />
          <img src={star1} alt="star" />
          <img src={star2} alt="star" />
          hard code!! */}
        </div>
        <p className="danhGia">188 người đánh giá</p>
      </>
    );
  }
}
export default WithDetailMovieStyle(CirclePoint, "movie");
