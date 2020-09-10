import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import useMedia from "../../Hook/useMedia";
import LogoHeThong from "../LogoHeThong";
import NavTabLogo from "../NavTabLogo";
import TabPanel from "../TabPanel";
import TheaterPanel from "./TheaterPanel";

const renderLogoAsCollapse = (listHeThongRap) => {
  if (listHeThongRap && listHeThongRap.length > 0) {
    return listHeThongRap.map((item, index) => {
      const settingsCollapse = {
        className: "collapsed MOBILE wrapper__collase?",
        "data-toggle": "collapse",
        "data-target": `#${item.maHeThongRap}`,
      };
      return (
        <div className="logo__wrapper collapse__mobile" key={item.maHeThongRap}>
          <TabPanel settings={settingsCollapse}>
            <LogoHeThong heThong={item} hasLabel={true} />
          </TabPanel>
          {/* collapse items */}
          <TheaterPanel heThongRap={item} />
        </div>
      );
    });
  }
};

function Theater(props) {
  const { listHeThongRap } = props;
  const isMobile = useMedia("(max-width:768px)");

  return (
    <>
      {isMobile ? (
        <>{renderLogoAsCollapse(listHeThongRap)}</>
      ) : (
        <NavTabLogo hasLabel={true} />
      )}
    </>
  );
}

Theater.propTypes = {
  listHeThongRap: PropTypes.array.isRequired,
};
Theater.defaultProps = {
  listHeThongRap: [],
};

const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};

export default connect(mapStateToProps, null)(Theater);
