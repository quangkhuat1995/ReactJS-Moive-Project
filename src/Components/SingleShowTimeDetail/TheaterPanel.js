import React from "react";
import { connect } from "react-redux";
import TabPanel from "../TheaterList/TabPanel";
import TheaterContent from "./TheaterContent";

function TheaterPanel(props) {
  const { listHeThongRap } = props;
  const { heThongRapChieu } = props.detailMovie;
  const renderHeThongRapChieu = () => {
    if (heThongRapChieu && heThongRapChieu.length > 0) {
      return heThongRapChieu.map((item) => {
        return (
          <div
            key={item.maHeThongRap}
            className="theater__details--item"
            data-toggle="collapse"
            data-target={`#${item.maHeThongRap}-colappsed`}
          >
            <img
              className="theater__image"
              src={item.logo}
              alt={item.tenHeThongRap}
            />
            <div className="wrapInfo">
              <span className="chiNhanh">
                <span className="tenRap CGV">CGV</span> - Thảo Điền Pearl
              </span>
              <span className="diaChi">
                Tầng 2, Thảo Điền Mall, 12 Quốc Hương, Phường Thảo --&gt; Điền,
                Quận 2, TP. Hồ Chí Minh
              </span>
            </div>
            <div
              className="collapse show timeList testTimeList"
              id={`${item.maHeThongRap}-colappsed`}
            >
              <a href="#" className="btn btn-time">
                13:20
              </a>
              <a href="#" className="btn btn-time">
                13:20
              </a>
              <a href="#" className="btn btn-time">
                13:20
              </a>
              <a href="#" className="btn btn-time">
                13:20
              </a>
              <a href="#" className="btn btn-time">
                13:20
              </a>
            </div>
          </div>
        );
      });
    }
  };

  // return <TabPanel className="detail__showList tab-pane">
  //  { renderHeThongRapChieu()}
  // </TabPanel>;
  const renderTabPanel = () => {
    if (listHeThongRap && listHeThongRap.length > 0) {
      return listHeThongRap.map((item, index) => {
        const settings = {
          className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
          id: item.maHeThongRap,
        };
        return (
          <TabPanel settings={settings} key={item.maHeThongRap}>
            <TheaterContent maHeThongRap={item.maHeThongRap} />
          </TabPanel>
        );
      });
    }
  };
  return <>{renderTabPanel()}</>;
}
const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
    detailMovie: state.detailMovieReducer.detailMovie,
  };
};
export default connect(mapStateToProps, null)(TheaterPanel);
