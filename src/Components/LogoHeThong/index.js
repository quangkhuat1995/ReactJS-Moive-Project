import React, { memo } from "react";
import PropTypes from "prop-types";

function LogoHeTHong(props) {
  const { heThong, hasLabel } = props;
  return (
    <div className="logo__detail">
      <img
        className="theaterList__image"
        src={heThong.logo}
        alt={heThong.tenHeThongRap}
      />
      {hasLabel && (
        <>
          <span className="tenHeThong">{heThong.tenHeThongRap}</span>
          <span className="arrow" />
        </>
      )}
    </div>
  );
}

LogoHeTHong.propTypes = {
  hasLabel: PropTypes.bool.isRequired,
  heThong: PropTypes.object.isRequired,
};
LogoHeTHong.defaultProps = {
  hasLabel: false,
  heThong: {},
};

export default memo(LogoHeTHong);
