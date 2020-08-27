import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
// import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
// import useStyles from "../style";
import { withStyles } from "@material-ui/core/styles";
import useSetBackground from "../Hook/useSetBackground";
import useStyles from "../style";

const logo = "/images/logo.png";

// const classes = useStyles();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Tix.vn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// console.log(classes);

const WithForm = (WrappedComponent) => {
  // useSetBackground();
  return (props) => {
    // const { classes } = props;
    console.log(props);

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar>
            <img src={logo} alt="user thumbnails" />
          </Avatar>

          {/* wrapped item */}
          <WrappedComponent {...props} />
          {/* wrapped */}
        </div>
        <Box mt={3}>
          <Copyright />
        </Box>
      </Container>
    );
  };
};

export default WithForm;
