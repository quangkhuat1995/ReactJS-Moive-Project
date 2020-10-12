import React, { memo, useContext, useEffect, useState } from "react";

import BookingTheater from "../../../../Components/BookingTheater";

import NoteSeat from "../../../../Components/NoteSeat";
import PaySection from "../../../../Components/PaySection";
import SeatRow from "../../../../Components/SeatRow";
import TimeWaiting from "../../../../Components/TimeWaiting";
import { BookingPageContext } from "../testIndex";
import { TIME_BOOKING } from "../../../../constants/config";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

// const TIME_BOOKING = 900000000000;
function MobileView() {
  const { state } = useContext(BookingPageContext);
  const { step } = state;

  const history = useHistory();

  const [timeOver, setTimeOver] = useState(false);
  //coundown
  useEffect(() => {
    let timeoutID;
    (() => {
      // const STARTING_MINUTE = 5;
      // let totalTime = STARTING_MINUTE * 60;
      let totalTime = TIME_BOOKING / 1000;

      function updateCountdown() {
        totalTime--;
        if (totalTime === 0) {
          setTimeOver(true);
        }
      }
      timeoutID = setInterval(updateCountdown, 1000);
    })();
    return () => {
      clearInterval(timeoutID);
    };
  }, []);

  if (timeOver) {
    Swal.fire({
      title: "Hết giờ",
      text: "bạn có muốn đặt vé lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
    }).then((res) => {
      if (res.value) {
        window.location.reload();
      } else {
        history.push("/");
      }
    });
  }

  // switch (step) {
  //   case 1:
  //     return (
  //       <main className=" seat__section col-12 col-md-9">
  //         <div className="header--space" />

  //         <div className="seat__section--top">
  //           <BookingTheater />

  //           <TimeWaiting />
  //         </div>
  //         <div className="seat__section--map">
  //           <div className="screen">
  //             <img src="/images/screen.png" alt="screen" />
  //           </div>
  //           {/*  */}
  //           <div className="listseat">
  //             <SeatRow />
  //           </div>

  //           {/*  */}
  //           <div className="noteseat">
  //             <NoteSeat type="normal" info="Ghế thường" />
  //             <NoteSeat type="vip" info="Ghế VIP" />
  //             <NoteSeat type="current" info="Ghế đang chọn" />
  //             <NoteSeat type="taken" info="Ghế đã có người chọn" />
  //           </div>
  //         </div>
  //       </main>
  //     );

  //   case 2:
  //     return (
  //       <aside id="pay-section" className="col-12 col-md-3">
  //         <PaySection />
  //       </aside>
  //     );
  //   default:
  //     return null;
  // }
  return (
    <>
      <div className="row">
        <main
          className=" seat__section col-12 col-md-9"
          style={{ display: `${step === 1 ? "block" : "none"}` }}
        >
          <div className="header--space" />

          <div className="seat__section--top">
            <BookingTheater />

            <TimeWaiting />
          </div>
          <div className="seat__section--map">
            <div className="screen">
              <img src="/images/screen.png" alt="screen" />
            </div>
            {/*  */}
            <div className="listseat">
              <SeatRow />
            </div>

            {/*  */}
            <div className="noteseat">
              <NoteSeat type="normal" info="Ghế thường" />
              <NoteSeat type="vip" info="Ghế VIP" />
              <NoteSeat type="current" info="Ghế đang chọn" />
              <NoteSeat type="taken" info="Ghế đã có người chọn" />
            </div>
          </div>
        </main>

        <aside
          id="pay-section"
          className="col-12 col-md-3"
          style={{ display: `${step === 2 ? "block" : "none"}` }}
        >
          <PaySection />
        </aside>
      </div>
    </>
  );
}

export default memo(MobileView);
