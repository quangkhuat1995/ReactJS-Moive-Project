import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import LoggedUI from "./LoggedUI";
import UnLoggedUI from "./UnLoggedUI";
// import avatar from "./../../images/avatar.png";

function MainNav(props) {
  const { customClass, isOpen } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userUser")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const handleLogOut = useCallback(
    (e) => {
      if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem("userUser");
        setIsLoggedIn(false);
      } else {
        // không đồng ý đăng xuất sẽ ngăn cản việc nhảy về trang home
        e.preventDefault();
      }
    },
    [isLoggedIn]
  );

  return (
    <ul
      onClick={() => props.handleClose(isOpen)}
      className={`${customClass} ${isOpen ? "active" : ""}`}
    >
      {isLoggedIn ? <LoggedUI handleLogOut={handleLogOut} /> : <UnLoggedUI />}
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

MainNav.defaultProps = {
  customClass: "nav-list",
};
export default MainNav;
