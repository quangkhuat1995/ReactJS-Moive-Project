import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
// import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import useStyles from "../../../style";
import { connect } from "react-redux";
import { actFetchSignUp } from "./modules/action";
import WithForm from "../../../HOC/withForm";
import useSetBackground from "../../../Hook/useSetBackground";

function SignUp(props) {
  const { fetchSighUp, loading, error } = props; // lay tu store redux
  // console.log(props.history);
  const classes = useStyles();
  useSetBackground();
  /*
  const [state, setState] = useState({
    signUp: {
      ho: "",
      ten: "",
      // hoTen: state.ho + state.ten,
      taiKhoan: "",
      matKhau: "",
      matKhau2: "",
      email: "",
      soDt: "",
      maNhom: "GP09",
      maLoaiNguoiDung: "KhachHang",
    },
    logIn: {
      taiKhoan: "",
      matKhau: "",
    },
  });
  */

  const [state, setState] = useState({
    ho: "",
    ten: "",
    // hoTen: state.ho + state.ten,
    taiKhoan: "",
    matKhau: "",
    matKhau2: "",
    email: "",
    soDt: "",
    maNhom: "GP09",
    maLoaiNguoiDung: "KhachHang",
  });
  // console.log(state);

  const validEmpty = () => {
    //moi phan tu deu khac ""
    return Object.values(state).every((item) => item !== "");
  };

  const handleChange = (e) => {
    setState(state, (state[e.target.name] = e.target.value));
    // console.log();
    // console.log(state);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      ho,
      ten,
      taiKhoan,
      matKhau,
      // matKhau2,
      email,
      soDt,
      maNhom,
      maLoaiNguoiDung,
    } = state;
    const user = {
      hoTen: `${ho} ${ten}`,
      taiKhoan,
      matKhau,
      // matKhau2,
      email,
      soDt,
      maNhom,
      maLoaiNguoiDung,
    };
    console.log(user);

    fetchSighUp(user, props.history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const renderError = () => {
    if (error && error.response) {
      return <div className="alert alert-danger">{error.response.data}</div>;
    }
    return null;
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="ho"
              name="ho"
              variant="outlined"
              required
              fullWidth
              id="ho"
              label="Họ"
              autoFocus
              defaultValue={state.ho}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="ten"
              label="Tên"
              name="ten"
              autoComplete="ten"
              defaultValue={state.ten}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="taiKhoan"
              label="Tài khoản"
              name="taiKhoan"
              autoComplete="taiKhoan"
              defaultValue={state.taiKhoan}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="matKhau"
              label="Mật khẩu"
              type="password"
              id="matKhau"
              autoComplete="current-password"
              defaultValue={state.matKhau}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              // error={renderWarn(this)[0]}
              required
              fullWidth
              name="matKhau2"
              label="Xác nhận mật khẩu"
              type="password"
              id="matKhau2"
              autoComplete="current-password"
              defaultValue={state.matKhau2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              defaultValue={state.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="soDt"
              label="Số Điện Thoại"
              name="soDt"
              autoComplete="soDt"
              defaultValue={state.soDt}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Nhận các thông báo và ưu đãi mới nhất"
            />
          </Grid>
        </Grid>
        {error && renderError()}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Đã có tài khoản tại Tix? Đăng nhập ngay
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.userSignUpReducer.loading,
    error: state.userSignUpReducer.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSighUp: (user) => {
      dispatch(actFetchSignUp(user));
    },
  };
};
// export default connect(mapStateToProps, mapDispatchToProps)(WithForm(SignUp));
export default WithForm(SignUp);
