import React, { memo } from "react";
import PropTypes from "prop-types";

const getUniqueDays = (list = []) => {
  let allDays = list.map((item) => {
    return new Date(item.ngayChieuGioChieu).toLocaleDateString("it-IT"); // dd//mm//yyyy
  });
  return [...new Set(allDays)];
};

const renderListOption = (name, list = []) => {
  // if (!list || list.length === 0) {
  //   return <option disabled selected>{` Đang lấy dữ liệu ${label}`}</option>;
  // }

  switch (name) {
    case "movieSelect":
      return (
        list &&
        list.length > 0 &&
        list.map((item) => (
          <option value={item.tenPhim} key={item.maPhim} id={item.maPhim}>
            {item.tenPhim}
          </option>
        ))
      );

    case "cinemaSelect":
      return (
        list &&
        list.length > 0 &&
        list.map((item) => (
          <option value={item.tenCumRap} key={item.maCumRap}>
            {item.tenCumRap}
          </option>
        ))
      );

    case "daySelect":
      const uniqueDays = getUniqueDays(list);
      return (
        list &&
        list.length > 0 &&
        uniqueDays.map((day, index) => (
          /**
           * Nếu dùng key={day} nhưng sẽ gây ra bug: nếu chọn lại Rạp  mà có danh sách ngày chiếu trùng với day cũ thì key sẽ không thay đổi => không re-render => value daySelect ở state reset nhưng UI không reset
           */
          <option value={day} key={list[index].maLichChieu}>
            {day}
          </option>
        ))
      );

    case "timeSelect":
      return (
        list &&
        list.length > 0 &&
        list.map((item) => {
          const time = new Date(item.ngayChieuGioChieu).toLocaleTimeString(
            "it-IT"
          );
          return (
            <option value={time} key={item.maLichChieu}>
              {time}
            </option>
          );
        })
      );

    default:
      break;
  }
};

//export
const SelectItem = (props) => {
  const { name, list, label, handleChange } = props;

  return (
    <div className={`search__group ${name}`}>
      <select
        name={name}
        onChange={handleChange}
        defaultValue={name}
        disabled={list.length > 0 ? false : true} // disabled trong khi đợi api
      >
        <option value={name} key="-1" hidden>
          {list.length > 0 ? label : `Đang tìm ${label}...`}
        </option>

        {renderListOption(name, list)}
      </select>
    </div>
  );
};

SelectItem.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default memo(SelectItem);
