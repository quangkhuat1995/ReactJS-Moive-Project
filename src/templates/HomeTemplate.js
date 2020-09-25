import React from "react";
import { Route } from "react-router-dom";

import Footer from "../Components/Footer";
import UserNavbar from "../Components/UserNavbar";

function HomeLayout(props) {
  console.log(props);
  return (
    <>
      <UserNavbar />
      {props.children}

      <Footer />
    </>
  );
}
export default function HomeTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsOfComponent) => (
        <HomeLayout>
          <Component {...propsOfComponent} />
        </HomeLayout>
      )}
    />
  );
}
