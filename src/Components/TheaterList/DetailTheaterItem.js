import React, { Component } from "react";

export default class DetailTheaterItem extends Component {
  renderTenCumRap = () => {
    // tenCumRap = CGV - CresionMall || BHD Star - Pham Hung
    const tenCumRap = this.props.cumRap.tenCumRap;
    return tenCumRap.split(" -"); // ["BHD Star", " Pham Hung"]
  };
  render() {
    const { heThong, cumRap } = this.props;
    // console.log(this.props);

    return (
      <div className="theater__details--item">
        <img
          className="theater__image"
          src={heThong.logo}
          alt={heThong.maHeThong}
        />
        <div className="wrapInfo">
          <span className="chiNhanh">
            <span className={`tenRap ${this.renderTenCumRap()[0]}`}>
              {this.renderTenCumRap()[0]}
            </span>{" "}
            - {this.renderTenCumRap()[1]}
          </span>
          <span className="diaChi">{cumRap.diaChi} </span>
        </div>
      </div>
    );
  }
}
