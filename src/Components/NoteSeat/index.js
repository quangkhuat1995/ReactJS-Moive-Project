import React, { memo } from "react";
import PropTypes from "prop-types";

function NoteSeat(props) {
  const { type, info } = props;
  return (
    <span className="note__item">
      <span className={`seat-${type}`} />
      <span className="seat-info">{info}</span>
    </span>
  );
}

NoteSeat.propTypes = {
  info: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(NoteSeat);
