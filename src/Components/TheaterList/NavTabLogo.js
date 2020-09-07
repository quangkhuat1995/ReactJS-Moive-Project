import React from "react";
import NavLink from "./NavLink";
import { connect } from "react-redux";
import TabPanel from "../TabPanel.js";
import PropTypes from "prop-types";
import DetailTheaterItem from "./DetailTheaterItem";

function NavTabLogo(props) {
  const renderLogo = () => {
    const { listHeThongRap } = props;
    return listHeThongRap.map((item, index) => {
      const settings = {
        className: `nav__wrapper ${index === 0 ? "active" : ""}`,
        "data-toggle": "tab",
        role: "tab",
        "data-target": `#${item.maHeThongRap}`,
      };
      return (
        <TabPanel key={item.maHeThongRap} settings={settings}>
          {/* chỉ render logo hệ thống rạp hasLabel={false} */}
          <DetailTheaterItem hasLabel={false} theater={item} />
        </TabPanel>
      );
    });
  };

  return (
    <div className={`nav nav-tabs theater__logos flex-md-column `}>
      {renderLogo()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};

NavTabLogo.propTypes = {
  listHeThongRap: PropTypes.array.isRequired,
};

NavTabLogo.defaultProps = {
  listHeThongRap: [],
};

export default connect(mapStateToProps, null)(NavTabLogo);
