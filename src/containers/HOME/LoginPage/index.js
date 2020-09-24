import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { actFetchUserLogin } from "./modules/action";
//Components
import ErrorUI from "../../../Components/ErrorUI";
//Material UI
import useUserStyles from "../../../style/useUserStyle";
//Custom Hooks
import useSetBackground from "../../../Hook/useSetBackground";
import useFormValidation from "../../../Hook/useFormValidation";
import validateForm from "../../../Hook/validateForm";
import Copyright from "../../../Components/Copyright";

const INIT_LOGIN_STATE = {
  taiKhoan: "",
  matKhau: "",
};

function LogInPage(props) {
  const { errorLogin, fetchUserLogin } = props;
  const classes = useUserStyles();
  useSetBackground();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values, // init = INIT_LOGIN_STATE
    errors, // init = {}
    isNotValid, //init = true
  } = useFormValidation(INIT_LOGIN_STATE, validateForm, fetchUserLogin, props);
  console.log("errors", errors);
  console.log("values", values);
  console.log("isNotValid", isNotValid);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   props.fetchUserLogin(state, props.history);
  //  đã được xử lý trong useFormValidation
  // };

  return (
    <Container component="main" maxWidth="xs" className={classes.wrapper}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
          <img src="/images/logo.png" alt="logo" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={errors.taiKhoan ? true : false} //ko có lỗi->false
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="taiKhoan"
            label="Tài Khoản"
            name="taiKhoan"
            // autoComplete=
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.taiKhoan}
            helperText={errors.taiKhoan}
          />
          <TextField
            // error={isError}
            error={errors.matKhau ? true : false} //không có lỗi->false
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="matKhau"
            label="Mật Khẩu"
            type="password"
            id="matKhau"
            // autoComplete="current-password"
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.matKhau}
            helperText={errors.matKhau}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ghi nhớ đăng nhập"
          />
          {errorLogin && <ErrorUI message={errorLogin.response.data} />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // disabled khi co errors và sau khi click
            disabled={isNotValid} // || loading tu api
            // disabled
          >
            Đăng nhập
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Chưa có tài khoản? Đăng ký ngay"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    errorLogin: state.userLoginReducer.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserLogin: (user, history) => {
      dispatch(actFetchUserLogin(user, history));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
