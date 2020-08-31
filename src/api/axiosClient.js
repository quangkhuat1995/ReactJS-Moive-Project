// docs https://github.com/axios/axios#interceptors

//https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da

//https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

//https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios

import axios from "axios";
import { URL_API } from "./../constants/config";

const axiosClient = axios.create({
  baseURL: URL_API,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // let token = "";
    // const local =
    //   localStorage.getItem("userUser") || localStorage.getItem("userAdmin");
    // if (localStorage.getItem("userUser")) {
    //   token = JSON.parse(localStorage.getItem("userUser")).accessToken;
    // }
    // if (localStorage.getItem("userAdmin")) {
    //   token = JSON.parse(localStorage.getItem("userAdmin")).accessToken;
    // }
    // if (local) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
