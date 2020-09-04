import React from "react";
import PropTypes from "prop-types";
import DetailMovieItem from "../TheaterList/DetailMovieItem";
import TabPanel from "../TheaterList/TabPanel";
//api tra ve string sai nen phai lam cai nay
// "maCumRap": "glx-nguyen-du\r\n",
const checkId = (idString) => {
  return idString.replace(/[\r\n]/g, "");
};

const TODAY = "2019-01-01";
const getTodayListTime = (lstLichChieu = []) => {
  if (lstLichChieu && lstLichChieu.length > 0) {
    return lstLichChieu.filter((lichChieu) => {
      return lichChieu.ngayChieuGioChieu.slice(0, 10) === TODAY;
    });
  }
};

let cumRapToday = [];
const findMovieHasShowToday = (cumRap = {}) => {
  let todayList = [];
  cumRap.danhSachPhim.forEach((movie) => {
    todayList = getTodayListTime(movie.lstLichChieuTheoPhim);
    if (todayList.length > 0) {
      cumRapToday.push(cumRap);
    }
  });

  //filter (remove) duplicate
  cumRapToday = cumRapToday.reduce(
    (items, item) =>
      items.find((x) => x.maCumRap === item.maCumRap)
        ? [...items]
        : [...items, item],
    []
  );
  return cumRapToday;
};

//wait
const checkCumRapHasShowToday = (cumRapToday = [], maCumRap) => {
  return cumRapToday.some((item) => item.maCumRap === maCumRap);
};

const renderListMovie = (cumRap) => {
  if (cumRap.danhSachPhim && cumRap.danhSachPhim.length > 0) {
    return cumRap.danhSachPhim.map((movie) => {
      const todayListTime = getTodayListTime(movie.lstLichChieuTheoPhim);
      console.log(movie.lstLichChieuTheoPhim);

      console.log(todayListTime);

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

// const renderListCumRap = (lstCumRap = []) => {
//   if (lstCumRap && lstCumRap.length > 0) {
//     cinemaToday = findCumRapHasShowToday(cumRap);
//     console.log(cinemaToday);

//     return lstCumRap.map((cumRap, index) => {
//       const settings = {
//         className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
//         id: checkId(cumRap.maCumRap),
//       };
//       let isCumRapHasShowToday = checkCumRapHasShowToday(
//         cinemaToday,
//         cumRap.maCumRap
//       );
//       return (
//         <TabPanel key={cumRap.maCumRap} settings={settings}>
//           {isCumRapHasShowToday ? (
//             renderListMovie(cumRap)
//           ) : (
//             <div className="alert alert-danger">
//               Không có lịch chiếu hôm nay
//             </div>
//           )}
//         </TabPanel>
//       );
//     });
//   }
// };

//export
function ListShowByGroup(props) {
  const { cumRap, index, j } = props;
  cumRapToday = findMovieHasShowToday(cumRap);
  // console.log(cumRapToday);

  //main return
  const settingssssss = {
    className: "collapse show ListShowByGroup MAYBE_COLLAPSE FOR MOBILE",
    id: checkId(cumRap.maCumRap),
  };
  const settings = {
    className: `tab-pane fade ${index === 0 && j === 0 ? "show active" : ""}`,
    id: checkId(cumRap.maCumRap),
  };
  let isCumRapHasMovieToday = checkCumRapHasShowToday(
    cumRapToday,
    cumRap.maCumRap
  );
  return (
    <TabPanel settings={settings}>
      {/*  */}
      {isCumRapHasMovieToday ? (
        renderListMovie(cumRap)
      ) : (
        <div className="alert alert-danger">không có phim</div>
      )}
    </TabPanel>
  );
}
/**
 // 1.kiểm tra xem cụm rạp đó có phim nào lịch chiếu hôm nay không
 * Nếu có thì render ra, không thì thông báo
 */

ListShowByGroup.propTypes = {
  cumRap: PropTypes.object.isRequired,
};
ListShowByGroup.defaultProps = {
  cumRap: {},
};

export default ListShowByGroup;
