import React from "react";
import star1 from "./../images/star1.png";
import star2 from "./../images/star2.png";

const WithDetailMovieStyle = (WrappedComponent, sourcePropsName) => {
  return class extends React.Component {
    renderStar = () => {
      let danhGia = this.props[sourcePropsName].danhGia;
      if (danhGia >= 8) {
        return (
          <>
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star2} alt="star" />
          </>
        );
      } else if (danhGia > 5) {
        return (
          <>
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star2} alt="star" />
          </>
        );
      } else {
        return (
          <>
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star2} alt="star" />
          </>
        );
      }
    };

    renderAge = () => {
      let danhGia = this.props[sourcePropsName].danhGia;

      if (danhGia <= 5) {
        return ["showing__age green", "P"];
      }
      return ["showing__age", "C13"];
    };

    stylePoint = (point) => {
      return point < 10 ? `${point}.0` : point;
    };

    renderDate = (startIndex) => {
      //movie.ngayKhoiChieu = "2020-08-14T00:00:00"
      let date = this.props[sourcePropsName].ngayKhoiChieu;
      if (date) {
        date = date
          .slice(startIndex, 10) // "08-14"
          .split("-") // startIndex=0 => ["2020","08","14"] , =5 => ["08","14"]
          .reverse()
          .join("/");
        return date;
      }
    };
    render() {
      return (
        <WrappedComponent
          renderStar={this.renderStar()}
          stylePoint={this.stylePoint}
          renderAge={this.renderAge()}
          renderDate={this.renderDate}
          {...this.props}
        />
      );
    }
  };
};

export default WithDetailMovieStyle;
