import React from "react";
import PropTypes from "prop-types";

function UnSelectUI(props) {
  const { name, label, message } = props;
  return (
    <div className={`search__group ${name}`}>
      <select name={name} onChange={props.handleChange}>
        <option selected disabled hidden>
          {label}
        </option>
        <option value="" disabled>
          {message}
        </option>
      </select>
    </div>
  );
}

UnSelectUI.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default UnSelectUI;
