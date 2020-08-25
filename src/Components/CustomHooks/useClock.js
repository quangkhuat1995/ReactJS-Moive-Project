import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import useClock from "../CustomHooks/useClock";

function TimeWaiting(props) {
  const STARTING_MINUTE = 5;
  const [myTime, setMyTime] = useState(STARTING_MINUTE);
  useEffect(() => {
    let totalTime = myTime * 60;
    const timeEl = document.getElementById("timewaiting");
    function updateCountdown() {
      let minutes = Math.floor(totalTime / 60);
      let seconds = totalTime % 60;

      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;

      timeEl.innerHTML = `${minutes}:${seconds}`;
      totalTime--;
      totalTime = totalTime < 0 ? 0 : totalTime;
      // if (totalTime === "0") {
      //   return <Redirect to="/" />;
      // }
    }
    const countDownTimer = setInterval(updateCountdown, 1000);

    return () => {
      console.log("");

      clearInterval(countDownTimer);
    };
  }, []);
  // const { timeString } = useClock();
  return (
    <div className="top__right">
      <p>thời gian giữ ghế</p>
      <p id="timewaiting"></p>
    </div>
  );
}

export default TimeWaiting;
