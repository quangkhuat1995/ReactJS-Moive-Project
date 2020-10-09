import Paper from "@material-ui/core/Paper";
import React from "react";
import useTitle from "../../../Hook/useTitle";
import useAdminStyles from "../../../style/useAdminStyle";
import MainContent from "../MainContent";
import AccountTable from "./AccountTable";

export default function Accounts() {
  useTitle("Quản lý người dùng", "admin");
  const classes = useAdminStyles();
  return (
    <MainContent title="Manage Accounts">
      <Paper className={classes.paper}>
        <AccountTable />
      </Paper>
    </MainContent>
  );
}
