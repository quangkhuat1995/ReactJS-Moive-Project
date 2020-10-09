import { lazy } from "react";
const HomePage = lazy(() => import("./../containers/HOME/HomePage"));
const DetailPage = lazy(() => import("./../containers/HOME/DetailPage"));
const Accounts = lazy(() => import("../containers/ADMIN/Accounts"));
const ManageMovies = lazy(() => import("../containers/ADMIN/ManageMovies"));
const ManagerShowTime = lazy(() =>
  import("../containers/ADMIN/ManageShowTime")
);

// import HomePage from "./../containers/HOME/HomePage";
// import DetailPage from "./../containers/HOME/DetailPage";
// // import BookingPage from "./../containers/HOME/BookingPage";
// import Accounts from "../containers/ADMIN/Accounts";
// import ManageMovies from "../containers/ADMIN/ManageMovies";
// import ManagerShowTime from "../containers/ADMIN/ManageShowTime";

const HomeRoutes = [
  {
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    exact: true,
    path: "/phim/:slug", //slug: maPhim-biDanh . 1322-ted-part-2
    component: DetailPage,
  },
  // {
  //   exact: true,
  //   path: "/booking/:maLichChieu", //sua cho nay
  //   component: BookingPage,
  // },
];

const AdminRoutes = [
  {
    exact: true,
    path: "/dashboard", // chỉnh sửa movie
    component: ManageMovies,
  },
  {
    exact: true,
    path: "/user-management",
    component: Accounts,
  },
  {
    exact: true,
    path: "/showtime-management",
    component: ManagerShowTime,
  },
];
export { HomeRoutes, AdminRoutes };
