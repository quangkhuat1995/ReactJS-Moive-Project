import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import InfoIcon from "@material-ui/icons/Info";
import { connect } from "react-redux";
import { actAddCombo, actRemoveCombo } from "./modules/action";
import { BookingPageContext } from "../../containers/HOME/BookingPage/testIndex";

const styleGiaTien = (numPrice) => {
  return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
function ComboItem(props) {
  const { id, name, detail, price } = props;

  const [count, setCount] = useState(0);
  const { state, dispatch } = useContext(BookingPageContext);
  const { amount } = state;

  const handleClick = (price, num) => {
    if (num > 0) {
      //add
      dispatch({ type: "add", price });
    } else {
      //remove
      dispatch({ type: "remove", price });
    }
    setCount((c) => c + num);
  };

  return (
    <div className="combo__item--wrapper row">
      <div className="col-2 comboLogo">
        <img src="/images/popcorn.png" alt="pop" />
      </div>
      <div className="col-7 comboDetail">
        <div
          className="item-name"
          data-toggle="collapse"
          data-target={`#desc_${id}`}
          aria-expanded="false"
          aria-controls={id}
          role="button"
        >
          <InfoIcon fontSize="inherit" /> {name}
        </div>
        <div className="item-detail collapse" id={`desc_${id}`}>
          {detail}
        </div>
        <div className="item-price">{styleGiaTien(price)} đ</div>
      </div>
      <div className="col-3 comboOpt">
        <button
          type="button"
          className="btn-amount minus"
          onClick={() => handleClick(price, -1)}
          disabled={count === 0}
        >
          -
        </button>
        <span className="item-num">{count}</span>
        <button
          type="button"
          className="btn-amount add"
          onClick={() => handleClick(price, 1)}
          disabled={amount === 10}
        >
          +
        </button>
      </div>
    </div>
  );
}

ComboItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ComboItem;
