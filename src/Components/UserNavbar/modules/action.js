import { SET_LOG, TOGGLE_NAV, TOGGLE_NAV_FORCE } from "./constant";

const actToggleNav = () => {
  return {
    type: TOGGLE_NAV,
  };
};

const actToggleNav_Force = (forceStatus) => {
  return {
    type: TOGGLE_NAV_FORCE,
    forceStatus,
  };
};

const actSetLogStatus = (status) => {
  return {
    type: SET_LOG,
    status,
  };
};

export { actToggleNav, actSetLogStatus, actToggleNav_Force };
