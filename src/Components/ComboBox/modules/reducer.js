import { ADD_COMBO, REMOVE_COMBO } from "./constant";

const initialState = {
  amount: 0,
  totalCost: 0,
};

const comboReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMBO:
      return {
        ...state,
        amount: state.amount + 1,
        totalCost: state.totalCost + action.price,
      };
    case REMOVE_COMBO:
      return {
        ...state,
        amount: state.amount - 1,
        totalCost: state.totalCost - action.price,
      };

    default:
      return { ...state };
  }
};

export default comboReducer;
