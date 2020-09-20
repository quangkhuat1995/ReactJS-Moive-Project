import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { USER_KEY } from "../../constants/config";

const user = localStorage.getItem(USER_KEY);
function LoggedUI(props) {
  return (
    <>
      <li className="nav-item nav-item--login">
        <span className="nav-link">
          Xin chào <span>{JSON.parse(user).hoTen}</span>
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
};

export default LoggedUI;
