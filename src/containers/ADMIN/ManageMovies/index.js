import Paper from "@material-ui/core/Paper";
import React from "react";
import useTitle from "../../../Hook/useTitle";
import useAdminStyles from "../../../style/useAdminStyle";
import MainContent from "../MainContent";
import MoviesTable from "./MoviesTable";

export default function ManageMovies() {
  // console.log(props);
  useTitle("Quản lý phim", "admin");
  const classes = useAdminStyles();
  return (
    <MainContent title="Manage Movies">
      <Paper className={classes.paper}>
        <MoviesTable />
      </Paper>
    </MainContent>
  );
}
