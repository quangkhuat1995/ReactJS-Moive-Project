import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actSortLichChieu } from "../../containers/HOME/DetailPage/modules/action";
import LabelContent from "../LabelContent.js";

//api tra ve string sai nen phai lam cai nay
// "maCumRap": "glx-nguyen-du\r\n",
const checkId = (idString) => {
  return idString.replace(/[\r\n]/g, "");
};

//export
function ShowList(props) {
  const { singleHeThongRapChieu } = props; //obj
  // const { cumRapChieu } = singleHeThongRapChieu; //array
  const { lichChieu } = props; //array lau tu store
  const [cumRapChieu, setCumRapChieu] = useState([]);
  useEffect(() => {
    setCumRapChieu(singleHeThongRapChieu.cumRapChieu);
  }, []);
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

  const renderCumRap = () => {
    if (cumRapChieu && cumRapChieu.length > 0) {
      return cumRapChieu.map((cumRap, index) => {
        return (
          <div key={cumRap.maCumRap} className="wrapper__collapse">
            <div
              className="main__collapse"
              data-toggle="collapse"
              data-target={`#${singleHeThongRapChieu.maHeThongRap}_${checkId(
                cumRap.maCumRap
              )}`}
            >
              <img
                className="theater__image"
                src={singleHeThongRapChieu.logo}
                alt={singleHeThongRapChieu.tenHeThongRap}
              />
              <LabelContent theater={cumRap} />
            </div>
            <div
              className="collapse show "
              id={`${singleHeThongRapChieu.maHeThongRap}_${checkId(
                cumRap.maCumRap
              )}`}
            >
              <div className="pt-3 row content__collapse">
                {renderTimeList(cumRap)}
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
