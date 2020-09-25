import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actLogout } from "../../containers/HOME/LoginPage/modules/action";
import Swal from "sweetalert2";
function LoggedUI(props) {
  // const user = localStorage.getItem(USER_KEY);
  const { actLogout, hoTen } = props;

  const handleLogOut = (e) => {
    e.persist();
    Swal.fire({
      title: "Bạn có chắc muốn đăng xuất?",
      //text: 'You will not be able to recover this imaginary file!',
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Đã đăng xuất", "Cám ơn bạn đã sử dụng Tix.", "success");
        actLogout();
      } else {
        e.preventDefault();
      }
    });
  };

  return (
    <>
      <li className="nav-item nav-item--login">
        <span className="nav-link">
          Xin chào <span>{hoTen}</span>
        </span>
      </li>
      <li className="nav-item nav-item--register">
        <Link className="nav-link" to="/" onClick={handleLogOut}>
          Đăng xuất
        </Link>
      </li>
    </>
  );
}

LoggedUI.propTypes = {
  actLogout: PropTypes.func.isRequired,
  hoTen: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actLogout: () => {
      dispatch(actLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(LoggedUI));
