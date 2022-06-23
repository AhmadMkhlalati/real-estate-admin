import axios from "axios";
window.axios = require("axios");
export const adminRoot = "/app";
 export const img_baseUrl = 'http://185.194.124.106:80/storage/';
  axios.defaults.baseURL = 'http://185.194.124.106:80/api/';
// export const img_baseUrl = "http://swesshomerealestate.com/";
// axios.defaults.baseURL = "http://swesshomerealestate.com/api/";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("accessToken");
export default { axios };
