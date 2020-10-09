import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { AddShowtimeContext } from ".";
import { connect } from "react-redux";
// import MySelect from "../Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import theatersApi from "../../../api/theatersApi";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

import bookingApi from "../../../api/bookingApi";
import Swal from "sweetalert2";

import { actFetchDetailMovie } from "../../HOME/DetailPage/modules/action";
import Title from "../Title";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import { prefixHttp, renderTenCumRap } from "./../../../utils/movies";
const getUniqueSet = (arr = [], key) => {
  let newA = arr.map((item) => item[key]);
  return [...new Set(newA)];
};
// import 'da'
// import {AddShowtimeContext} from "./index"
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  adjust: {
    marginTop: theme.spacing(1),
  },
  title: {
    textAlign: "center",
    margin: 0,
    padding: theme.spacing(1),
    width: "100%",
  },
  headCell: {
    background: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "600",
    padding: "6px 16px 6px 16px",
    width: "30%",
    maxWidth: "120px",
  },
  logoImg: {
    width: "calc(100% / 6)",
    display: "inline-block",
    padding: "0 3px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));
const giaVeArr = [
  {
    value: 75000,
    label: "75k",
  },
  {
    value: 100000,
    label: "100k",
  },
  {
    value: 120000,
    label: "120k",
  },
  {
    value: 150000,
    label: "150k",
  },
];
function SearchShowtime(props) {
  const classes = useStyles();
  const {
    listMovie,
    listHeThongRap,
    fetchDetailMovie,
    detailMovie,
    loadingDetailMovie,
  } = props;

  const { state, dispatch } = useContext(AddShowtimeContext);

  const {
    maHeThongRap,
    maPhim,
    maCumRap,
    maRap,
    ngayChieuGioChieu,
    giaVe,
    canSubmit,
  } = state;

  // console.log("state", state);

  //Khi chọn mã hệ thống rạp thì gọi api lấy danh sách cụm rạp tương ứng
  //để render dnah sách cụm rạp theo hệ thống rạp đã chọn
  const [listCumRap, setListCumRap] = useState([]);
  // để render select chọn rạp
  const [listRap, setListRap] = useState([]);

  //gọi aoi lấy thông tin chi tiết phim khi chọn maPhim (res sẽ lưu trên store)
  useEffect(() => {
    let didCancel = false;
    if (maPhim !== "" && !didCancel) {
      fetchDetailMovie(maPhim);
      setDsCumRapDangChieu([]);
    }
    return () => {
      didCancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maPhim]);

  //gọi api cập nhật Cụm rạp theo maHeThongRap chọn
  useEffect(() => {
    let didCancel = false;
    if (maHeThongRap) {
      theatersApi
        .getListCumRapTheoHeThong(maHeThongRap)
        .then((res) => {
          if (!didCancel) {
            //trc đó đã chọn hệ thống rạp rồi thì reset maRap, listRap, maCumRap đã chọn
            if (listCumRap.length > 0) {
              setListRap([]);
              dispatch({ type: "CHOOSE_AGAIN" });
            }

            setListCumRap(res);
          }
        })
        .catch((err) => {
          if (!didCancel) {
            console.log(err);
          }
        });
    }
    return () => {
      didCancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maHeThongRap]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //khi chọn cụm rạp mới set Data cho chọn Rạp
    if (name === "maCumRap") {
      let prevValue = maCumRap;
      //tức là thao tác chọn lại cụm rạp, thì reset maRap và listRap (và maCumRap luôn, sẽ set lại value mới ở dispatch bên dưới)
      if (prevValue.length !== 0 && value !== prevValue) {
        setListRap([]);
        dispatch({ type: "CHOOSE_AGAIN" });
      }

      let selectCumRap = listCumRap.find((item) => {
        return item.maCumRap === value;
      });
      //chọn được cụm rạm thì gán danh sách Rạp vào
      if (selectCumRap) {
        setListRap(selectCumRap.danhSachRap);
      } else {
        setListRap([]);
      }
    }

    dispatch({ type: "CHOOSE_FIELD", field: name, data: value });

    dispatch({ type: "CHECK_ALLOW" });
  };

  const [selectedDate, setSelectedDate] = useState("2020-10-01T00:00:00");
  const handleDateChange = (name, date, value) => {
    if (date instanceof Date && !isNaN(date)) {
      setSelectedDate(date);
      dispatch({ type: "CHOOSE_FIELD", field: name, data: value });
      dispatch({ type: "CHECK_ALLOW" });
    } else {
      setSelectedDate(date);
      dispatch({ type: "NOT_ALLOW" });
    }
    // console.log(new Date(value));
  };

  const handleCreateShowTime = () => {
    if (!maPhim || !maRap || !ngayChieuGioChieu) {
      alert("bạn phải nhập đủ thông tin lịch chiếu cần tạp");
      return;
    }

    const data = {
      maPhim: parseInt(maPhim),
      maRap: parseInt(maRap),
      //thêm giây
      ngayChieuGioChieu: `${ngayChieuGioChieu}:00`,
      giaVe,
    };

    bookingApi
      .postTaoLichChieu(data)
      .then((res) => {
        Swal.fire("", res, "success");
        //clear hết chỉ giữ lại field maPhim
        dispatch({ type: "CLEAR_FORM" });
        setDsCumRapDangChieu([]);
        // gọi lại Api
        fetchDetailMovie(maPhim);
      })
      .catch((err) => {
        Swal.fire("Lỗi", "Lỗi khi cập nhật dữ liệu", "error");
      });
  };

  const [dsCumRapDangChieu, setDsCumRapDangChieu] = useState([]);
  const handleClickImg = (e, arr) => {
    const { name } = e.target; // maHeThongRap

    const selectedHeThongRap = arr.find(
      (heThong) => heThong.maHeThongRap === name
    );
    if (selectedHeThongRap) {
      setDsCumRapDangChieu(selectedHeThongRap.cumRapChieu);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* SECTION LEFT */}
      <Grid item md={7} sm={12} container spacing={2}>
        {/* COL 1 (maPhim, maHeThongRap, maCumRap) */}
        <Grid item xs={12} sm={6}>
          {/* Chọn phim */}
          <FormControl
            className={classes.formControl}
            required
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor={"chonPhim"}>Chọn phim</InputLabel>
            <Select
              native
              value={maPhim}
              onChange={handleChange}
              label="Chọn phim"
              inputProps={{
                name: `maPhim`,
                id: `chonPhim`,
              }}
            >
              <option aria-label="None" value="" />
              {listMovie.map((item) => (
                <option key={item.maPhim} value={item.maPhim}>
                  {item.tenPhim}
                </option>
              ))}
            </Select>
          </FormControl>
          {/* <MySelect/> */}
          {/* Chọn hẹ thống rạp */}
          <FormControl
            className={classes.formControl}
            required
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor={"chonHeThongRap"}>
              Chọn hệ thống rạp
            </InputLabel>
            <Select
              native
              value={maHeThongRap}
              onChange={handleChange}
              label="Chọn hệ thống rạp"
              inputProps={{
                name: `maHeThongRap`,
                id: `chonHeThongRap`,
              }}
            >
              <option aria-label="None" value="" />
              {listHeThongRap.map((item) => (
                <option key={item.maHeThongRap} value={item.maHeThongRap}>
                  {item.maHeThongRap}
                </option>
              ))}
            </Select>
          </FormControl>
          {/* Chọn cụm rạp */}
          <FormControl
            className={classes.formControl}
            required
            fullWidth
            variant="outlined"
            disabled={listCumRap.length === 0}
          >
            <InputLabel htmlFor={"chonCumRap"}>Chọn cụm rạp</InputLabel>
            <Select
              native
              value={maCumRap}
              onChange={handleChange}
              label="Chọn cụm rạp"
              inputProps={{
                name: `maCumRap`,
                id: `chonCumRap`,
              }}
            >
              <option aria-label="None" value="" />
              {listCumRap &&
                listCumRap.length > 0 &&
                listCumRap.map((item) => (
                  <option key={item.maCumRap} value={item.maCumRap}>
                    {item.tenCumRap}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {/* COL 2 (maRap, ngayChieuGioChieu, giaVe) */}
        <Grid item xs={12} sm={6}>
          {/* Chọn rạp (sau khi chọn cụm rạp mới có data list Rạp nên trước đó phải disable) */}
          <FormControl
            className={classes.formControl}
            required
            fullWidth
            variant="outlined"
            disabled={listRap.length === 0}
          >
            <InputLabel htmlFor={"chonRap"}>Chọn rạp</InputLabel>
            <Select
              native
              value={maRap}
              onChange={handleChange}
              label="Chọn rạp"
              inputProps={{
                name: `maRap`,
                id: `chonRap`,
              }}
            >
              <option aria-label="None" value="" />
              {listRap &&
                listRap.length > 0 &&
                listRap.map((item) => (
                  <option key={item.maRap} value={item.maRap}>
                    {item.tenRap}
                  </option>
                ))}
            </Select>
          </FormControl>

          {/* ngày và giờ */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              fullWidth
              className={classes.formControl}
              required
              inputVariant="outlined"
              ampm={false}
              label="Chọn ngày giờ chiếu"
              value={selectedDate}
              name="ngayChieuGioChieu"
              onChange={handleDateChange.bind(this, "ngayChieuGioChieu")}
              invalidDateMessage='Hãy chọn định dạng "dd/mm/yyyy hh:mm"'
              format="dd/MM/yyyy HH:mm"
              minutesStep={5}
            />
          </MuiPickersUtilsProvider>

          {/* Chọn giá vé */}
          <FormControl
            className={classes.formControl}
            required
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor={"chonGiaVe"}>
              Chọn giá vé (VIP = 6/5)
            </InputLabel>
            <Select
              native
              value={giaVe}
              onChange={handleChange}
              label="Chọn giá vé (VIP = 6/5)"
              inputProps={{
                name: `giaVe`,
                id: `chonGiaVe`,
              }}
            >
              {giaVeArr.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* BUTTON */}
        <Grid item xs={12}>
          {/* Submit */}
          <Button
            variant="contained"
            color="primary"
            className={classes.formControl}
            // endIcon={<Icon>send</Icon>}
            fullWidth
            disabled={!canSubmit}
            onClick={handleCreateShowTime}
          >
            Tạo lịch chiếu
          </Button>
        </Grid>
      </Grid>
      {/* END SECTION LEFT */}

      {/* SECTION RIGHT */}
      <Hidden smDown>
        <Grid item md container spacing={2}>
          {maPhim === "" ? (
            <Title className={classes.title}>Chọn phim để xem thống kê!</Title>
          ) : loadingDetailMovie ? (
            <Title className={classes.title}>Đang tải dữ liệu...</Title>
          ) : (
            <>
              <Grid item xs={12}>
                <Table className={classes.adjust} size="small">
                  <caption>
                    Đây là thống kê chung, chi tiết xem ở bảng dưới.
                  </caption>
                  <TableBody>
                    {/* Hệ thống rạp đang chiếu */}
                    <TableRow>
                      <TableCell
                        className={classes.headCell}
                        component="th"
                        variant="head"
                      >
                        HT rạp
                      </TableCell>
                      <TableCell>
                        {detailMovie?.heThongRapChieu?.map(
                          (heThong, idx, arr) => {
                            return (
                              <img
                                key={heThong.maHeThongRap}
                                className={classes.logoImg}
                                src={prefixHttp(heThong.logo)}
                                alt={heThong.maHeThongRap}
                                name={heThong.maHeThongRap}
                                onClick={(e) => handleClickImg(e, arr)}
                              />
                            );
                          }
                        )}
                      </TableCell>
                    </TableRow>
                    {/* Cụm rạp đang chiếu */}
                    <TableRow>
                      <TableCell
                        className={classes.headCell}
                        component="th"
                        variant="head"
                      >
                        Cụm rạp
                      </TableCell>
                      <TableCell>
                        {dsCumRapDangChieu.length === 0
                          ? "Bấm vào hình trên để hiển thị cụm rạp đang chiếu tương ứng"
                          : dsCumRapDangChieu.map((cumRap, idx) => {
                              const [preName, longName] = renderTenCumRap(
                                cumRap
                              );
                              return (
                                <div key={cumRap.maCumRap}>
                                  {/* <span>{idx + 1}. </span> */}
                                  <span className={preName}>
                                    {idx + 1}. {preName}
                                  </span>{" "}
                                  -{longName}
                                </div>
                              );
                            })}
                      </TableCell>
                    </TableRow>
                    {/* Lịch chiếu */}
                    <TableRow>
                      <TableCell
                        className={classes.headCell}
                        component="th"
                        variant="head"
                      >
                        Lịch chiếu
                      </TableCell>
                      <TableCell>
                        {dsCumRapDangChieu.length === 0
                          ? "Bấm vào hình trên để hiển thị các lịch chiếu tương ứng với cụm rạp"
                          : dsCumRapDangChieu.map((cumRap, idx) => {
                              return (
                                <div key={cumRap.maCumRap}>
                                  <span>
                                    {idx + 1}. {cumRap.lichChieuPhim.length}{" "}
                                    lịch chiếu phim ở -{" "}
                                    {getUniqueSet(
                                      cumRap.lichChieuPhim,
                                      "tenRap"
                                    ).join(", ")}
                                  </span>
                                </div>
                              );
                            })}
                      </TableCell>
                    </TableRow>
                    {/* Ngày chiếu */}
                    <TableRow>
                      <TableCell
                        className={classes.headCell}
                        component="th"
                        variant="head"
                      >
                        Ngày chiếu
                      </TableCell>
                      <TableCell>
                        {dsCumRapDangChieu.length === 0
                          ? "Các ngày chiếu"
                          : dsCumRapDangChieu.map((cumRap, idx) => {
                              // const mangNgayGioChieu = getUniqueSet(cumRap.lichChieuPhim,'ngayChieuGioChieu');
                              const styleMangNgayGio = cumRap.lichChieuPhim.map(
                                (item) => ({
                                  ...item,
                                  ngayChieuGioChieu: new Date(
                                    item.ngayChieuGioChieu
                                  ).toLocaleDateString("it-IT"),
                                })
                              );
                              return (
                                <div key={cumRap.maCumRap}>
                                  <span>
                                    {idx + 1}.{" "}
                                    {getUniqueSet(
                                      styleMangNgayGio,
                                      "ngayChieuGioChieu"
                                    ).join(", ")}
                                  </span>
                                </div>
                              );
                            })}
                      </TableCell>
                    </TableRow>
                    {/* Giờ chiếu */}
                    <TableRow>
                      <TableCell
                        className={classes.headCell}
                        component="th"
                        variant="head"
                      >
                        Giờ chiếu
                      </TableCell>
                      <TableCell>
                        {dsCumRapDangChieu.length === 0
                          ? "Các giờ chiếu"
                          : dsCumRapDangChieu.map((cumRap, idx) => {
                              // const mangNgayGioChieu = getUniqueSet(cumRap.lichChieuPhim,'ngayChieuGioChieu');
                              const styleMangNgayGio = cumRap.lichChieuPhim.map(
                                (item) => ({
                                  ...item,
                                  ngayChieuGioChieu: new Date(
                                    item.ngayChieuGioChieu
                                  ).toLocaleTimeString("it-IT"),
                                })
                              );
                              return (
                                <div key={cumRap.maCumRap}>
                                  <span>
                                    {idx + 1}.{" "}
                                    {getUniqueSet(
                                      styleMangNgayGio,
                                      "ngayChieuGioChieu"
                                    ).join(", ")}
                                  </span>
                                </div>
                              );
                            })}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </>
          )}
        </Grid>
      </Hidden>
      {/* END SECTION RIGHT */}
    </Grid>
  );
}

SearchShowtime.propTypes = {
  listMovie: PropTypes.array.isRequired,
  listHeThongRap: PropTypes.array.isRequired,
  detailMovie: PropTypes.object,
  loadingDetailMovie: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.listMovie,
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
    detailMovie: state.detailMovieReducer.detailMovie,
    loadingDetailMovie: state.detailMovieReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetCumRapTheoHeThong: (maHTR) => {
      // dispatch()
    },
    fetchDetailMovie: (maPhim) => {
      dispatch(actFetchDetailMovie(maPhim));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchShowtime);
