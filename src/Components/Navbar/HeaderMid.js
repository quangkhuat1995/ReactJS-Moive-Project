import React, { PureComponent } from "react";

export default class HeaderMid extends PureComponent {
  render() {
    return (
      <div className="header__mid">
        <a className="header__mid--link" href="#lichchieu">
          Lịch chiếu
        </a>
        <a className="header__mid--link" href="#cumrap">
          Cụm rạp
        </a>
        <a className="header__mid--link" href="#tintuc">
          Tin tức
        </a>
        <a className="header__mid--link" href="#ungdung">
          Ứng dụng
        </a>
      </div>
    );
  }
}
