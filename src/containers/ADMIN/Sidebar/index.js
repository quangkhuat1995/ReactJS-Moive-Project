import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TableIcon from "@material-ui/icons/BorderAll";
import UIElementsIcon from "@material-ui/icons/FilterNone";
import TypographyIcon from "@material-ui/icons/FormatSize";
import FAQIcon from "@material-ui/icons/HelpOutline";
import HomeIcon from "@material-ui/icons/Home";
import LibraryIcon from "@material-ui/icons/LibraryBooks";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SupportIcon from "@material-ui/icons/QuestionAnswer";

import clsx from "clsx";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import Title from "../Title";
import useAdminStyles from "../../../style/useAdminStyle";
import { USER_KEY } from "../../../constants/config";

const structure = [
  { id: 0, label: "Movie Management", link: "/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "User Management",
    link: "/user-management",
    icon: <TableIcon />,
  },
  {
    id: 2,
    label: "Add Showtime",
    link: "/showtime-management",
    icon: <TypographyIcon />,
  },
  {
    id: 3,
    label: "Notifications",
    link: "",
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: "UI Elements",
    link: "",
    icon: <UIElementsIcon />,
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "PROJECTS" },
  {
    id: 12,
    label: "My recent",
    link: "",
    icon: <MenuIcon />,
  },
  {
    id: 13,
    label: "Starred",
    link: "",
    icon: <MenuIcon />,
  },
  {
    id: 14,
    label: "Background",
    link: "",
    icon: <MenuIcon />,
  },
];
const getAdminInfo = () => {
  const admin = localStorage.getItem(USER_KEY);
  if (admin) {
    return JSON.parse(admin).taiKhoan;
  }
  return "ADMIN";
};

function SideBar(props) {
  const classes = useAdminStyles();

  const [open, setOpen] = useState(true);
  // console.log(props);
  // const { classes } = props;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            // className={(clsx(classes.title), open && classes.titleHidden)}
            className={classes.title}
          >
            Good morning {getAdminInfo()}
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Title className={classes.toolbarTitle}>DASHBOARD</Title>
          <IconButton onClick={() => setOpen(false)}>
            <ArrowBackIcon />
          </IconButton>
        </div>

        <List>
          {structure.map((link) => (
            <SidebarLink key={link.id} location={props.location} {...link} />
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default withRouter(SideBar);
