import React, { useEffect, memo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Components
import LoggedUI from "./LoggedUI";
import UnLoggedUI from "./UnLoggedUI";
import { USER_KEY } from "../../constants/config";
import { useSelector } from "react-redux";
// import avatar from "./../../images/avatar.png";

function MainNav(props) {
  const isLoggedIn = useSelector((state) => state.userLoginReducer.isLoggedIn);

  // console.log(isLoggedIn);
  const { customClass, isOpen, handleClose } = props; //nhận từ cha
  // const { isLoggedIn } = props; //store
  // console.log(props);
  // const [isLoggedin, setIsLoggedin] = useState(false);
  const [hoTen, setHoTen] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      const user = localStorage.getItem(USER_KEY);
      const hoTen = JSON.parse(user).hoTen;
      setHoTen(hoTen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul
      onClick={handleClose ? handleClose : null}
      className={`${customClass} ${isOpen ? "active" : ""}`}
    >
      {isLoggedIn ? <LoggedUI hoTen={hoTen} /> : <UnLoggedUI />}
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
MainNav.propTypes = {
  isOpen: PropTypes.bool,
  customClass: PropTypes.string,
  handleClose: PropTypes.func,
};

export default memo(MainNav);
