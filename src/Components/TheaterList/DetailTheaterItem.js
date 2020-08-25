import React from "react";
import { connect } from "react-redux";

function DetailTheaterItem(props) {
  const renderTenCumRap = () => {
    // tenCumRap = CGV - CresionMall || BHD Star - Pham Hung
    const tenCumRap = props.cumRap.tenCumRap;
    return tenCumRap.split(" -"); // ["BHD Star", " Pham Hung"]
  };
  const getLogo = (maHeThong) => {
    const { listHeThongRap } = props;
    if (listHeThongRap) {
      let heThong = listHeThongRap.find((item) => {
        return item.maHeThongRap === maHeThong;
      });
      return heThong.logo;
    }
  };

  const { cumRap, heThong } = props;
  // console.log(this.props);

  return (
    <div className="theater__details--item">
      <img
        className="theater__image"
        src={getLogo(heThong.maHeThongRap)}
        alt={heThong.maHeThongRap}
      />
      <div className="wrapInfo">
        <span className="chiNhanh">
          <span className={`tenRap ${renderTenCumRap()[0]}`}>
            {renderTenCumRap()[0]}
          </span>{" "}
          - {renderTenCumRap()[1]}
        </span>
        <span className="diaChi">{cumRap.diaChi} </span>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};

export default connect(mapStateToProps, null)(DetailTheaterItem);
