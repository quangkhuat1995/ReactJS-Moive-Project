import HomePage from "./../containers/HOME/HomePage";
import DetailPage from "./../containers/HOME/DetailPage";
import BookingPage from "./../containers/HOME/BookingPage";
import Dashboard from "../containers/ADMIN/Dashboard";
import AddUser from "../containers/ADMIN/AddUser";

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
    path: "/checkout", //sua cho nay
    component: BookingPage,
  },
];

const AdminRoutes = [
  {
    exact: true,
    path: "/dashboard",
    component: Dashboard,
  },
  {
    exact: true,
    path: "/add-user",
    component: AddUser,
  },
];
export { HomeRoutes, AdminRoutes };
