import HomePage from "./../containers/HOME/HomePage";
import DetailPage from "./../containers/HOME/DetailPage";
import BookingPage from "./../containers/HOME/BookingPage";
import Accounts from "../containers/ADMIN/Accounts";
import ManageMovies from "../containers/ADMIN/ManageMovies";

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
  {
    exact: true,
    path: "/booking/:maLichChieu", //sua cho nay
    component: BookingPage,
  },
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
];
export { HomeRoutes, AdminRoutes };
