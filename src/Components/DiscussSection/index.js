import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FAKE_IMG } from "../../constants/config";
const avatar = "/images/avatar.png";

function DiscussSection(props) {
  const { isLoggedIn } = props;
  return (
    <div class="review">
      <div
        class="review-click p-3 mb-3"
        data-toggle="modal"
        data-target="#evaluate"
      >
        <div class="row">
          <div class="col-md-1">
            <div class="avatar">
              <img
                class="avatar-img"
                src={!isLoggedIn ? avatar : FAKE_IMG}
                alt="avatar"
              />
            </div>
          </div>
          <div class="col-md-8 pl-1">
            <p class="thinking">Bạn nghĩ gì về phim này?</p>
          </div>
          <div class="col-md-3 text-right">
            <i class="fa fa-star icon-star"></i>
            <i class="fa fa-star icon-star"></i>
            <i class="fa fa-star icon-star"></i>
            <i class="fa fa-star icon-star"></i>
            <i class="fa fa-star icon-star"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

DiscussSection.propTypes = {};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userLoginReducer.isLoggedIn,
  };
};
export default connect(mapStateToProps, null)(DiscussSection);
