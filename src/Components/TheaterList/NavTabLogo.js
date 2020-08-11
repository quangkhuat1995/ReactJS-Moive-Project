import React, { Component } from "react";
// import { requests } from "./../../requests";
// import { callAPI } from "../../callAPI";
import NavLink from "./NavLink";

export default class NavTab extends Component {
  renderLogo = () => {
    const { listHeThongRap } = this.props;
    return listHeThongRap.map((item, index) => {
      return (
        <NavLink
          key={item.maHeThongRap}
          href={item.maHeThongRap}
          className={`nav-item nav-link${index === 0 ? " active" : ""}`}
          // data-toggle="tab"
        >
          <img
            className="theater__image"
            src={item.logo}
            alt={item.tenHeThongRap}
          />
        </NavLink>
      );
    });
  };
  render() {
    return (
      <div className={`nav nav-tabs theater__logos flex-column`}>
        {this.renderLogo()}
      </div>
    );
  }
}
