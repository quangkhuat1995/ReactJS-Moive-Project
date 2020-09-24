import React, { useState } from "react";
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

import { connect } from "react-redux";
import { actFetchSignUp } from "./modules/action";
import useSetBackground from "./../../../Hook/useSetBackground";
import ErrorUI from "../../../Components/ErrorUI";
import Copyright from "../../../Components/Copyright";
import useUserStyles from "../../../style/useUserStyle";
import validateForm from "../../../Hook/validateForm";
import useFormValidation from "../../../Hook/useFormValidation";

const logo = "/images/logo.png";
const INIT_SIGNUP_STATE = {
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
};
function SignUp(props) {
  const { fetchSignUp, loading, errorSignUp } = props; // lay tu store redux
  // console.log(props.history);

  const classes = useUserStyles();
  useSetBackground();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values, // init = INIT_SIGNUP_STATE
    errors, // init = {}
    isNotValid, //init = true
  } = useFormValidation(INIT_SIGNUP_STATE, validateForm, fetchSignUp, props);

  const validEmpty = () => {
    //moi phan tu deu khac ""
    return Object.values(state).every((item) => item !== "");
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.wrapper}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={logo} alt="user thumbnails" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.ho ? true : false}
                autoComplete="ho"
                name="ho"
                variant="outlined"
                required
                fullWidth
                id="ho"
                label="Họ"
                autoFocus
                defaultValue={values.ho}
                helperText={errors.ho}
                onChange={handleChange}
                onBlur={handleBlur}
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
                defaultValue={values.ten}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.ten ? true : false}
                helperText={errors.ten}
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
                defaultValue={values.taiKhoan}
                onChange={handleChange}
                error={errors.taiKhoan ? true : false}
                helperText={errors.taiKhoan}
                onBlur={handleBlur}
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
                defaultValue={values.matKhau}
                onChange={handleChange}
                error={errors.matKhau ? true : false}
                helperText={errors.matKhau}
                onBlur={handleBlur}
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
                defaultValue={values.matKhau2}
                onChange={handleChange}
                error={errors.matKhau2 ? true : false}
                helperText={errors.matKhau2}
                onBlur={handleBlur}
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
                defaultValue={values.email}
                onChange={handleChange}
                error={errors.email ? true : false}
                helperText={errors.email}
                onBlur={handleBlur}
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
                defaultValue={values.soDt}
                onChange={handleChange}
                error={errors.soDt ? true : false}
                helperText={errors.soDt}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Nhận các thông báo và ưu đãi mới nhất"
              />
            </Grid>
          </Grid>
          {errorSignUp && <ErrorUI message={errorSignUp.response.data} />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isNotValid} //{loading}
          >
            Đăng ký
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                {"Đã có tài khoản tại Tix? Đăng nhập ngay"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.userSignUpReducer.loading,
    errorSignUp: state.userSignUpReducer.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignUp: (user) => {
      dispatch(actFetchSignUp(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default WithForm(SignUp);
