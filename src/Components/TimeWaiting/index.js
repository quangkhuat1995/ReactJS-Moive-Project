import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Countdown, { zeroPad } from "react-countdown";

function TimeWaiting() {
  const [isInTimeBooking, setIsInTimeBooking] = useState(true);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // setTimeout(() => {
      //   // return <Redirect to="/" />;
      //   alert("qua thoi gian");
      //   setIsInTimeBooking(false);
      // }, 1000);

      // return <Redirect to="/" />;

      return <p id="timewaiting">00:00</p>;
    } else {
      // Render a countdown
      return (
        <p id="timewaiting">
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </p>
      );
    }
  };
  // if (isInTimeBooking === false) {
  //   return <Redirect to="/" />;
  // }
  return (
    <div className="top__right">
      <p>thời gian giữ ghế</p>
      <Countdown
        date={Date.now() + 10000} // 5 * 60 * 1000 = 5p
        renderer={renderer}
        autoStart={true}
      />
      {/* <p id="timewaiting">00:00:00</p> */}
    </div>
  );
}

export default TimeWaiting;
