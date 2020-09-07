import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SelectItem from "./SelectItem";
import LinkButton from "../LinkButton";
import { connect } from "react-redux";
import { actFetchDetailMovie } from "../../containers/HOME/DetailPage/modules/action";
import UnSelectUI from "./UnSelectUI";
const getAllListCumRap = (heThongRapChieu = []) => {
  if (heThongRapChieu && heThongRapChieu.length > 0) {
    return heThongRapChieu.reduce(
      (acc, item) => acc.concat(item.cumRapChieu),
      []
    );
  }

  return [];
};

const getCumRapDuocChon = (listCumRapChieu = [], tenCumRap) => {
  if (listCumRapChieu && listCumRapChieu.length > 0) {
    return listCumRapChieu.find((cumRap, index) => {
      return cumRap.tenCumRap === tenCumRap;
    }); // {...} chỉ có 1 item duy nhất
  }
};

const getMaLichChieuTheoGioChieu = (times = [], gioChieu) => {
  let lichChieu = times.find((time) => {
    return (
      new Date(time.ngayChieuGioChieu).toLocaleTimeString("it-IT") === gioChieu
    );
  });
  return lichChieu.maLichChieu;
};

const getDanhSachGioChieuTheoNgay = (cumRapDuocChon, ngayChieu) => {
  let danhSachGioChieu = cumRapDuocChon.lichChieuPhim.filter((time) => {
    return (
      new Date(time.ngayChieuGioChieu).toLocaleDateString("it-IT") === ngayChieu
    );
  });
  // return danhSachGioChieu.map((item) => {
  //   return new Date(item.ngayChieuGioChieu).toLocaleTimeString("it-IT", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // });
  return danhSachGioChieu;
};

function Search(props) {
  const { listMovie, heThongRapChieu, getThongTinLichChieuPhim } = props;
  const [state, setState] = useState({
    // state thay đổi khi handleChange
    movieSelect: "", //Ted part 2
    cinemaSelect: "", // CGV- SƯ vạn hạnh
    daySelect: "", // 1/1/2019
    timeSelect: "", //

    //state truyền vào as props
    listCumRapChieu: [], //luôn reset lại theo phim đã chọn []<object>
    cumRapDuocChon: {},
    times: [], //chứa ds thông tin lịch chiếu theo ngày đã chọn []<obj>

    //state kiểm tra
    isDone: false,

    //call API
    maLichChieu: null,
  });

  useEffect(() => {
    console.log("efect run");

    setState({
      ...state,
      listCumRapChieu: getAllListCumRap(heThongRapChieu),
    });
  }, [heThongRapChieu]);

  const handleChange = (e) => {
    e.persist();

    //value có thể là tenPhim, tenCumRap, 1/1/2019, 10:10,
    const { name, value, selectedIndex } = e.target;
    const { id } = e.target.childNodes[selectedIndex];

    switch (name) {
      case "movieSelect":
        getThongTinLichChieuPhim(id);
        setState({
          ...state,
          [name]: value,
          //reset lại các giá trị select của các ô dưới nó trong trường hợp user chọn lại
          cinemaSelect: "",
          daySelect: "",
          timeSelect: "",

          cumRapDuocChon: {},
          times: [],

          maLichChieu: "",
        });

        break;

      case "cinemaSelect":
        setState({
          ...state,
          [name]: value,
          cumRapDuocChon: {},
          cumRapDuocChon: getCumRapDuocChon(state.listCumRapChieu, value),
          //reset
          daySelect: "",
          timeSelect: "",
          times: [],
          maLichChieu: "",
        });
        break;

      case "daySelect":
        setState({
          ...state,
          [name]: value,
          times: [],
          times: getDanhSachGioChieuTheoNgay(state.cumRapDuocChon, value),
          //reset
          timeSelect: "",
          maLichChieu: "",
        });
        break;

      case "timeSelect":
        setState({
          ...state,
          [name]: value,
          // maLichChieu: "",
          // maLichChieu: getMaLichChieuTheoGioChieu(state.times, value),
        });
        break;

      default:
        break;
    }

    setState((prevState) => {
      if (prevState.timeSelect.length > 0) {
        let maLichChieu = getMaLichChieuTheoGioChieu(
          prevState.times,
          prevState.timeSelect
        );

        if (maLichChieu && maLichChieu.length > 0) {
          return {
            ...prevState,
            maLichChieu,
            isDone: true,
          };
        }
        return {
          ...prevState,
          maLichChieu: null,
          isDone: false,
        };
      }
      return { ...prevState };
    });
  };
  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setState({ ...state, movieSelect: movieSelectRef.current.value });
  };

  const {
    movieSelect,
    cinemaSelect,
    daySelect,
    timeSelect,

    listCumRapChieu,
    cumRapDuocChon,
    times,
    isDone,

    maLichChieu,
  } = state;

  return (
    <section className="search myContainer">
      <form className="search__form" onSubmit={handleSubmit}>
        <SelectItem
          label="Phim"
          name="movieSelect"
          list={listMovie}
          keyLoop="maPhim"
          handleChange={handleChange}
        />

        {/* RENDER CINEMASELECT GROUP */}
        {movieSelect.length > 0 ? (
          <SelectItem
            name="cinemaSelect"
            label="Rạp"
            list={listCumRapChieu}
            keyLoop="cinema"
            handleChange={handleChange}
          />
        ) : (
          <UnSelectUI
            name="cinemaSelect"
            label="Rạp"
            message="Vui lòng chọn phim"
          />
        )}

        {/* RENDER DAYSELECT GROUP */}
        {cinemaSelect.length > 0 ? (
          <SelectItem
            name="daySelect"
            label="Ngày chiếu"
            list={cumRapDuocChon.lichChieuPhim}
            handleChange={handleChange}
          />
        ) : (
          <UnSelectUI
            name="daySelect"
            label="Ngày chiếu"
            message="Vui lòng chọn rạp"
          />
        )}

        {/* RENDER TIMESELECT GROUP */}
        {daySelect.length > 0 ? (
          <SelectItem
            name="timeSelect"
            label="Giờ chiếu"
            list={times}
            handleChange={handleChange}
          />
        ) : (
          <UnSelectUI
            name="timeSelect"
            label="Giờ chiếu"
            message="Vui lòng chọn ngày chiếu"
          />
        )}

        <div className="search__group search__button">
          {/* <button className="btnBuyTicket">MUA VÉ NGAY</button> */}

          <LinkButton
            disabled={isDone}
            className="btnBuyTicket"
            to={`/booking/${maLichChieu}`}
          >
            MUA VÉ NGAY
          </LinkButton>
        </div>
      </form>
    </section>
  );
}

Search.propTypes = {
  listMovie: PropTypes.array.isRequired,
  heThongRapChieu: PropTypes.array,
  getThongTinLichChieuPhim: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
    heThongRapChieu: state.detailMovieReducer.detailMovie.heThongRapChieu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //gọi khi chọn tên phim
    getThongTinLichChieuPhim: (maPhim) => {
      dispatch(actFetchDetailMovie(maPhim));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
