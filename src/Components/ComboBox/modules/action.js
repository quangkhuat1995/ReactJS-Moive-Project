import { ADD_COMBO, REMOVE_COMBO } from "./constant";

const actAddCombo = (price) => {
  // let itemPrice = count  * price;
  return {
    type: ADD_COMBO,
    price,
  };
};

const actRemoveCombo = (price) => {
  return {
    type: REMOVE_COMBO,
    price,
  };
};

export { actAddCombo, actRemoveCombo };
