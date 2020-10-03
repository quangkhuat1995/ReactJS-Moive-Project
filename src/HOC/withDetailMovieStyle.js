import React from "react";
const star2 = "/images/star2.png";
const star1 = "/images/star1.png";

const WithDetailMovieStyle = (WrappedComponent, sourcePropsName) => {
  return function (props) {
    const renderStar = (danhGia) => {
      // let danhGia = props[sourcePropsName].danhGia;
      let starArr = [];

      //cứ 2 điểm cho 1 star
      while (parseInt(danhGia) >= 2) {
        starArr.push(star1);
        danhGia = danhGia - 2;
      }
      //còn dư 1,5 hoặc 0,5 .... loại trường hợp -0 thì ko thêm sao vào
      if (danhGia > 0 && Math.round(danhGia) > 1) {
        starArr.push(star1);
      } else {
        starArr.push(star2);
      }

      return starArr.map((item, idx) => (
        <img src={item} key={idx} alt="star" />
      ));
    };
    // const renderStar = () => {
    //   let danhGia = props[sourcePropsName].danhGia;
    //   if (danhGia >= 9.5) {
    //     return (
    //       <>
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //       </>
    //     );
    //   } else if (danhGia >= 8) {
    //     return (
    //       <>
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star2} alt="star" />
    //       </>
    //     );
    //   } else if (danhGia > 5) {
    //     return (
    //       <>
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star2} alt="star" />
    //       </>
    //     );
    //   } else {
    //     return (
    //       <>
    //         <img src={star1} alt="star" />
    //         <img src={star1} alt="star" />
    //         <img src={star2} alt="star" />
    //       </>
    //     );
    //   }
    // };

    const renderAge = () => {
      let danhGia = props[sourcePropsName].danhGia;

      if (danhGia <= 5) {
        return ["showing__age green", "P"];
      }
      return ["showing__age", "C13"];
    };

    const stylePoint = (point) => {
      // point.toFixed(1)
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
        renderStar={renderStar}
        stylePoint={stylePoint}
        renderAge={renderAge()}
        renderDate={renderDate}
        {...props}
      />
    );
  };
};

export default WithDetailMovieStyle;
