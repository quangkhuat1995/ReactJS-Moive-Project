import React, { PureComponent } from "react";
import avatar from "./../../images/avatar.png";
import { Link } from "react-router-dom";

export default class MainNav extends PureComponent {
  render() {
    const { customClass, isOpen } = this.props;

    return (
      <ul
        onClick={() => this.props.handleClose(isOpen)}
        className={`${customClass} ${isOpen ? "active" : ""}`}
      >
        <li className="nav-item nav-item--login">
          <Link className="nav-link" to="/login">
            <img className="avatar-img" src={avatar} alt="avatar" />
            Đăng Nhập
          </Link>
        </li>
        <li className="nav-item nav-item--register">
          <a className="nav-link" href="#!!!!">
            Đăng Ký
          </a>
        </li>
        <li className="nav-item hideOnDesk">
          <Link className="nav-link" to="/">
            Trang chủ
          </Link>
        </li>
        <li className="nav-item hideOnDesk">
          <Link className="nav-link" to="/">
            Lịch Chiếu
          </Link>
        </li>
        <li className="nav-item hideOnDesk">
          <Link className="nav-link" to="/">
            Tin Tức
          </Link>
        </li>
        <li className="nav-item hideOnDesk">
          <Link className="nav-link" to="/">
            Ứng dụng
          </Link>
        </li>
      </ul>
    );
  }
}

MainNav.defaultProps = {
  customClass: "nav-list",
};
