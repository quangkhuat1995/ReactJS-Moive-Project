import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import useMedia from "../../../../Hook/useMedia";
import {
  DESKTOP_MEDIA,
  FAKE_IMG,
  USER_KEY,
} from "../../../../constants/config";
import { Link } from "react-router-dom";
import { BookingPageContext } from "./../testIndex";
import { connect } from "react-redux";
import { actLogout } from "../../LoginPage/modules/action";
const renderList = (step) => {
  switch (step) {
    case 1:
      return (
        <li className="process__item current-process active">
          <span>01</span>Chọn Ghế
        </li>
      );
    case 2:
      return (
        <li className="process__item current-process active">
          <span>02</span>Thanh Toán
        </li>
      );
    case 3:
      return (
        <li className="process__item current-process active">
          <span>03</span>Kết quả đặt vé
        </li>
      );

    default:
      return;
  }
};
function BookingProgress(props) {
  const user = localStorage.getItem(USER_KEY);
  const hoTen = useMemo(() => JSON.parse(user).hoTen, [user]);
  const { actLogout } = props;
  const isDesktop = useMedia(DESKTOP_MEDIA);

  // console.log(step);
  const { state, dispatch } = useContext(BookingPageContext);
  const { step, isOpen } = state;

  const handleGoBack = () => {
    //nếu đang mở combo box thì nút quay lại sẽ thực hiện chức năng chuyển về giao diện thanh toán (step===2)
    if (isOpen) {
      dispatch({ type: "close-combo" });
    } else {
      //nếu ko mở combo box thì thực hiện chức năng lùi step bth
      dispatch({ type: "back" });
    }
  };

  return (
    <section id="process-section">
      <div id="btnAction">
        {!isDesktop ? (
          //mobile view & step ===1 => hiện logo
          step === 1 ? (
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          ) : (
            // mobileview but step=== 2,3 => hiện btn goback
            <div onClick={handleGoBack}>
              <img width="30px" src="/images/back-session.png" alt="go back" />
            </div>
          )
        ) : (
          //desktop view => luôn hiện logo
          <Link to="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
        )}
      </div>

      <ul className="process__list">
        {isDesktop ? (
          <>
            <li className="process__item current-process active">
              <span>01</span>
              {"Chọn Ghế & Thanh Toán"}
            </li>
            <li className="process__item">
              <span>02</span>
              {"Kết quả đặt vé"}
            </li>
          </>
        ) : (
          <>{renderList(step)}</>
        )}
      </ul>

      <div className="process__account">
        <img src={FAKE_IMG} alt="avatar" />
        <span className="hoTen">{hoTen}</span>
        <div className="process__account--logout" onClick={(e) => actLogout(e)}>
          Đăng xuất
        </div>
      </div>
    </section>
  );
}

BookingProgress.propTypes = {
  step: PropTypes.number.isRequired,
  actLogout: PropTypes.func.isRequired,
};

BookingProgress.defaultProps = {
  actLogout: () => {},
  step: 1,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actLogout: (e) => {
      dispatch(actLogout(e));
    },
  };
};
export default connect(null, mapDispatchToProps)(BookingProgress);
