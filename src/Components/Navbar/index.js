import React, { Component } from "react";
import logo from "./../../../public/images/logo.png"
import HeaderMid from "./HeaderMid";

export default class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="logo" />
            </a>
            <HeaderMid/>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#loginNav"
              aria-controls="loginNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            />
            <div className="collapse navbar-collapse" id="loginNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="modal"
                    data-target="#modalLRForm"
                  >
                    <img className="btnLogin" src="./images/avatar.png" alt />
                    Đăng Nhập
                  </a>
                </li>
                <li className="nav-item hideOnDesk">
                  <a className="nav-link" href="#lichchieu">
                    Lịch chiếu
                  </a>
                </li>
                <li className="nav-item hideOnDesk">
                  <a className="nav-link" href="#cumrap">
                    Cụm rạp
                  </a>
                </li>
                <li className="nav-item hideOnDesk">
                  <a className="nav-link" href="#tintuc">
                    Tin tức
                  </a>
                </li>
                <li className="nav-item hideOnDesk">
                  <a className="nav-link" href="#ungdung">
                    Ứng dụng
                  </a>
                </li>
                <li className="nav-item nav-item--location">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="modal"
                    data-target="#modalLRForm"
                  >
                    Đăng ký
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
