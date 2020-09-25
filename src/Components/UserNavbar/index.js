import React, { memo, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
const logo = "/images/logo.png";

const navbarReducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, isNavOpen: true };
    case "close":
      return { ...state, isNavOpen: false };
    case "toggle":
      return { ...state, isNavOpen: !state.isNavOpen };
    default:
      return state;
  }
};
const initialState = {
  isNavOpen: false,
};

function UserNavbar() {
  const [state, dispatch] = useReducer(navbarReducer, initialState);
  const { isNavOpen } = state;

  //effect opacity khi scroll xuống
  useEffect(() => {
    const header_wrapper = document.querySelector(".header-wrapper");

    document.addEventListener("scroll", () => {
      var scroll_position = window.scrollY;
      if (scroll_position > 10) {
        header_wrapper.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      } else {
        header_wrapper.style.backgroundColor = "rgba(255, 255, 255)";
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Effect tự động đóng nav khi resize window > 768px và khóa cuộn trang khi đang mở nav
  useEffect(() => {
    if (isNavOpen) {
      // window.addEventListener("resize", () => {
      //   if (window.outerWidth >= 768) {
      //     // document.body.style.overflowY = "initial";
      //     // setIsOpen(false);
      //     dispatch({ type: "close" });
      //   }
      // });

      //Khi navbar đang mở thi khóa cuộn trang
      document.body.style.overflow = "hidden";
    } else {
      //   //set lai bth khi navbar đóng
      document.body.style.overflow = null;
    }
  }, [isNavOpen]);

  return (
    <>
      <header id="header">
        <div className="header-wrapper">
          <div className="nav-bar container-fluid">
            <Link to="/" className="navbar-brand">
              <img className="logo-img" src={logo} alt="logo" />
            </Link>
            <MainNav customClass="header__mid" />
            <nav className="nav-group">
              <div
                onClick={() => dispatch({ type: "toggle" })}
                className={`hamburger ${isNavOpen ? "active" : ""}`}
              >
                <div className="bar" />
              </div>
              <MainNav
                handleClose={() => dispatch({ type: "close" })}
                isOpen={isNavOpen}
              />
            </nav>
          </div>
        </div>
      </header>
      <div style={{ marginTop: "60px" }}></div>
    </>
  );
}

export default memo(UserNavbar);
