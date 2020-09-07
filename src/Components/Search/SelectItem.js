import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const getUniqueSet = (list = [], type) => {
  switch (type) {
    case "day":
      let allDays = list.map((day) => {
        return new Date(day.ngayChieuGioChieu).toLocaleDateString("it-IT");
      });
      return [...new Set(allDays)];

    case "time":
      return list.map((item) => {
        return new Date(item.ngayChieuGioChieu).toLocaleTimeString("it-IT");
      });

    default:
      break;
  }
};
const renderListOption = (name, list = [], label) => {
  // if (!list || list.length === 0) {
  //   return <option disabled selected>{` Đang lấy dữ liệu ${label}`}</option>;
  // }
  switch (name) {
    case "movieSelect":
      return (
        list &&
        list.length > 0 &&
        list.map((item, index) => (
          <option value={item.tenPhim} key={item.maPhim} id={item.maPhim}>
            {item.tenPhim}
          </option>
        ))
      );

    case "cinemaSelect":
      return (
        list &&
        list.length > 0 &&
        list.map((item, index) => (
          <option value={item.tenCumRap} key={item.maCumRap}>
            {item.tenCumRap}
          </option>
        ))
      );

    case "daySelect":
      const uniqueDays = getUniqueSet(list, "day");
      return (
        list &&
        list.length > 0 &&
        uniqueDays.map((day, index) => (
          <option value={day} key={day}>
            {day}
          </option>
        ))
      );

    case "timeSelect":
      const listTime = getUniqueSet(list, "time");
      return (
        list &&
        list.length > 0 &&
        listTime.map((time, index) => (
          <option value={time} key={time}>
            {time}
          </option>
        ))
      );

    default:
      break;
  }
};

//export
const SelectItem = (props) => {
  const { name, list, label } = props;
  const [state, setstate] = useState(null);

  return (
    <div className={`search__group ${name}`}>
      <select
        name={name}
        onChange={props.handleChange}
        defaultValue={label}
        disabled={list.length > 0 ? false : true}
      >
        <option value={label} disabled selected>
          {label}
        </option>

        {renderListOption(name, list, label)}
      </select>
    </div>
  );
};

SelectItem.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};

export default SelectItem;
