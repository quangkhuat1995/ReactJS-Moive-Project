import { Container, Grid, Paper } from "@material-ui/core";
import React from "react";
import PageTitle from "../PageTitle";
import MoviesTable from "./MoviesTable";
import useAdminStyles from "../../../style/useAdminStyle";
import useTitle from "../../../Hook/useTitle";

export default function ManageMovies() {
  // console.log(props);
  useTitle("Quản lý phim", "admin");
  const classes = useAdminStyles();
  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <PageTitle title="Manage Movies" button="Lastest Data" />
        <Grid container spacing={3}>
          {/* page title here */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <MoviesTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
