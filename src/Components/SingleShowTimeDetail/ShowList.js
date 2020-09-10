import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actSortLichChieu } from "../../containers/HOME/DetailPage/modules/action";
import theaterImagesData from "../../constants/theaterImagesData";
import LinkButton from "../LinkButton";
import CinemaDetailItem from "../CinemaDetailItem";
const getLogo = (maHeThong) => {
  let foundCumRap = theaterImagesData.find((item) => {
    return item.maHeThongRap === maHeThong;
  });
  return foundCumRap.logo;
};
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
// TODO btn này được render dựa vào state
const renderTimeList = (cumRap) => {
  // let listLichChieuPhim = [];
  // if(cumRap.lichChieuPhim && cumRap.lichChieuPhim.length > 0){
  //   listLichChieuPhim = sortLichChieuByDate("tryen date can sort vao");
  // }

  if (cumRap.lichChieuPhim && cumRap.lichChieuPhim.length > 0) {
    return cumRap.lichChieuPhim.map((lichChieu) => {
      let myTime = new Date(lichChieu.ngayChieuGioChieu).toLocaleTimeString(
        "it-IT",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      let myDate = new Date(lichChieu.ngayChieuGioChieu).toLocaleDateString(
        "en-GB"
      );
      if (true) {
        return (
          <Link
            to={`/booking/${lichChieu.maLichChieu}`}
            className="btn btn-time"
            key={lichChieu.maLichChieu}
          >
            {myTime} - {myDate}
            {/* { sortDate(lichChieu.ngayChieuGioChieu)} */}
          </Link>
        );
      }
    });
  }
};

//export
function ShowList(props) {
  const { singleHeThongRapChieu } = props; //obj
  const { cumRapChieu } = singleHeThongRapChieu; //array
  const { lichChieu } = props; //array lau tu store
  // const [cumRapChieu, setCumRapChieu] = useState([]);
  // useEffect(() => {
  //   setCumRapChieu(singleHeThongRapChieu.cumRapChieu);
  // }, []);
  // console.log();

  console.log(cumRapChieu);

  const renderSort = (inputNgayChieuGioChieu) => {
    return null;
  };

  const sortLichChieuByDate = (ngayGioChieu) => {
    let outputDate = new Date(ngayGioChieu).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // 2019-01-01T10:10:00

  const renderCumRap = () => {
    if (cumRapChieu && cumRapChieu.length > 0) {
      return cumRapChieu.map((cumRap, index) => {
        return (
          <div key={cumRap.maCumRap} className="wrapper__collapse">
            <div
              className="main__collapse"
              data-toggle="collapse"
              data-target={`#${
                singleHeThongRapChieu.maHeThongRap
              }_${cumRap.maCumRap.trim()}`}
            >
              <CinemaDetailItem
                system={singleHeThongRapChieu}
                cinema={cumRap}
              />
            </div>
            <div
              className="collapse"
              id={`${
                singleHeThongRapChieu.maHeThongRap
              }_${cumRap.maCumRap.trim()}`}
            >
              <div className="pt-3 row content__collapse stack">
                <div className="col-12">2D Digital</div>
                <div className="col-12">
                  {/* {renderTimeList(cumRap)} */}
                  {renderBtnTime(cumRap.lichChieuPhim)}
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  //main return
  return <>{renderCumRap()}</>;
}

const mapStateToProps = (state) => {
  return {
    lichChieu: state.detailMovieReducer.detailMovie.lichChieu, //array
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSortedListLichChieu: (ngayChieuGioChieu) => {
      dispatch(actSortLichChieu(ngayChieuGioChieu));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
