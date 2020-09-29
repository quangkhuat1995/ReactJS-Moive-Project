import React, { memo } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { TIME_BOOKING } from "../../constants/config";

// const TIME_BOOKING = 900000000;
function TimeWaiting() {
  const history = useHistory();

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // setIsInTimeBooking(false);

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
  const handleCompleted = () => {
    // setTimeNowIndex(timeNowIndex + 1);
    // setTimeNow(Date.now() + TIME_BOOKING);
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
  };

  return (
    <div className="top__right">
      <p>thời gian giữ ghế</p>
      <Countdown
        date={Date.now() + TIME_BOOKING} // set 10000 = 10s để test.
        renderer={renderer}
        autoStart={true}
        onComplete={handleCompleted}
      />
      {/* <p id="timewaiting">00:00:00</p> */}
    </div>
  );
}

export default memo(TimeWaiting);
