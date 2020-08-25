import React from "react";
import Theater from "./Theater";
import TheaterPanel from "./TheaterPanel";

const img = "/images/theater.jpg";

function SingleShowTimeDetail(props) {
  return (
    <section className="detail">
      <div className="myContainer detail-wrapper">
        {/* LIST OF DAY */}
        <ul className="detail__listOfDay">
          <li className="detail__listOfDay--item active">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
          <li className="detail__listOfDay--item">
            <p>Ngày</p>
            <p className="date">27</p>
          </li>
        </ul>
        {/* THEATER */}
        <Theater /> {/* data-target="#maHTRap"*/}
        {/* SHOW LIST */}
        <div className="detail__showList tab-content">
          {/* <ShowList movie={movie} /> */}
          <TheaterPanel />
          {/* Hethong 1 class="tab-pane active" id=maHTRap*/}
          {/* HeThong 2 */}
        </div>
      </div>
    </section>
  );
}

export default SingleShowTimeDetail;
