import React, { useMemo, useRef } from "react";
import { connect } from "react-redux";
import useMedia from "../../Hook/useMedia";
import { actSelectDay } from "../../containers/HOME/DetailPage/modules/action";
import { TODAY, END_DAY, MOBILE_MEDIA } from "./../../constants/config";

const generateDaysArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const displayDayOfWeek = (dateString) => {
  let dayOfWweek = dateString.getDay();
  switch (dayOfWweek) {
    case 0:
      return ["Chủ nhật", "CN"];
    case 1:
      return ["Thứ 2", "T2"];
    case 2:
      return ["Thứ 3", "T3"];
    case 3:
      return ["Thứ 4", "T4"];
    case 4:
      return ["Thứ 5", "T5"];
    case 5:
      return ["Thứ 6", "T6"];
    case 6:
      return ["Thứ 7", "T7"];
    default:
      break;
  }
};

const ListOfDay = (props) => {
  const isMobile = useMedia(MOBILE_MEDIA);
  const ulRef = useRef(null);
  const dayList = useMemo(
    () => generateDaysArray(new Date(TODAY), new Date(END_DAY)),
    []
  );

  const handleSelectDay = (e, dateString) => {
    const day = dateString.toLocaleDateString("it-IT");
    props.selectDay(day);

    Array.from(ulRef.current.childNodes).forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  return (
    <ul ref={ulRef} className="detail__listOfDay">
      {dayList.map((day, idx) => (
        <li
          key={day.toLocaleDateString()}
          className={`detail__listOfDay--item ${idx === 0 ? "active" : ""}`}
          onClick={(e) => handleSelectDay(e, day)}
        >
          <p className="dayOfWeek">
            {isMobile ? displayDayOfWeek(day)[1] : displayDayOfWeek(day)[0]}
          </p>
          <p className="date">{`${day.getDate()}`.padStart(2, "0")}</p>
        </li>
      ))}
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectDay: (selectDay) => {
      dispatch(actSelectDay(selectDay));
    },
  };
};
export default connect(null, mapDispatchToProps)(ListOfDay);
