import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actSortLichChieu } from "../../containers/HOME/DetailPage/modules/action";

function ShowList(props) {
  const { singleHeThongRapChieu } = props; //obj
  // const { cumRapChieu } = singleHeThongRapChieu; //array
  const { lichChieu } = props; //array lau tu store
  const [cumRapChieu, setCumRapChieu] = useState([]);
  useEffect(() => {
    setCumRapChieu(singleHeThongRapChieu.cumRapChieu);
  }, []);
  console.log(cumRapChieu);

  const renderTenCumRap = (cumRap) => {
    // tenCumRap = CGV - CresionMall || BHD Star - Pham Hung
    const tenCumRap = cumRap.tenCumRap;
    return tenCumRap.split(" -"); // ["BHD Star", " Pham Hung"]
  };
  const renderSort = (inputNgayChieuGioChieu) => {
    return null;
  };

  const sortLichChieuByDate = (ngayGioChieu) => {
    let outputDate = new Date(ngayGioChieu).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
          <div
            key={cumRap.maCumRap}
            className="theater__details--item"
            data-toggle="collapse"
            data-target={`#${singleHeThongRapChieu.maHeThongRap}_${cumRap.maCumRap}`}
          >
            <img
              className="theater__image"
              src={singleHeThongRapChieu.logo}
              alt={singleHeThongRapChieu.tenHeThongRap}
            />
            <div className="wrapInfo">
              <span className="chiNhanh">
                <span
                  className={`tenRap ${singleHeThongRapChieu.maHeThongRap}`}
                >
                  {renderTenCumRap(cumRap)[0]}
                </span>{" "}
                - {renderTenCumRap(cumRap)[1]}
              </span>
              {/* <span className="diaChi">
                Tầng 2, Thảo Điền Mall, 12 Quốc Hương, Phường Thảo --&gt; Điền,
                Quận 2, TP. Hồ Chí Minh
              </span> */}
            </div>
            <div
              className="collapse show timeList testTimeList"
              id={`${singleHeThongRapChieu.maHeThongRap}_${cumRap.maCumRap}`}
            >
              {renderTimeList(cumRap)}
            </div>
          </div>
        );
      });
    }
  };
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
