import { SET_LOG, TOGGLE_NAV, TOGGLE_NAV_FORCE } from "./constant";

const initialState = {
  isLoggedIn: false,
  isNavOpen: false,
};

const userStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAV:
      return { ...state, isNavOpen: !state.isNavOpen };

    case TOGGLE_NAV_FORCE:
      return { ...state, isNavOpen: action.forceStatus };

    case SET_LOG:
      return { ...state, isLoggedIn: action.status };

    default:
      return { ...state };
  }
};

export default userStatusReducer;
