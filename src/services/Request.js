import axios from "axios";
import AuthService from "./AuthToken";

const token = AuthService.getToken();

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
  headers: {
    "x-auth-token": token,
  },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;
instance.Cancel = axios.Cancel;

const successResponse = (response) => {
  console.debug("Request Successful!", response);
  return response.data;
};

const failResponse = (error) => {
  console.error("Request Failed", error.config);
  if (error.response && error.response.data) {
    console.error("Request error", error.response.data);
  }
  return Promise.reject(error);
};

const Request = (options) =>
  instance(options).then(successResponse).catch(failResponse);

export default Request;
