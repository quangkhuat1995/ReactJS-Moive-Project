import React, { useRef, Fragment } from "react";
import TabPanel from "./TabPanel";
import DetailMovieItem from "./DetailMovieItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListShowByGroup from "../ListShowByGroup";
import { forwardRef } from "react";
//api tra ve string sai nen phai lam cai nay
// "maCumRap": "glx-nguyen-du\r\n",
const checkId = (idString) => {
  return idString.replace(/[\r\n]/g, "");
};

//gộp lại tất cả các danh sách lịch chiếu của từng cụm rạp vào chung thành 1 mảng. output:
// [{BHD cumRap1}, {BHD cumRap2},..,{CGV cumRap1},..{Lotte cumRap4},...]
const getLstCumRap = (array) => {
  //lstCumRap
  if (array && array.length > 0) {
    return array.reduce((acc, item) => acc.concat(item.lstCumRap), []);
  }
};

const TODAY = "2019-01-01";
//lấy danh sách phim có lịch chiếu hôm nay
const getTodayListTime = (lstLichChieu = []) => {
  if (lstLichChieu && lstLichChieu.length > 0) {
    return lstLichChieu.filter((lichChieu) => {
      return lichChieu.ngayChieuGioChieu.slice(0, 10) === TODAY;
    });
  }
};

let cinemaToday = [];
const findCumRapHasShowToday = (allLstCumRap = []) => {
  allLstCumRap.forEach((cumRap) => {
    let todayList = [];
    if (cumRap.danhSachPhim && cumRap.danhSachPhim.length > 0) {
      cumRap.danhSachPhim.forEach((movie) => {
        todayList = getTodayListTime(movie.lstLichChieuTheoPhim);
        if (todayList.length > 0) {
          cinemaToday.push(cumRap);
        }
      });
    }
  });

  //filter (remove) duplicate
  cinemaToday = cinemaToday.reduce(
    (items, item) =>
      items.find((x) => x.maCumRap === item.maCumRap)
        ? [...items]
        : [...items, item],
    []
  );
  return cinemaToday;
};

const checkCumRapHasShowToday = (cinemaToday = [], maCumRap) => {
  return cinemaToday.some((item) => item.maCumRap === maCumRap);
};

const renderMovieDetail = (cumRap) => {
  if (cumRap.danhSachPhim && cumRap.danhSachPhim.length > 0) {
    return cumRap.danhSachPhim.map((movie, index) => {
      const todayListTime = getTodayListTime(movie.lstLichChieuTheoPhim);

      return (
        <>
          {todayListTime.length > 0 && (
            <DetailMovieItem
              key={movie.maPhim}
              movie={movie}
              maCumRap={cumRap.maCumRap}
              todayListTime={todayListTime}
            />
          )}
        </>
      );
    });
  }
};

//export
function TabContentMovies(props) {
  const { listHeThongLichChieu } = props;
  console.log(listHeThongLichChieu);

  const allLstCumRap = getLstCumRap(listHeThongLichChieu);
  console.log(allLstCumRap);
  cinemaToday = findCumRapHasShowToday(allLstCumRap);
  // console.log(cinemaToday);
  console.log(allLstCumRap);

  const renderTabPanel = () => {
    if (allLstCumRap && allLstCumRap.length > 0) {
      return allLstCumRap.map((cumRap, index) => {
        const settings = {
          className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
          id: checkId(cumRap.maCumRap),
        };
        let isCumRapHasShowToday = checkCumRapHasShowToday(
          cinemaToday,
          cumRap.maCumRap
        );
        return (
          <TabPanel key={cumRap.maCumRap} settings={settings}>
            {isCumRapHasShowToday ? (
              renderMovieDetail(cumRap)
            ) : (
              <div className="alert alert-danger">
                Không có lịch chiếu hôm nay
              </div>
            )}
          </TabPanel>
        );
      });
    }
  };

  const renderTest = () => {
    if (listHeThongLichChieu && listHeThongLichChieu.length > 0) {
      return listHeThongLichChieu.map((heThongLichChieu, j) => {
        return (
          <Fragment key={heThongLichChieu.maHeThongRap}>
            {heThongLichChieu.lstCumRap.map((cumRap, index) => {
              return (
                <ListShowByGroup
                  key={cumRap.maCumRap}
                  cumRap={cumRap}
                  index={index}
                  j={j}
                />
              );
            })}
          </Fragment>
        );
      });
    }
  };

  //main return

  return (
    <>
      {renderTabPanel()}
      {/* {renderTest()} */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    listHeThongLichChieu: state.listHeThongRapReducer.listHeThongLichChieu,
  };
};
TabContentMovies.propTypes = {
  listHeThongLichChieu: PropTypes.array,
};
TabContentMovies.defaultProps = {
  listHeThongLichChieu: [],
};
export default connect(mapStateToProps, null)(TabContentMovies);
