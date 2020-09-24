import React from "react";
import { Link as NavigateLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { actFetchSignUp } from "./modules/action";
import useSetBackground from "./../../../Hook/useSetBackground";
import ErrorUI from "../../../Components/ErrorUI";
import Copyright from "../../../Components/Copyright";
import validateForm from "../../../Hook/validateForm";
import useFormValidation from "../../../Hook/useFormValidation";
import useUserStyles from "../../../style/useUserStyle";
import useTitle from "../../../Hook/useTitle";

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
  // maNhom: "GP09", //gửi vào khi submit
  // maLoaiNguoiDung: "KhachHang",
};

function SignUp(props) {
  const { fetchSignUp, loadingSignUp, errorSignUp } = props; // lay tu store redux
  // console.log(props.history);

  const classes = useUserStyles();
  useSetBackground();
  useTitle("Đăng Ký");

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values, // init = INIT_SIGNUP_STATE
    errors, // init = INIT_LOGIN_STATE
    isNotValid, //init = true
  } = useFormValidation(INIT_SIGNUP_STATE, validateForm, fetchSignUp, props);

  // console.log("errors", errors);
  // console.log("values", values);
  // console.log("isNotValid", isNotValid);

  const configBeforeSubmit = (e, values) => {
    e.preventDefault();
    const { ho, ten, taiKhoan, matKhau, email, soDt } = values;

    const user = {
      hoTen: `${ho} ${ten}`,
      taiKhoan,
      matKhau,
      soDt,
      email,
      maNhom: "GP09",
      maLoaiNguoiDung: "KhachHang",
    };

    handleSubmit(e, user);
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
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => configBeforeSubmit(e, values)}
        >
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
                error={errors.ho ? true : false}
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
          {errorSignUp && <ErrorUI message={errorSignUp.response?.data} />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isNotValid || loadingSignUp} //{loading}
          >
            Đăng ký
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {/* <Link href="#" variant="body2"> */}
              <NavigateLink to="/login">
                {"Đã có tài khoản tại Tix? Đăng nhập ngay"}
              </NavigateLink>
              {/* </Link> */}
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
    loadingSignUp: state.userSignUpReducer.loading,
    errorSignUp: state.userSignUpReducer.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignUp: (user, history) => {
      dispatch(actFetchSignUp(user, history));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default WithForm(SignUp);
