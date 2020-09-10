import React from "react";
import PropTypes from "prop-types";

function TabPanel(props) {
  return <div {...props.settings}>{props.children}</div>;
}

TabPanel.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default TabPanel;
