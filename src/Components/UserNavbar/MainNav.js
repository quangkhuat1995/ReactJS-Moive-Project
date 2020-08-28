import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoggedUI from "./LoggedUI";
import UnLoggedUI from "./UnLoggedUI";
import { connect } from "react-redux";
import { actSetLogStatus } from "./modules/action";
// import avatar from "./../../images/avatar.png";

function MainNav(props) {
  const { customClass, isOpen, handleClose } = props; //nhận từ cha
  const { setCurrentLogStatus, isLoggedIn } = props; //store
  console.log(props);

  useEffect(() => {
    if (localStorage.getItem("userUser")) {
      setCurrentLogStatus(true);
    } else {
      setCurrentLogStatus(false);
    }
  }, [isLoggedIn]);

  const handleLogOut = useCallback(
    (e) => {
      if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem("userUser");
        setCurrentLogStatus(false);
        setTimeout(() => alert("Đã đăng xuất thành công"), 1000);
      } else {
        // không đồng ý đăng xuất sẽ ngăn cản việc nhảy về trang home
        e.preventDefault();
      }
    },
    [isLoggedIn]
  );

  return (
    <ul
      onClick={handleClose ? handleClose : null}
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
MainNav.propTypes = {
  isOpen: PropTypes.bool,
  customClass: PropTypes.string,
  handleClose: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatusReducer.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentLogStatus: (status) => {
      dispatch(actSetLogStatus(status));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
