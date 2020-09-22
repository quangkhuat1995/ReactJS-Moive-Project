import React, { Component } from "react";
import { actFetchAdminLogin } from "./modules/action";
import { connect } from "react-redux";
import Loading from "../../../Components/Loading";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const user = {
      taiKhoan: this.state.username,
      matKhau: this.state.password,
    };
    // console.log(e);

    this.props.fetchAdminLogin(user, this.props.history);
  };

  renderNoti = () => {
    const { errorUser } = this.props;
    if (errorUser)
      return (
        <div className="alert alert-danger"> {errorUser.response.data}</div>
      );
  };
  render() {
    const { loading } = this.props;

    if (loading) return <Loading />;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <form onSubmit={this.handleLogin}>
              {this.renderNoti()}
              <div className="form-group">
                <label>Username</label>
                <input
                  onChange={this.handleOnChange}
                  name="username"
                  type="text"
                  className="form-control"
                  value={this.state.username}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  onChange={this.handleOnChange}
                  name="password"
                  type="password"
                  className="form-control"
                  value={this.state.password}
                />
              </div>
              <button type="submit" className="btn btn-success">
                {" "}
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authAdminReducer.loading,
    errorUser: state.authAdminReducer.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminLogin: (user, history) => {
      dispatch(actFetchAdminLogin(user, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
