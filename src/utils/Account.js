import { toast } from 'react-toastify';
import HttpRequest from "../services/HttpRequest";
import creator from "../module/actions/creator";
import { SEND_OTP_ERROR, SEND_OTP_SUCCESS, REQUEST_ACCOUNT_START, REQUEST_ACCOUNT_SUCCESS, REQUEST_ACCOUNT_ERROR,GET_USER_PROFILE_START, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from "../module/actions";
import AuthService from "../services/AuthToken";
import history from './history';
import JwtDecode from 'jwt-decode';

export const sendOtp = (data) => async (dispatch) => {
  try {
    const res = await HttpRequest.post('/send-otp', data );
    localStorage.setItem('otp_token', res.data.token)
    dispatch(creator(SEND_OTP_SUCCESS, res.data.info));
    history.push('/register');
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(SEND_OTP_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const userLogin = (data) => async (dispatch) => {
  try {
    dispatch(creator(REQUEST_ACCOUNT_START, true));
    const res = await HttpRequest.post('/login', data );
    AuthService.setToken(res.data.token);
    dispatch(creator(REQUEST_ACCOUNT_SUCCESS, res.data.info));
    document.location.assign('/dashboard');
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(REQUEST_ACCOUNT_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const findUserProfile = () => async (dispatch) => {
  try {
    dispatch(creator(GET_USER_PROFILE_START, true));
    const res = await HttpRequest.get('/profile');
    dispatch(creator(GET_USER_PROFILE_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_USER_PROFILE_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const createAccount = (data) => async (dispatch) => {
  try {
    dispatch(creator(REQUEST_ACCOUNT_START, true));
    fetch('https://publishing-backend.herokuapp.com/api/account-setup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.getItem('otp_token')
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if(!res.data) {
        dispatch(creator(REQUEST_ACCOUNT_ERROR, res.error));
        return toast.error(res.error);
      }
      AuthService.setToken(res.data.token);
      localStorage.removeItem('otp_token');
      dispatch(creator(REQUEST_ACCOUNT_SUCCESS, res.data.info));
      history.push('/dashboard');
    })
    .catch(e => {
      console.error(e);
    })
  } catch (e) {
    console.error(e);
  }
}

export const userInfo = () => {
const token = AuthService.getToken();
if(!token) return toast.error('Login first');
return JwtDecode(token);
}

export const newUserInfo = () => {
const token = localStorage.getItem('otp_token');
if(!token) return toast.error('Provide your OTP please');
return JwtDecode(token);
}
