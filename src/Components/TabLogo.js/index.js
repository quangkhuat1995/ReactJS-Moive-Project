import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const StyledTabLogo = styled.div`
  display: flex;
`;
function TabLogo(props) {
  if (!theater) return null;
  return (
    <div {...props.settings} className="tab__wrapper">
      <div className="tab__img--wrapper">
        <img
          className="tab__img"
          src={theater.logo}
          alt={theater.tenHeThongRap}
        />
      </div>
      {props.children}
    </div>
  );
}

TabLogo.propTypes = {
  hasLabel: PropTypes.bool,
  theater: PropTypes.object,
};
TabLogo.defaulProps = {
  hasLabel: false,
};

export default TabLogo;
