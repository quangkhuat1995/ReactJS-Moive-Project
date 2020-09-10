import PropTypes from "prop-types";
import React from "react";
import LabelContent from "../LabelContent";
import theaterImagesData from "./../../constants/theaterImagesData";

const getLogo = (maHeThong) => {
  let foundCumRap = theaterImagesData.find((item) => {
    return item.maHeThongRap === maHeThong;
  });
  return foundCumRap.logo;
};

function CinemaDetailItem(props) {
  const { system, cinema } = props;
  return (
    <div className="cinema__details--item">
      <img
        className="theaterList__image"
        src={getLogo(system.maHeThongRap)}
        alt={system.tenHeThongRap}
      />
      <LabelContent cinema={cinema} />
    </div>
  );
}

CinemaDetailItem.propTypes = {
  system: PropTypes.object,
  cinema: PropTypes.object,
};
CinemaDetailItem.defaultProps = {
  system: {},
  cinema: {},
};
export default CinemaDetailItem;
