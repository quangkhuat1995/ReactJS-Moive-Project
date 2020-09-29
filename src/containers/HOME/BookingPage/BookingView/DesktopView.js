import React, { memo } from "react";
import BookingTheater from "../../../../Components/BookingTheater";

import NoteSeat from "../../../../Components/NoteSeat";
import PaySection from "../../../../Components/PaySection";
import SeatRow from "../../../../Components/SeatRow";
import TimeWaiting from "../../../../Components/TimeWaiting";

function DesktopView() {
  return (
    <>
      <section className="main-wrapper row">
        {/* BOOKING SEAT */}
        <main className=" seat__section col-12 col-md-9">
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
        {/* PAY SECTION */}
        <aside id="pay-section" className="col-12 col-md-3">
          <PaySection />
        </aside>
      </section>
    </>
  );
}

export default memo(DesktopView);
