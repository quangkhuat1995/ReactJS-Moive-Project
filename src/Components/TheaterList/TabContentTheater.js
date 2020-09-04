import React from "react";
// import TabPanel from "./TabPanel";
import NavLink from "./NavLink";
import DetailTheaterItem from "./DetailTheaterItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TabPanel from "../TabPanel.js";
import ListShowByGroup from "../ListShowByGroup";
function TabContentTheater(props) {
  //render thong tin tung cum rap
  const renderPanelItems = (singleHeThongRap) => {
    // console.log(singleHeThongRap.lstCumRap);
    const listCumRap = singleHeThongRap.lstCumRap;
    // console.log(listCumRap);
    if (listCumRap && listCumRap.length > 0) {
      return listCumRap.map((cumRap, index) => {
        const settings = {
          className: `nav__wrapper ${index === 0 ? "active" : ""}`,
          "data-toggle": "tab",
          role: "tab",
          "data-target": `#${cumRap.maCumRap}`,
        };
        return (
          <TabPanel key={cumRap.maCumRap} settings={settings}>
            <DetailTheaterItem
              theater={cumRap}
              heThong={singleHeThongRap}
              hasLabel={true}
            />

            {/* mobie collapse */}
            {/* <ListShowByGroup cumRap={cumRap}/> */}
          </TabPanel>
        );
      });
    }
  };

  const renderTabPanel = () => {
    const { listHeThongLichChieu } = props;
    return listHeThongLichChieu.map((item, index) => {
      const settings = {
        className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
        id: item.maHeThongRap,
      };
      return (
        <TabPanel key={item.maHeThongRap} settings={settings}>
          <div className="nav nav-tabs">
            {/* many tabpanel here */}
            {renderPanelItems(item)}
          </div>
        </TabPanel>
      );
    });
  };

  return <div className="tab-content theater__details">{renderTabPanel()}</div>;
}

const mapStateToProps = (state) => {
  return {
    listHeThongLichChieu: state.listHeThongRapReducer.listHeThongLichChieu,
  };
};

TabContentTheater.propTypes = {
  listHeThongLichChieu: PropTypes.array.isRequired,
};

TabContentTheater.defaultProps = {
  listHeThongLichChieu: [],
};
export default connect(mapStateToProps, null)(TabContentTheater);
