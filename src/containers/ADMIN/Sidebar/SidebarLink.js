import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import useAdminStyles from "../../../style/useAdminStyle";

function SidebarLink(props) {
  const classes = useAdminStyles();
  const { link, icon, label, location, type } = props;

  const isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  if (type === "title") {
    return <ListSubheader inset>{label}</ListSubheader>;
  }
  if (type === "divider") return <Divider />;

  return (
    <ListItem
      button
      component={link && Link}
      to={link}
      className={clsx(isLinkActive && classes.activeNavLink)}
    >
      <ListItemIcon className={clsx(isLinkActive && classes.activeNavLink)}>
        {icon}
      </ListItemIcon>
      <ListItemText
        className={clsx(isLinkActive && classes.activeNavLink)}
        primary={label}
      />
    </ListItem>
  );
}

export default SidebarLink;
