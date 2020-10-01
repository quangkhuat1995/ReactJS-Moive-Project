import React, { useEffect, memo, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

//Components
import LoggedUI from "./LoggedUI";
import UnLoggedUI from "./UnLoggedUI";
import { USER_KEY } from "../../constants/config";
import { useSelector } from "react-redux";

function MainNav(props) {
  const isLoggedIn = useSelector((state) => state.userLoginReducer.isLoggedIn);

  // console.log(isLoggedIn);
  const { customClass, isOpen, handleClose } = props; //nhận từ cha

  const [hoTen, setHoTen] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      const user = localStorage.getItem(USER_KEY);
      const hoTen = JSON.parse(user).hoTen;
      setHoTen(hoTen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { hash } = useLocation();
  const [isHashLink, setIsHashLink] = useState(false);
  useEffect(() => {
    if (hash.includes("#")) {
      setIsHashLink(true);
    } else {
      setIsHashLink(false);
    }
  }, [hash]);

  return (
    <ul
      onClick={handleClose ? handleClose : null}
      className={`${customClass} ${isOpen ? "active" : ""}`}
    >
      {isLoggedIn ? <LoggedUI hoTen={hoTen} /> : <UnLoggedUI />}
      <li className="nav-item hideOnDesk">
        <Link className="nav-link" to="/#lichchieu" replace={isHashLink}>
          Lịch Chiếu
        </Link>
      </li>
      <li className="nav-item hideOnDesk">
        <Link className="nav-link" to="/#theaterList" replace={isHashLink}>
          Cụm Rạp
        </Link>
      </li>
      <li className="nav-item hideOnDesk">
        <Link className="nav-link" to="/#tintuc" replace={isHashLink}>
          Tin Tức
        </Link>
      </li>
      <li className="nav-item hideOnDesk">
        <Link className="nav-link" to="/#ungdung" replace={isHashLink}>
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
