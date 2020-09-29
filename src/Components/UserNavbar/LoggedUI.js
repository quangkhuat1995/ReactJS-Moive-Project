import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actLogout } from "../../containers/HOME/LoginPage/modules/action";

function LoggedUI(props) {
  // const user = localStorage.getItem(USER_KEY);
  const { actLogout, hoTen } = props;

  return (
    <>
      <li className="nav-item nav-item--login">
        <span className="nav-link">
          <img
            className="avatar-img"
            src={"https://loremflickr.com/320/240"}
            alt="avatar"
          />
          {hoTen}
        </span>
      </li>
      <li className="nav-item nav-item--register">
        <Link className="nav-link" to="/" onClick={(e) => actLogout(e)}>
          Đăng xuất
        </Link>
      </li>
    </>
  );
}

LoggedUI.propTypes = {
  actLogout: PropTypes.func.isRequired,
  hoTen: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actLogout: (e) => {
      dispatch(actLogout(e));
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(LoggedUI));
