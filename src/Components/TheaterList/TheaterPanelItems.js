import PropTypes from "prop-types";
import React from "react";
import useMedia from "../../Hook/useMedia";
import CinemaDetailItem from "../CinemaDetailItem";
import TabPanel from "../TabPanel";
import GroupMoviesInCinema from "./GroupMoviesInCinema";

function TheaterPanelItems(props) {
  // console.log(singleHeThongRap.lstCumRap);
  const { heThongRap } = props;
  const listCumRap = heThongRap.lstCumRap;
  const isMobile = useMedia("(max-width:768px)");

  // console.log(listCumRap);
  if (listCumRap && listCumRap.length > 0) {
    return listCumRap.map((cumRap, index) => {
      //moblie thi toggle collapse, desktop thì toggle tab.
      const settings = isMobile
        ? {
            className: `logo__wrapper collapse__mobile`,
          }
        : {
            className: `logo__wrapper ${index === 0 ? "active" : ""}`,
            "data-toggle": "tab",
            role: "tab",
            "data-target": `#${cumRap.maCumRap.trim()}`,
          };
      const settingsCollapse = {
        className: `collapsed`,
        "data-toggle": "collapse",
        "data-target": `#${cumRap.maCumRap.trim()}`,
      };
      return (
        <TabPanel key={cumRap.maCumRap} settings={settings}>
          {isMobile ? (
            <>
              <TabPanel settings={settingsCollapse}>
                <CinemaDetailItem cinema={cumRap} system={heThongRap} />
              </TabPanel>
              {/* collapse group in mobile view */}
              <GroupMoviesInCinema cumRap={cumRap} />
            </>
          ) : (
            <CinemaDetailItem cinema={cumRap} system={heThongRap} />
          )}
        </TabPanel>
      );
    });
  }
}

TheaterPanelItems.propTypes = {
  heThongRap: PropTypes.object.isRequired,
};

export default TheaterPanelItems;
