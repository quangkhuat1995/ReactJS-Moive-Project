import React from "react";
import { connect } from "react-redux";
import CinemaDetailItem from "../CinemaDetailItem";
import LinkButton from "../LinkButton";
import PropTypes from "prop-types";

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
const renderBtnTime = (listTimes = []) => {
  if (listTimes && listTimes.length > 0) {
    // console.log(listTimes);

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

//nếu hệ thống rạp có chiếu phim được truyền vào comp này nhưng vào ngày nhất định nào đó, TẤT CẢ cụm rạp trong hệ thống đó KHÔNG có lịch chiếu nào (every cumRap.lichChieuPhim.length === 0) thì hiển thị UI khác (if true)
const checkCumRapHasNothingToShow = (cumRapChieu = []) => {
  return cumRapChieu.every((cumRap) => cumRap.lichChieuPhim.length === 0);
};
//export
function ShowList(props) {
  const { foundHeThongRap } = props; //obj
  const { cumRapChieu } = foundHeThongRap; //array

  const renderCumRap = () => {
    if (cumRapChieu && cumRapChieu.length > 0) {
      //tất cả cụm rạp không có lịch chiếu thị hiện UI thông báo
      const isCumRapHasNothingToShow = checkCumRapHasNothingToShow(cumRapChieu);
      if (isCumRapHasNothingToShow) {
        return (
          <div className="alert alert-danger">Ngày này không có lịch chiếu</div>
        );
      }

      return cumRapChieu.map((cumRap, index) => {
        //chỉ cụm rạp nào có lịch chiếu mới render
        const isCumRapShowOnDay =
          cumRap.lichChieuPhim && cumRap.lichChieuPhim.length > 0;

        return (
          isCumRapShowOnDay && (
            <div key={cumRap.maCumRap} className="wrapper__collapse ">
              <div
                className="main__collapse"
                data-toggle="collapse"
                data-target={`#${
                  foundHeThongRap.maHeThongRap
                }_${cumRap.maCumRap.trim()}`}
              >
                <CinemaDetailItem system={foundHeThongRap} cinema={cumRap} />
              </div>
              <div
                className="collapse"
                id={`${foundHeThongRap.maHeThongRap}_${cumRap.maCumRap.trim()}`}
              >
                <div className="pt-3 row content__collapse stack">
                  <div className="col-12">2D Digital</div>
                  <div className="col-12">
                    {/* {renderTimeList(cumRap.lichChieuPhim, selectDay)} */}
                    {renderBtnTime(cumRap.lichChieuPhim, cumRap)}
                  </div>
                </div>
              </div>
            </div>
          )
        );
      });
    }
  };
  //main return
  return <>{renderCumRap()}</>;
}

const mapStateToProps = (state) => {
  return {
    selectDay: state.detailMovieReducer.selectDay,
  };
};

ShowList.propsTypes = {
  foundHeThongRap: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, null)(ShowList);
