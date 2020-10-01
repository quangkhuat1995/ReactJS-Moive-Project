import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FAKE_IMG } from "../../constants/config";
import Swal from "sweetalert2";
import { useHistory, useLocation } from "react-router-dom";
const avatar = "/images/avatar.png";

function DiscussSection(props) {
  const history = useHistory();
  const location = useLocation();
  const { isLoggedIn } = props;
  const handleClick = (e) => {
    e.persist();
    if (!isLoggedIn) {
      Swal.fire({
        title: "Bạn cần đăng nhập trước",
        text:
          "Hãy đăng nhập và cho mọi người biết ý kiến của bạn về bộ phim này!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập!",
        cancelButtonText: "Hủy",
      }).then((res) => {
        if (res.value) {
          history.push("/login", { from: location });
        } else {
          e.preventDefault();
        }
      });
    } else {
      return;
    }
  };
  return (
    <section className="discuss myContainer">
      <div
        className="discuss__click p-3 mb-3"
        data-toggle="modal"
        data-target="#movieTrailer"
      >
        <div className="row discuss__click--container">
          <div className="col-1 text-center">
            <img
              className="avatar-img"
              src={isLoggedIn ? FAKE_IMG : avatar}
              alt="avatar"
            />
          </div>
          <div className="col-7 pl-1">
            <p className="thinking">Bạn nghĩ gì về phim này?</p>
          </div>
          <div className="col-4 text-right">
            <i className="fa fa-star icon-star" />
            <i className="fa fa-star icon-star" />
            <i className="fa fa-star icon-star" />
            <i className="fa fa-star icon-star" />
            <i className="fa fa-star icon-star" />
          </div>
        </div>
      </div>
    </section>
  );
}

DiscussSection.propTypes = {};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userLoginReducer.isLoggedIn,
  };
};
export default connect(mapStateToProps, null)(DiscussSection);
