import PropTypes from "prop-types";
import React from "react";
import LinkButton from "../LinkButton";
// import "./DetailMovieItem.scss";

//Return startTime ~ endTime depend on API string(ex: 2019-01-01T10:10:00)
const styleTime = (ngayChieuGioChieu) => {
  let d = new Date(ngayChieuGioChieu);
  // console.log(d);
  const startTime = d.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log(startTime); //10:10

  d.setHours(d.getHours() + 2);
  const endTime = new Date(d).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log(endTime); //12:10

  return [startTime, endTime];
};

const checkPassStartTime = (startTime) => {
  let d = new Date();
  let currentTime = d.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (startTime > currentTime) {
    return false;
  }
  return true;
};

const renderBtnTime = (listTimes) => {
  if (listTimes && listTimes.length > 0) {
    return listTimes.map((item, index) => {
      const [startTime, endTime] = styleTime(item.ngayChieuGioChieu);
      return (
        <LinkButton
          key={item.maLichChieu}
          to={`/booking/${item.maLichChieu}`}
          className="btn btn-time"
          disabled={checkPassStartTime(startTime)}
        >
          <span className="start">{startTime}</span> ~ {endTime}
        </LinkButton>
      );
    });
  }
};

//export
function DetailMovieItem(props) {
  const { movie, maCumRap, todayListTime } = props;

  // main return
  return (
    <div className="wrapper__collapse">
      <div
        className="main__collapse"
        data-toggle="collapse"
        data-target={`#${maCumRap.trim()}_${movie.maPhim}`}
      >
        <img
          className="theaterList__image"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
        />
        <div className="wrapInfo">
          <span className="movieName">
            <span className="showing__age">C13</span> - {movie.tenPhim}
          </span>
          <span className="movieDetail">116 phút - TIX 8.6 - IMDb 0</span>
        </div>
      </div>

      <div className="collapse show" id={`${maCumRap.trim()}_${movie.maPhim}`}>
        <div className="pt-3 row content__collapse stack">
          <div className="col-12 digital">2D Digital</div>
          <div className="col-12">{renderBtnTime(todayListTime)}</div>
        </div>
      </div>
    </div>
  );
}

DetailMovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  maCumRap: PropTypes.string.isRequired,
  todayListTime: PropTypes.array.isRequired,
};
DetailMovieItem.defaultProps = {
  movie: {},
  maCumRap: null,
  todayListTime: [],
};
export default DetailMovieItem;
