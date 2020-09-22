import React, { memo } from "react";
import PropTypes from "prop-types";

function NavigationTab(props) {
  const { items } = props;
  return (
    <ul className="nav nav-tabs navigation__tab" role="tablist">
      {Object.entries(items).map((item, idx) => {
        return (
          <li key={item} className="nav-item" role="presentation">
            <a
              className={`nav-link ${idx === 0 ? "active" : ""}`}
              // id="lichChieu-tab"
              data-toggle="tab"
              href={`#${item[0]}`}
              role="tab"
              aria-selected={`${idx === 0}` && true}
            >
              {item[1]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

NavigationTab.propTypes = {
  items: PropTypes.object.isRequired,
};

export default memo(NavigationTab);
