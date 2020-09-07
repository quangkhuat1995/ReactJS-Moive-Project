import React from "react";
import PropTypes from "prop-types";

// tenCumRap = CGV - CresionMall || BHD Star Cineplex - Pham Hung
const renderTenCumRap = (tenCumRap) => {
  if (tenCumRap.includes("Cineplex")) {
    return tenCumRap.split("Cineplex -");
  }
  return tenCumRap.split(" -");
};

function LabelContent(props) {
  const { theater } = props;
  const tenCumRap = theater.tenCumRap;
  return (
    <div className="wrapInfo">
      <span className="chiNhanh">
        {/* <span className={`tenRap ${renderTenCumRap(tenCumRap)[0]}`}> */}
        <span className={`tenRap ${renderTenCumRap(tenCumRap)[0]}`}>
          {renderTenCumRap(tenCumRap)[0]}
        </span>{" "}
        - {renderTenCumRap(tenCumRap)[1]}
      </span>
      {theater.diaChi && <span className="diaChi">{theater.diaChi}</span>}
    </div>
  );
}

LabelContent.propTypes = {
  theater: PropTypes.object.isRequired,
};
LabelContent.defaultProps = {
  theater: {},
};

export default LabelContent;
