import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
const avatar = "/images/avatar.png";

function UnLoggedUI() {
  const location = useLocation();
  return (
    <>
      <li className="nav-item nav-item--login">
        <Link
          className="nav-link"
          to={{ pathname: "/login", state: { from: location } }}
        >
          <img className="avatar-img" src={avatar} alt="avatar" />
          Đăng Nhập
        </Link>
      </li>
      <li className="nav-item nav-item--register">
        <Link className="nav-link" to="/sign-up">
          Đăng Ký
        </Link>
      </li>
    </>
  );
}

export default memo(UnLoggedUI);
