import PropTypes from "prop-types";
import React from "react";
import LabelContent from "../LabelContent.js";
import theaterImagesData from "./../../constants/theaterImagesData";

const getLogo = (maHeThong) => {
  let foundCumRap = theaterImagesData.find((item) => {
    return item.maHeThongRap === maHeThong;
  });
  return foundCumRap.logo;
};

function DetailTheaterItem(props) {
  const { heThong, hasLabel, theater } = props;
  // note:  nếu CÓ hasLabel thì props theater là cụm rạp, nếu KHÔNG thì props theater là hệ thống rạp
  return (
    <div className="theater__details--item">
      <img
        className="theater__image"
        src={theater?.logo || getLogo(heThong.maHeThongRap)}
        alt={theater?.tenHeThongRap || heThong?.tenHeThongRap}
      />
      {hasLabel && <LabelContent theater={theater} />}
    </div>
  );
}

DetailTheaterItem.propTypes = {
  theater: PropTypes.object,
  heThong: PropTypes.object,
  hasLabel: PropTypes.bool,
};
DetailTheaterItem.defaultProps = {
  theater: {},
  heThong: {},
  hasLabel: false,
};
export default DetailTheaterItem;
