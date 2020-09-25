import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// const userObj = localStorage.getItem(USER_KEY);

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userLoginReducer.isLoggedIn,
  };
};
export default connect(mapStateToProps, null)(PrivateRoute);
