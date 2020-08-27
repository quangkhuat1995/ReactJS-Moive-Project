import React from "react";
import { Route, Redirect } from "react-router-dom";

function AdminLayout(props) {
  return (
    <>
      <div>navbar cua trang Admin</div>
      {props.children}
    </>
  );
}
export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsOfComponent) => {
        if (localStorage.getItem("userAdmin")) {
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
