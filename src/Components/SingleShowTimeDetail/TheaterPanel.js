import React from "react";
import TheaterContent from "./TheaterContent";
import TabPanel from "../TabPanel";
import useMedia from "../../Hook/useMedia";
import PropTypes from "prop-types";

function TheaterPanel(props) {
  const { heThongRap, index } = props;
  const isMobile = useMedia("(max-width:768px)");

  const settings = isMobile
    ? {
        className: "collapse",
        id: heThongRap.maHeThongRap,
      }
    : {
        className: `tab-pane fade ${index === 0 ? "show active" : ""}`,
        id: heThongRap.maHeThongRap,
      };
  return (
    <TabPanel settings={settings}>
      <TheaterContent maHeThongRap={heThongRap.maHeThongRap} />
    </TabPanel>
  );
}

TheaterPanel.propTypes = {
  heThongRap: PropTypes.object.isRequired,
  index: PropTypes.number,
};
TheaterPanel.defaultProps = {
  heThongRap: {},
  index: 0,
};
export default TheaterPanel;
