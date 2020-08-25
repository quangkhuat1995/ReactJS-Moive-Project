import React from "react";
const star2 = "/images/star2.png";
const star1 = "/images/star1.png";

const WithDetailMovieStyle = (WrappedComponent, sourcePropsName) => {
  return function (props) {
    const renderStar = () => {
      let danhGia = props[sourcePropsName].danhGia;
      if (danhGia >= 9.5) {
        return (
          <>
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
            <img src={star1} alt="star" />
          </>
        );
      } else if (danhGia >= 8) {
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

    const renderAge = () => {
      let danhGia = props[sourcePropsName].danhGia;

      if (danhGia <= 5) {
        return ["showing__age green", "P"];
      }
      return ["showing__age", "C13"];
    };

    const stylePoint = (point) => {
      return point < 10 ? `${point}.0` : point;
    };

    const renderDate = (startIndex) => {
      //movie.ngayKhoiChieu = "2020-08-14T00:00:00"
      let date = props[sourcePropsName].ngayKhoiChieu;
      if (date) {
        date = date
          .slice(startIndex, 10) // "08-14"
          .split("-") // startIndex=0 => ["2020","08","14"] , =5 => ["08","14"]
          .reverse()
          .join("/");
        return date;
      }
    };

    return (
      <WrappedComponent
        renderStar={renderStar()}
        stylePoint={stylePoint}
        renderAge={renderAge()}
        renderDate={renderDate}
        {...props}
      />
    );
  };
};

export default WithDetailMovieStyle;
