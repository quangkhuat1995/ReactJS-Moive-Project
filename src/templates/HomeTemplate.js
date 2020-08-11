import React from "react";
import { Route } from "react-router-dom";

import Footer from "../Components/Footer";

function HomeLayout(props) {
  return (
    <div>
      <div>nav bar cua trang user</div>
      {props.children}
      <Footer />
    </div>
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
