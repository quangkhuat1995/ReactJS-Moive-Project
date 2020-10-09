import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Copyright from "../Components/Copyright";
import { USER_KEY } from "../constants/config";
import Sidebar from "../containers/ADMIN/Sidebar";
//
//Must import last
import useAdminStyles from "../style/useAdminStyle";

function AdminLayout(props) {
  const classes = useAdminStyles();

  return (
    <div className={classes.root}>
      <Sidebar classes={classes} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}

        {/* <Container maxWidth="lg" className={classes.container}>
          {page title}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {props.children}
              </Paper>
            </Grid>
          </Grid>
        </Container> */}

        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsOfComponent) => {
        const user = localStorage.getItem(USER_KEY);
        if (user && JSON.parse(user).maLoaiNguoiDung === "QuanTri") {
          return (
            <AdminLayout>
              <Component {...propsOfComponent} />
            </AdminLayout>
          );
        } else {
          return <Redirect to="/auth" />;
        }
      }}
    />
  );
}

// // const classes = useAdminStyles();
// const classes = useMyStyles();
// const [open, setOpen] = React.useState(true);
// const handleDrawerOpen = () => {
//   setOpen(true);
// };
// const handleDrawerClose = () => {
//   setOpen(false);
// };
// const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
// return (
//   <div className={classes.root}>
//     <CssBaseline />
//     <AppBar
//       position="absolute"
//       className={clsx(classes.appBar, open && classes.appBarShift)}
//     >
//       <Toolbar className={classes.toolbar}>
//         <IconButton
//           edge="start"
//           color="inherit"
//           aria-label="open drawer"
//           onClick={handleDrawerOpen}
//           className={clsx(
//             classes.menuButton,
//             open && classes.menuButtonHidden
//           )}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography
//           component="h1"
//           variant="h6"
//           color="inherit"
//           noWrap
//           className={classes.title}
//         >
//           Dashboard
//         </Typography>
//         <IconButton color="inherit">
//           <Badge badgeContent={4} color="secondary">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//     <Drawer
//       variant="permanent"
//       classes={{
//         paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
//       }}
//       open={open}
//     >
//       <div className={classes.toolbarIcon}>
//         <IconButton onClick={handleDrawerClose}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </div>
//       <Divider />
//       <List>{mainListItems}</List>
//       <Divider />
//       <List>{secondaryListItems}</List>
//     </Drawer>
//     <main className={classes.content}>
//       <div className={classes.appBarSpacer} />
//       <Container maxWidth="lg" className={classes.container}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Paper className={classes.paper}>{props.children}</Paper>
//           </Grid>
//         </Grid>
//         <Box pt={4}>
//           <Copyright1 />
//         </Box>
//       </Container>
//     </main>
//   </div>
// );
