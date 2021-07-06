/* eslint-disable import/prefer-default-export */
import axios from "axios";
import creator from "./creator";

const mainAction =
  (method, baseUrl, endpoint, actionType, data) => (dispatch) => {
    axios.defaults.timeout = 30 * 1000;
    dispatch(
      creator(actionType, {
        isLoading: true,
      })
    );

    return axios[method](baseUrl + endpoint, data)
      .then((response) => {
        dispatch(creator(actionType, response?.data?.data));
      })
      .catch((error) => {
        dispatch(
          creator(actionType, {
            error: error?.response?.data.error,
          })
        );
      });
  };

export { mainAction };
