import React, { useContext, memo, useState } from "react";
import PropTypes from "prop-types";
import { BookingPageContext } from "../../containers/HOME/BookingPage/testIndex";
import { comboData } from "../../constants/comboData";
import ComboItem from "./ComboItem";

function ComboBox() {
  const { dispatch } = useContext(BookingPageContext);

  return (
    <>
      <div className="combo-wrapper">
        {/* combolist 1 */}
        {comboData.map((combo) => {
          return (
            <div className="combo-list" key={combo.id}>
              <div className="combo-title">{combo.comboTitle}</div>
              {combo.comboItem.map((item) => (
                <ComboItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  detail={item.detail}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div
        className="back-drop"
        onClick={() => dispatch({ type: "close-combo" })}
      ></div>
    </>
  );
}

export default memo(ComboBox);
