import React, { memo, useState } from "react";
import { Redirect } from "react-router-dom";
import Countdown, { zeroPad } from "react-countdown";
import { TIME_BOOKING } from "../../constants/config";

function TimeWaiting() {
  const [isInTimeBooking, setIsInTimeBooking] = useState(true);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setTimeout(() => {
        // return <Redirect to="/" />;
        alert("qua thoi gian");
        setIsInTimeBooking(false);
      }, 1000);

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
  if (!isInTimeBooking) {
    return <Redirect to="/" />;
  }
  return (
    <div className="top__right">
      <p>thời gian giữ ghế</p>
      <Countdown
        date={Date.now() + TIME_BOOKING} // set 10000 = 10s để test.
        renderer={renderer}
        autoStart={true}
      />
      {/* <p id="timewaiting">00:00:00</p> */}
    </div>
  );
}

export default memo(TimeWaiting);
