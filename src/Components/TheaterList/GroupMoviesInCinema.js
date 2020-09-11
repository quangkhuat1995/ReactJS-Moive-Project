import React from "react";
import PropTypes from "prop-types";
import DetailMovieItem from "./DetailMovieItem";
import TabPanel from "../TabPanel";
import useMedia from "../../Hook/useMedia";
import { TODAY } from "./../../constants/config";

const getTodayListTime = (lstLichChieu = []) => {
  if (lstLichChieu && lstLichChieu.length > 0) {
    return lstLichChieu.filter((lichChieu) => {
      return lichChieu.ngayChieuGioChieu.slice(0, 10) === TODAY;
    });
  }
};

/**
 * Nếu có bất kì phim nào trong cumRap có lịch chiếu vào ngày hôm nay thì thì đưa cumRap đó vào mảng cinemaToday
 */
const findMovieHasShowToday = (cumRap = {}) => {
  let cinemaToday = [];
  cumRap.danhSachPhim.forEach((movie) => {
    let todayList = [];
    todayList = getTodayListTime(movie.lstLichChieuTheoPhim);
    if (todayList.length > 0) {
      // cinemaToday.push(cumRap);
      cinemaToday = [...cinemaToday, cumRap];
    }
  });

  // filter (remove) duplicate
  // cinemaToday = cinemaToday.reduce(
  //   (items, item) =>
  //     items.find((x) => x.maCumRap === item.maCumRap)
  //       ? [...items]
  //       : [...items, item],
  //   []
  // );
  return cinemaToday;
};

const checkCinemaHasShowToday = (cinemaToday = [], maCumRap) => {
  return cinemaToday.some((item) => item.maCumRap === maCumRap);
};

const renderListMovie = (cumRap) => {
  if (cumRap.danhSachPhim && cumRap.danhSachPhim.length > 0) {
    return cumRap.danhSachPhim.map((movie) => {
      const todayListTime = getTodayListTime(movie.lstLichChieuTheoPhim);

      //phim có thời gian chiếu trong hôm nay mới render ra
      return (
        todayListTime.length > 0 && (
          <DetailMovieItem
            key={movie.maPhim}
            movie={movie}
            maCumRap={cumRap.maCumRap}
            todayListTime={todayListTime}
          />
        )
      );
    });
  }
};

//export
function GroupMoviesInCinema(props) {
  const { cumRap, index, j } = props;
  const cinemaToday = findMovieHasShowToday(cumRap);
  const isMobile = useMedia("(max-width: 768px)");

  const settings = isMobile
    ? {
        className: "collapse GroupMoviesInCinema MOBILE",
        id: cumRap.maCumRap.trim(),
      }
    : {
        className: `tab-pane fade ${
          index === 0 && j === 0 ? "show active" : ""
        }`,
        id: cumRap.maCumRap.trim(),
      };

  let isCinemaHasMovieToday = checkCinemaHasShowToday(
    cinemaToday,
    cumRap.maCumRap
  );

  //main return,
  return (
    <TabPanel settings={settings}>
      {/*  */}
      {isCinemaHasMovieToday ? (
        renderListMovie(cumRap)
      ) : (
        <div className="alert alert-danger">
          Cụm rạp này hôm nay không có phim
        </div>
      )}
    </TabPanel>
  );
}
/**
 // 1.kiểm tra xem cụm rạp đó có phim nào lịch chiếu hôm nay không
 * Nếu có thì render ra, không thì thông báo
 */

GroupMoviesInCinema.propTypes = {
  cumRap: PropTypes.object.isRequired,
  index: PropTypes.number,
  j: PropTypes.number,
};
GroupMoviesInCinema.defaultProps = {
  cumRap: {},
  index: 0,
  j: 0,
};

export default GroupMoviesInCinema;
