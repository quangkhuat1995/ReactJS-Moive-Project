import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";
const renderProps = (value) => {
  switch (value) {
    case "ATM":
      return {
        src: "/images/ATM.png",
        description: "Thẻ ATM nội địa",
      };
    case "VISA":
      return {
        src: "/images/visa_mastercard.png",
        description: "Visa, Master, JCB",
      };
    case "CASH":
      return {
        src: "/images/cash.png",
        description: "Thanh toán tiền mặt",
      };

    default:
      return;
  }
};

function Radio(props) {
  const { value, name } = props;
  const { src, description } = renderProps(value);

  return (
    <div className="radio__item">
      <input
        className="radio__item--input"
        type="radio"
        name={name}
        id={value}
        defaultValue={value}
      />
      <label className="radio__item--label label__ATM" htmlFor={value}>
        <div className="pay__figure">
          <img src={src} alt={value} />
        </div>
        <p className="pay__text">{description}</p>
      </label>
    </div>
  );
}

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default memo(Radio);
