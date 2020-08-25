import React from "react";
import TabPanel from "./TabPanel";
import DetailMovieItem from "./DetailMovieItem";
import { connect } from "react-redux";

function TabContentMovies(props) {
  const getLstCumRap = (array) => {
    if (array && array.length > 0) {
      return array.reduce((acc, item) => acc.concat(item.lstCumRap), []);
    }
  };

  const renderMovieDetail = (cumRap) => {
    if (cumRap.danhSachPhim && cumRap.danhSachPhim.length > 0) {
      return cumRap.danhSachPhim.map((movie, index) => {
        return (
          <DetailMovieItem
            key={movie.maPhim}
            movie={movie}
            maCumRap={cumRap.maCumRap}
          />
        );
      });
    }
  };

  //api tra ve string sai nen phai lam cai nay
  // "maCumRap": "glx-nguyen-du\r\n",
  const checkId = (idString) => {
    return idString.replace(/[\r\n]/g, "");
  };

  const renderTabPanel = () => {
    const { listHeThongLichChieu } = props;
    const listCumRapDetail = getLstCumRap(listHeThongLichChieu);
    if (listCumRapDetail && listCumRapDetail.length > 0) {
      return listCumRapDetail.map((item, index) => {
        const settings = {
          className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
          id: checkId(item.maCumRap),
        };
        return (
          <TabPanel key={item.maCumRap} settings={settings}>
            {renderMovieDetail(item)}
          </TabPanel>
        );
      });
    }
  };

  return <div className="tab-content theater__movies">{renderTabPanel()}</div>;
}

const mapStateToProps = (state) => {
  return {
    listHeThongLichChieu: state.listHeThongRapReducer.listHeThongLichChieu,
  };
};

export default connect(mapStateToProps, null)(TabContentMovies);
