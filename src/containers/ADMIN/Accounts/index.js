import React from "react";
import AccountTable from "./AccountTable";
import { Container, Grid, Paper } from "@material-ui/core";
import PageTitle from "../PageTitle";
import useAdminStyles from "../../../style/useAdminStyle";

export default function Accounts() {
  const classes = useAdminStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <PageTitle title="Manage Accounts" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AccountTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
