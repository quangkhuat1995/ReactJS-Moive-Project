import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import TabPanel from "../TabPanel";
import Theater from "./Theater";
import TheaterContent from "./TheaterContent";
import useMedia from "../../Hook/useMedia";
import TheaterPanel from "./TheaterPanel";
import ListOfDay from "./ListOfDay";
const img = "/images/theater.jpg";

function SingleShowTimeDetail(props) {
  const { listHeThongRap } = props;
  const isDesktop = useMedia("(min-width:768px)");

  return (
    <section className="detail">
      <div className="myContainer detail-wrapper">
        {/* LIST OF DAY */}

        <ListOfDay />
        {/* THEATER */}
        <div className="nav detail__theater" role="tablist">
          <Theater />
        </div>

        {/* SHOW LIST only show in desktop view*/}
        {isDesktop && (
          <div className="detail__showList tab-content">
            {/* <TheaterPanel /> */}

            {listHeThongRap &&
              listHeThongRap.length > 0 &&
              listHeThongRap.map((item, index) => {
                return (
                  <TheaterPanel
                    key={item.maHeThongRap}
                    heThongRap={item}
                    index={index}
                  />
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}
const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
  };
};
export default connect(mapStateToProps, null)(SingleShowTimeDetail);
