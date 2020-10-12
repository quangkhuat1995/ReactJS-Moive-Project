import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { prefixHttp } from "../../../utils/movies";
import Title from "../Title";
import { AddShowtimeContext } from ".";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "left",
    margin: 0,
    width: "100%",
  },
  headCell: {
    background: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "600",
    maxWidth: "120px",
  },
}));
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const INITIAL_STATE = {
  tenRap: [],
  giaVe: [],
  maLichChieu: [], //[ [''], ['', ''] ] //length = số lượng heThong, mỗi phần tử có length = so cum rap trong he thống đó
  heThongIndex: 0, // index của hệ thống dc chọn
  cumRapIndex: 0, // index của cụm rạp trong hệ thống đó
};
function ShowtimeTable() {
  const classes = useStyles();
  const detailMovieReducer = useSelector((state) => state.detailMovieReducer);
  const { detailMovie, loading } = detailMovieReducer;

  const { state: context } = useContext(AddShowtimeContext);
  const { maPhim } = context; //để run effect khi chọn film khác

  //state toggle table hiển thị chi tiết ha thu gọn
  const [isFullMode, setIsFullMode] = useState(false);

  //state logic hiển thị ở chế độ thu gọn
  const [state, setState] = useState(INITIAL_STATE);
  // console.log(state);

  const conditionLength = useMemo(() => {
    return detailMovie?.heThongRapChieu?.length;
  }, [maPhim, loading]);

  useEffect(() => {
    //Khi loading tức là chọn lại phim mới, thì reset lại state như ban đầu
    if (loading) {
      setState({ ...INITIAL_STATE });
    }
    //chưa chọn phim thì dùng state ban đầu đã khai báo bên ngoài. loading xong thì dựa theo data trả về mà tạo mảng(như chú thích ở dưới)
    if (maPhim && !loading) {
      /**
       *  Khi thay đổi maPhim, tạo mảng mới với độ dài (số lượng hệ thống rạp, mỗi item trong đó là mảng có độ dài bằng số cụm rạp tương úng) tương ứng, có các giá trị ban đầu là ''
       * */

      if (conditionLength) {
        // let mangHeThongInit = detailMovie?.heThongRapChieu?.map((heThong) => {
        //   return heThong.cumRapChieu.map((cumRap) => "");
        // });
        // console.log(mangHeThongInit);
        setState({
          ...state,
          maLichChieu: detailMovie?.heThongRapChieu?.map((heThong) => {
            return heThong.cumRapChieu.map((cumRap) => "");
          }),
          giaVe: detailMovie?.heThongRapChieu?.map((heThong) => {
            return heThong.cumRapChieu.map((cumRap) => "");
          }),
          tenRap: detailMovie?.heThongRapChieu?.map((heThong) => {
            return heThong.cumRapChieu.map((cumRap) => "");
          }),
        });
      }
    }

    // console.log("effect", state);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maPhim, loading, conditionLength]);
  // console.log(state);

  const handleChange = (e, lichChieuPhim = [], heThongIndex, cumRapIndex) => {
    e.persist();
    const { name, value } = e.target; //name là maCumRap

    const selectedLichChieu = lichChieuPhim.find(
      (lichChieu) =>
        new Date(lichChieu.ngayChieuGioChieu).toLocaleString("en-GB") === value
    );

    let newMaLichChieu = [...state.maLichChieu];
    let newGiaVe = [...state.giaVe];
    let newTenRap = [...state.tenRap];
    //chỉ update vị trí select tương ứng
    newMaLichChieu[heThongIndex][cumRapIndex] = selectedLichChieu.maLichChieu;
    newGiaVe[heThongIndex][cumRapIndex] = selectedLichChieu.giaVe;
    newTenRap[heThongIndex][cumRapIndex] = selectedLichChieu.tenRap;

    // console.log("newMaLichChieu", newMaLichChieu);
    // console.log("newGiaVe", newGiaVe);
    // console.log("newTenRap", newTenRap);

    setState({
      ...state,
      heThongIndex,
      cumRapIndex,
      maLichChieu: [...newMaLichChieu],
      giaVe: [...newGiaVe],
      tenRap: [...newTenRap],

      [name]: value, // key để ko thay đổi tất cả các selectbox
    });
    // renderAfterChange(lichChieuPhim, name, idx, arrCumRap);
  };

  const renderSelectBoxLichChieu = (
    lichChieuPhim = [],
    maCumRap,
    heThongIndex,
    cumRapIndex
  ) => {
    if (!lichChieuPhim.length) {
      return "Chưa có lịch chiếu";
    } else {
      return (
        <FormControl required fullWidth variant="outlined">
          <InputLabel htmlFor={maCumRap}>Xem lịch chiếu</InputLabel>
          <Select
            native
            defaultValue={state[maCumRap] || ""} //giá trị ban đâu
            onChange={(e) =>
              handleChange(e, lichChieuPhim, heThongIndex, cumRapIndex)
            }
            name={maCumRap}
            label="Xem lịch chiếu"
          >
            <option aria-label="None" value="" />
            {lichChieuPhim.map((lichChieu) => (
              <option
                key={lichChieu.maLichChieu}
                value={new Date(lichChieu.ngayChieuGioChieu).toLocaleString(
                  "en-GB"
                )}
              >
                {new Date(lichChieu.ngayChieuGioChieu).toLocaleString("en-GB")}
              </option>
            ))}
          </Select>
        </FormControl>
      );
    }
  };

  const renderBody = () => {
    return detailMovie?.heThongRapChieu?.length === 0 ? (
      <TableRow>
        <TableCell>
          <Title className={classes.title}>
            Phim này chưa có thông tin lịch chiếu
          </Title>
        </TableCell>
      </TableRow>
    ) : (
      detailMovie?.heThongRapChieu?.map((heThong, idx) =>
        heThong.cumRapChieu.map((cumRap, index) => {
          return (
            <StyledTableRow key={cumRap.maCumRap}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {/*  */}
                {state.maLichChieu.length && !loading
                  ? state.maLichChieu[idx][index]
                  : ""}
              </TableCell>
              <TableCell>
                <img
                  src={prefixHttp(heThong.logo)}
                  alt={heThong.maHeThong}
                  width="50px"
                />
              </TableCell>
              <TableCell>{cumRap.tenCumRap}</TableCell>
              <TableCell>
                {renderSelectBoxLichChieu(
                  cumRap.lichChieuPhim,
                  cumRap.maCumRap,
                  idx, // index của hệ thống
                  index // index của cụm rạp trong hệ thống đó
                )}
              </TableCell>
              <TableCell>
                {state.maLichChieu.length && !loading
                  ? state.tenRap[idx][index]
                  : ""}
              </TableCell>
              <TableCell>
                {state.maLichChieu.length && !loading
                  ? state.giaVe[idx][index]
                  : ""}
              </TableCell>
            </StyledTableRow>
          );
        })
      )
    );
  };

  const renderFullmode = () => {
    return detailMovie?.heThongRapChieu?.length === 0 ? (
      <TableRow>
        <TableCell>
          <Title className={classes.title}>
            Phim này chưa có thông tin lịch chiếu
          </Title>
        </TableCell>
      </TableRow>
    ) : (
      detailMovie?.heThongRapChieu?.map((heThong) =>
        heThong.cumRapChieu.map((cumRap) => {
          return cumRap.lichChieuPhim.map((lichChieu, j) => {
            return (
              <StyledTableRow key={lichChieu.maLichChieu}>
                <TableCell>{j + 1}</TableCell>
                <TableCell>{lichChieu.maLichChieu}</TableCell>
                <TableCell>
                  <img
                    src={prefixHttp(heThong.logo)}
                    alt={heThong.maHeThong}
                    width="50px"
                  />
                </TableCell>
                <TableCell>{cumRap.tenCumRap}</TableCell>
                <TableCell>
                  {new Date(lichChieu.ngayChieuGioChieu).toLocaleString(
                    "en-GB"
                  )}
                </TableCell>
                <TableCell>{lichChieu.tenRap}</TableCell>
                <TableCell>{lichChieu.giaVe}</TableCell>
              </StyledTableRow>
            );
          });
        })
      )
    );
  };

  //main return
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={!isFullMode}
            onChange={() => setIsFullMode((mode) => !mode)}
            color="primary"
          />
        }
        disabled={!maPhim || loading} //đang load hoặc chưa có mã phim
        label={"Chế độ thu gọn"}
        labelPlacement="start"
      />
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <StyledTableRow>
            <TableCell className={classes.headCell}>STT</TableCell>
            <TableCell className={classes.headCell}>Mã lịch chiếu</TableCell>
            <TableCell className={classes.headCell}>Hệ thống rạp</TableCell>
            <TableCell className={classes.headCell}>Cụm rạp</TableCell>
            <TableCell className={classes.headCell}>Ngày giờ chiếu</TableCell>
            <TableCell className={classes.headCell}>Rạp</TableCell>
            <TableCell className={classes.headCell}>Giá vé</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {!maPhim ? (
            <TableRow>
              <TableCell>
                <Title className={classes.title}>
                  Chọn phim để xem thông tin
                </Title>
              </TableCell>
            </TableRow>
          ) : loading ? (
            <TableRow>
              <TableCell>
                <Title className={classes.title}>Đang tải dữ liệu...</Title>
              </TableCell>
            </TableRow>
          ) : (
            <>{isFullMode ? renderFullmode() : renderBody()}</>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default ShowtimeTable;
