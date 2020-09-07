import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LinkButton from "../LinkButton";

//api tra ve string sai nen phai lam cai nay
// "maCumRap": "glx-nguyen-du\r\n",
const checkId = (idString) => {
  return idString.replace(/[\r\n]/g, "");
};

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
  // let [currentHour, currentMin] = currentTime.split(":");
  // let [startHour, startMin] = startTime.split(":");
  // if (parseInt(startHour) - parseInt(currentHour) > 0) {
  //   return false
  // }
  // else{

  // }
  if (startTime > currentTime) {
    return false;
  }
  return true;
  // console.log(currentTime);
  // return null;
};
checkPassStartTime("10:10");

//export
function DetailMovieItem(props) {
  const { movie, maCumRap, todayListTime } = props;
  // console.log(props);

  // ngayChieuGioChieu: 2019-01-01T10:10:00
  const renderBtnTime = () => {
    if (todayListTime && todayListTime.length > 0) {
      return todayListTime.map((item, index) => {
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

  // main return
  return (
    <div className="wrapper__collapse">
      <div
        className="main__collapse"
        data-toggle="collapse"
        data-target={`#${checkId(maCumRap)}_${movie.maPhim}`}
      >
        <img
          className="theater__image"
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
      <div
        className="collapse show"
        id={`${checkId(maCumRap)}_${movie.maPhim}`}
      >
        <div className="pt-3 row content__collapse stack">
          <div className="col-12 digital">2D Digital</div>
          <div className="col-12">{renderBtnTime()}</div>
        </div>
      </div>
    </div>
  );
}

DetailMovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  maCumRap: PropTypes.string.isRequired,
  todayList: PropTypes.array.isRequired,
};
DetailMovieItem.defaultProps = {
  movie: {},
  maCumRap: null,
  todayList: [],
};
export default DetailMovieItem;
