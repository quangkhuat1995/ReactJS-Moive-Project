import React, { Fragment, useReducer } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import { USER_KEY } from "../../constants/config";
import { actPostReviews } from "../DiscussSection/modules/action";
import LinkButton from "../LinkButton";

const initialState = {
  point: 0,
  post: "",
  errorMessage: "",
  canSubmit: false,
};
const postReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.data,
      };

    case "FAILED":
      return {
        ...state,
        errorMessage: action.errorMessage,
        canSubmit: false,
      };

    case "SUCCESS":
      return {
        ...state,
        errorMessage: "",
        canSubmit: true,
      };

    case "POSTED":
      return { ...initialState };

    default:
      throw new Error("ko xác định dc action");
  }
};

const checkValid = (point, post) => {
  if (point === 0) {
    return "Bạn chưa chấm điểm kìa!";
  }
  if (post.length === 0) {
    return "Hãy viết gì đó để chia sẽ suy nghĩ của bạn!";
  }
  return "";
};

function ModalReview(props) {
  const { isLoggedIn, actPostReviews } = props;

  const [state, dispatch] = useReducer(postReducer, initialState);
  const { post, errorMessage, canSubmit, point } = state;

  const renderInput = () => {
    //tạo mảng 10 -> 1;
    const pointsArr = Array.from(Array(10), (item, i) => i + 1).reverse();
    return pointsArr.map((pts, idx) => {
      return (
        <Fragment key={idx}>
          <input
            type="radio"
            name="rating"
            id={`${pts}pts`}
            onChange={(e) =>
              dispatch({
                type: "CHANGE",
                field: "point",
                data: e.target.value,
              })
            }
            value={`${pts}`}
            // value={point}
          />
          <label htmlFor={`${pts}pts`} title={`${pts} điểm`} />
        </Fragment>
      );
    });
  };

  const handlePost = (point, post) => {
    let errorMessage = checkValid(point, post);
    if (errorMessage.length > 0) {
      dispatch({ type: "FAILED", errorMessage });
    } else {
      dispatch({ type: "SUCCESS" });
    }
    if (!canSubmit) return;

    const user = localStorage.getItem(USER_KEY);
    const hoTen = JSON.parse(user).hoTen;
    const postData = {
      username: hoTen,
      like: 0,
      comment: 0,
      createdAt: new Date(),
      point,
      post,
      isLike: false,
      // avatar: FAKE_IMG, để api tự cập nhật
    };

    //clear field
    dispatch({ type: "POSTED" });

    //update APi and UI
    actPostReviews(postData);

    //close modal
    document.getElementById("close").click();
  };

  return ReactDOM.createPortal(
    <div
      className="modal fade reviewModel"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
      id="reviewInput"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div className="rating">{renderInput()}</div>
            <h2 className="star-point"> {point} /10 điểm</h2>
          </div>
          <div className="modal-body">
            <textarea
              rows="2"
              className="input-comment"
              placeholder="Cho mọi người biết suy nghĩ của bạn về bộ phim..."
              disabled={!isLoggedIn}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE",
                  field: "post",
                  data: e.target.value,
                })
              }
              value={post}
            ></textarea>
            <div className="text-center">
              <span className="text-alert">
                {!isLoggedIn
                  ? "(*) Bạn phải đăng nhập để có thể bình luận"
                  : `${errorMessage}`}
              </span>
            </div>
            {!isLoggedIn ? (
              <LinkButton
                className="btn btn-sendreview w-100 mt-4"
                data-dismiss="modal"
                to="/login"
              >
                Đăn nhập
              </LinkButton>
            ) : (
              <>
                <button
                  className="btn btn-sendreview w-100 mt-4"
                  // data-dismiss="modal"
                  onClick={() => handlePost(point, post)}
                >
                  Đăng
                </button>
                <button
                  data-dismiss="modal"
                  id="close"
                  style={{ display: "none" }}
                ></button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-review")
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userLoginReducer.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actPostReviews: (newPost) => {
      dispatch(actPostReviews(newPost));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalReview);
