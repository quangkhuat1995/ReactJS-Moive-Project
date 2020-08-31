import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import { connect } from "react-redux";
import {
  actToggleNav,
  actSetLogStatus,
  actToggleNav_Force,
} from "./modules/action";

const logo = "/images/logo.png";

//Theory:  isNavOpen: true-> mở nav, false-> đóng nav
function UserNavbar(props) {
  // console.log(props);
  const { isNavOpen, actToggleNav, actToggleNav_Force } = props;

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
  }, []);

  //Effect tự động đóng nav khi resize window > 768px và khóa cuộn trang khi đang mở nav
  useEffect(() => {
    if (isNavOpen) {
      window.addEventListener("resize", () => {
        if (window.outerWidth >= 768) {
          // document.body.style.overflowY = "initial";
          // setIsOpen(false);
          actToggleNav_Force(false);
        }
      });
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
                onClick={actToggleNav}
                className={`hamburger ${isNavOpen ? "active" : ""}`}
              >
                <div className="bar" />
              </div>
              <MainNav
                handleClose={() => actToggleNav_Force(false)}
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
const mapStateToProps = (state) => {
  return {
    isNavOpen: state.userStatusReducer.isNavOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actToggleNav: () => {
      dispatch(actToggleNav());
    },
    actToggleNav_Force: (forceStatus) => {
      dispatch(actToggleNav_Force(forceStatus));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);
