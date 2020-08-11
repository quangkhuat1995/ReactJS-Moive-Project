import React from "react";
import { Route } from "react-router-dom";

function AdminLayout(props) {
  return (
    <div>
      <div>navbar cua trang Admin</div>
      {props.children}
    </div>
  );
}
export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsOfComponent) => (
        <AdminLayout>
          <Component {...propsOfComponent} />
        </AdminLayout>
      )}
    />
  );
}
