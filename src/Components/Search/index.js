import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <section className="search myContainer">
        <form className="search__form">
          <div className="search__group search__name">
            <select name="name" id>
              <option value>Ten phim 1</option>
              <option value>Ten phim 2</option>
              <option value>Ten phim 3</option>
            </select>
          </div>
          <div className="search__group search__theater">
            <select name="name" id>
              <option value>Rap phim 1</option>
              <option value>Rap phim 2</option>
              <option value>Rap phim 3</option>
            </select>
          </div>
          <div className="search__group search__date">
            <select name="name" id>
              <option value>Ngay chieu phim 1</option>
              <option value>Ngay chieu phim 2</option>
              <option value>Ngay chieu phim 3</option>
            </select>
          </div>
          <div className="search__group search__time">
            <select name="name" id>
              <option value>Thoi gian phim 1</option>
              <option value>Thoi gian phim 2</option>
              <option value>Thoi gian phim 3</option>
            </select>
          </div>
          <div className="search__group search__button">
            <button className="btnBuyTicket">MUA VÉ NGAY</button>
          </div>
        </form>
      </section>
    );
  }
}
