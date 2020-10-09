import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { prefixHttp } from "../../utils/movies";

function LogoHeTHong(props) {
  const { heThong, hasLabel } = props;
  const urlHinhAnh = useMemo(() => prefixHttp(heThong.logo), [heThong.logo]);

  return (
    <div className="logo__detail">
      <img
        className="theaterList__image"
        src={urlHinhAnh}
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
