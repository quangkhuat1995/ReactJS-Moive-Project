import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LoggedUI(props) {
  const store = localStorage.getItem("userUser");

  return (
    <>
      <li className="nav-item nav-item--login">
        <span className="nav-link">
          Xin chào <span>{JSON.parse(store).hoTen}</span>
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
