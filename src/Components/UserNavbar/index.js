import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";

const logo = "/images/logo.png";

function UserNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = (currentStatus) => {
    if (currentStatus) {
      setIsOpen(false);
    }
  };

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

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", () => {
        if (window.outerWidth >= 768) {
          // document.body.style.overflowY = "initial";
          setIsOpen(false);
        }
      });
      //Khi navbar đang mở thi khóa cuộn trang
      document.body.style.overflow = "hidden";
    } else {
      //   //set lai bth khi navbar đóng
      document.body.style.overflow = null;
    }
  }, [isOpen]);

  return (
    <>
      <header id="header">
        <div className="header-wrapper">
          <div className="nav-bar container-fluid">
            <Link to="/" className="navbar-brand">
              <img className="logo-img" src={logo} alt="logo" />
            </Link>
            <MainNav
              customClass="header__mid"
              handleClose={handleClose}
              isOpen={isOpen}
            />
            <nav className="nav-group">
              <div
                onClick={handleToggleNav}
                className={`hamburger ${isOpen ? "active" : ""}`}
              >
                <div className="bar" />
              </div>
              <MainNav handleClose={handleClose} isOpen={isOpen} />
            </nav>
          </div>
        </div>
      </header>
      <div style={{ marginTop: "60px" }}></div>
    </>
  );
}

export default memo(UserNavbar);
