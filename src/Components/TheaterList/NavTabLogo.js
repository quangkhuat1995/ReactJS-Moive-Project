import React from "react";
import NavLink from "./NavLink";
import { connect } from "react-redux";

function NavTabLogo(props) {
  const renderLogo = () => {
    const { listHeThongRap } = props;
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

  return (
    <div className={`nav nav-tabs theater__logos flex-column`}>
      {renderLogo()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};

export default connect(mapStateToProps, null)(NavTabLogo);
