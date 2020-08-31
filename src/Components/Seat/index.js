import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { actDanhSachVe } from "./modules/action";
const arrayName = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];
function Seat(props) {
  const history = useHistory();

  const { danhSachGhe, index, isLoggedIn, updateMySeats } = props;
  const letter = arrayName[index];

  const renderCode = (idx) =>
    `${letter}${idx + 1 >= 10 ? idx + 1 : `0${idx + 1}`}`; // A01, J16,...

  //Tao 1 obj state co key = name cua input, value la obj chua 2 key maGhe, giaVe

  /** 2. */
  // const createState = () => {
  //   if (danhSachGhe && danhSachGhe.length > 0) {
  //     let array = danhSachGhe.reduce((acc, item, idx) => {
  //       let hoho = {
  //         [renderCode(idx)]: { maGhe: null, giaVe: null, codeGhe: "" },
  //       };

  //       return [...acc, hoho];
  //     }, []);
  //     return [{ ...array }];
  //   }
  // };
  /**1. */
  // const createState = () => {
  //   if (danhSachGhe && danhSachGhe.length > 0) {
  //     return danhSachGhe.reduce((acc, item, idx) => {
  //       return [
  //         ...acc,
  //         {
  //           [renderCode(idx)]: { maGhe: null, giaVe: null, codeGhe: "" },
  //         },
  //       ];
  //     }, []);
  //   }
  // };
  /** 4. return { A01:{}, A02:{},... }*/

  const createState = () => {
    if (danhSachGhe && danhSachGhe.length > 0) {
      return danhSachGhe.reduce((acc, item, idx) => {
        return {
          ...acc,
          [renderCode(idx)]: { maGhe: null, giaVe: null, codeGhe: "" },
        };
      }, []);
    }
  };
  // console.log(createState());
  const [state, setState] = useState(() => createState());
  // console.log(state);

  const handleChange = (e, item) => {
    e.persist();
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập trước");
      history.push("/login");
    }

    const { name, checked } = e.target;
    // console.log(dataset.render); dataset.giaVe maVe = value;

    // console.log(checked);
    // state[e.target.name] = e.target.checked;
    if (checked) {
      setState(
        state,
        (state[name].maGhe = item.maGhe),
        (state[name].giaVe = item.giaVe),
        (state[name].codeGhe = name)
      );
    } else {
      setState(state, (state[name].maGhe = null), (state[name].giaVe = null));
    }
    // console.log(Object.values(state));
    // console.log(state);

    let listGhe = Object.values(state).filter((item) => {
      return item.maGhe != null;
    });
    // console.log(...haha);
    //gửi haha lên store
    // console.log(listGhe);
    // props.handleChonGhe(listGhe);
    updateMySeats(listGhe);
  };

  // useEffect(() => {
  //   let haha = Object.values(state).filter((item) => {
  //     return item.maGhe != null;
  //   });
  //   // console.log(haha);
  //   props.handleChonGhe(haha);
  // }, []);

  const renderDanhSachGhe = () => {
    if (danhSachGhe && danhSachGhe.length > 0) {
      return danhSachGhe.map((item, idx) => {
        // let soGhe= item.tenGhe;
        // console.log(item.giaVe);

        return (
          <span
            className="seat-clickable"
            data-id={`${letter}${item.tenGhe}`}
            key={item.maGhe}
          >
            <input
              type="checkbox"
              id={`${letter}${item.tenGhe}`}
              value={`${item.maGhe}`}
              name={renderCode(idx)}
              disabled={item.daDat}
              onChange={(e) => handleChange(e, item)}
              // data-render={renderCode(idx)}
            />
            <label
              htmlFor={`${letter}${item.tenGhe}`}
              className={item.loaiGhe}
              // onclick="showClickedSeat('A01')"
            >
              <span className="seatnum">{renderCode(idx)}</span>
            </label>
          </span>
        );
      });
    }
  };
  /**TODO : Redirect pages*/
  // if (!isLoggedIn) {
  //   // alert("Bạn cần đăng nhập trước");
  //   return <Redirect to="/login" />;
  // }
  return (
    <>
      <span className="rowname seat-unclickable">{letter}</span>
      {renderDanhSachGhe()}
      {/* <span className="seat-unclickable hideOnMobile" /> */}
    </>
  );
}

Seat.propTypes = {
  index: PropTypes.number,
  danhSachGhe: PropTypes.array,
  handleChonGhe: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatusReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMySeats: (list) => {
      dispatch(actDanhSachVe(list));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Seat);
