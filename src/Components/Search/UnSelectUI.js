import React, { memo } from "react";
import PropTypes from "prop-types";

function UnSelectUI(props) {
  const { name, label, message } = props;
  return (
    <div className={`search__group ${name}`}>
      <select defaultValue name={name} onChange={props.handleChange}>
        <option value="" hidden>
          {label}
        </option>
        <option value={message} disabled>
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

export default memo(UnSelectUI);
