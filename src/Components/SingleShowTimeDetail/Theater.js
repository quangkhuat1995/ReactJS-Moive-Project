import React from "react";
import { connect } from "react-redux";

function Theater(props) {
  const { listHeThongRap } = props;
  /**TODO */
  // const checkWindowWidth = window.outerWidth >="768";
  // if(checkWindowWidth){
  //   //render desktop ele render moblie
  // }
  const renderTheaterInfo = () => {
    if (listHeThongRap && listHeThongRap.length > 0) {
      return listHeThongRap.map((item, index) => {
        return (
          <div
            key={item.maHeThongRap}
            className={`deatail__theater--single ${
              index === 0 ? "active" : ""
            }`}
            data-toggle="tab"
            data-target={`#${item.maHeThongRap}`}
            role="tab"
          >
            <div className="detail__theater--item">
              <img
                className="theater__image"
                src={item.logo}
                alt={item.tenHeThongRap}
              />
              <span className="tenCumRap">{item.tenHeThongRap}</span>
              <span className="arrow" />
            </div>
            {/* <div>so luong phim tung cum rap</div> */}
          </div>
        );
      });
    }
  };
  return (
    // phai co class "nav" moi toggle class active dc
    <div className="nav detail__theater" role="tablist">
      {renderTheaterInfo()}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};
//TODO 1 hàm mapDispatch để sort lại state
export default connect(mapStateToProps, null)(Theater);
