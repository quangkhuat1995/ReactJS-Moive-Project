import React, { memo } from "react";
import { Link } from "react-router-dom";
const avatar = "/images/avatar.png";

function UnLoggedUI() {
  return (
    <>
      <li className="nav-item nav-item--login">
        <Link className="nav-link" to="/login">
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
