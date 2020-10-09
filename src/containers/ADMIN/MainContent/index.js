import React from "react";

import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import PageTitle from "../PageTitle";
import useAdminStyles from "../../../style/useAdminStyle";

export default function MainContent(props) {
  const classes = useAdminStyles();
  const { title, children } = props;
  return (
    <Container maxWidth="lg" className={classes.container}>
      {/* <PageTitle title="Manage Showtime" /> */}
      {title && <PageTitle title={title} />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <Paper className={classes.paper}> */}
          {children}
          {/* <ShowtimeTable /> */}
          {/* </Paper> */}
        </Grid>
      </Grid>
    </Container>
  );
}

MainContent.propTypes = {
  title: PropTypes.string.isRequired,
};
