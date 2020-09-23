import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LoggedUI(props) {
  // const user = localStorage.getItem(USER_KEY);
  return (
    <>
      <li className="nav-item nav-item--login">
        <span className="nav-link">
          Xin chào <span>{props.hoTen}</span>
        </span>
      </li>
      <li className="nav-item nav-item--register">
        <Link
          className="nav-link"
          to="/"
          onClick={(e) => props.handleLogOut(e)}
        >
          Đăng xuất
        </Link>
      </li>
    </>
  );
}

LoggedUI.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  hoTen: PropTypes.string.isRequired,
};

export default LoggedUI;
