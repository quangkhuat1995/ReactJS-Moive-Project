import React, { memo } from "react";
import PropTypes from "prop-types";

function ErrorUI(props) {
  return <div className="alert alert-danger">{props.message}</div>;
}

ErrorUI.propTypes = {
  message: PropTypes.string.isRequired,
};

export default memo(ErrorUI);
