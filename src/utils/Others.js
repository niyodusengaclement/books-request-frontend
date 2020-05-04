import { toast } from 'react-toastify';
import HttpRequest from "../services/HttpRequest";
import creator from "../module/actions/creator";
import { REQUEST_BOOKS_SUCCESS, GET_REQUEST_START, REQUEST_ACCOUNT_ERROR, REQUEST_LANGUAGES_SUCCESS, REQUEST_LANGUAGES_ERROR, CREATE_REQUEST_START, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_ERROR, GET_REQUEST_SUCCESS, GET_REQUEST_ERROR, GET_PASTOR_CHURCHES_START, GET_PASTOR_CHURCHES_SUCCESS, GET_CHURCHES_SUCCESS, GET_CHURCHES_START, GET_CHURCHES_ERROR, GET_PASTOR_CHURCHES_ERROR, GET_DISTRICTS_START, GET_DISTRICTS_SUCCESS, GET_DISTRICTS_ERROR, GET_DASHBOARD_START, GET_DASHBOARD_SUCCESS, GET_DASHBOARD_ERROR, TIMETABLE_START, TIMETABLE_SUCCESS, TIMETABLE_ERROR, GET_YEARS_START, GET_YEARS_SUCCESS, GET_YEARS_ERROR, GET_SINGLE_REQUEST_SUCCESS, UPDATE_REQUEST_SUCCESS, UPDATE_REQUEST_START, ADD_BOOK_START, ADD_BOOK_SUCCESS, ADD_BOOK_ERROR, GET_FIELDS_SUCCESS, GET_OTHER_BOOKS_SUCCESS, GET_OTHER_REQUESTS_SUCCESS, GET_PASTOR_START, GET_PASTOR_SUCCESS, GET_PASTOR_ERROR } from "../module/actions";
import { setRequestTimeInfo } from '../services/requestInfo';
import { userInfo } from './Account';

export const findBooks = (type) => async (dispatch) => {
  try {
    const res = await HttpRequest.get(`/find-books?type=${type}` );
    if(type === 'others') {
      return dispatch(creator(GET_OTHER_BOOKS_SUCCESS, res.data));
    }
    dispatch(creator(REQUEST_BOOKS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(REQUEST_ACCOUNT_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const findPastorChurches = () => async (dispatch) => {
  try {
    dispatch(creator(GET_PASTOR_CHURCHES_START, true));
    const res = await HttpRequest.get('/pastor-churches' );
    dispatch(creator(GET_PASTOR_CHURCHES_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      const error = {
        status: e.response.data.status,
        message: e.response.data.error,
      }
      dispatch(creator(GET_PASTOR_CHURCHES_ERROR, error ));
      return toast.error(e.response.data.error);
    }
  }
}

export const findAllChurches = () => async (dispatch) => {
  try {
    dispatch(creator(GET_CHURCHES_START, true));
    const res = await HttpRequest.get(`churches`);
    dispatch(creator(GET_CHURCHES_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      const error = {
        status: e.response.data.status,
        message: e.response.data.error,
      }
      dispatch(creator(GET_CHURCHES_ERROR, error ));
      return toast.error(e.response.data.error);
    }
  }
}

export const findLanguages = () => async (dispatch) => {
  try {
    const res = await HttpRequest.get('/languages');
    dispatch(creator(REQUEST_LANGUAGES_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(REQUEST_LANGUAGES_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const getRequests = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_REQUEST_START, true));
    const res = await HttpRequest.get(`/church-command?year=${data.year}&term=${data.term}`);
    setRequestTimeInfo(data.term, data.year);
    dispatch(creator(GET_REQUEST_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      if(e.response.data.status === 404) {
        return dispatch(creator(GET_REQUEST_SUCCESS, []));
      }
      dispatch(creator(GET_REQUEST_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const getSingleRequestDetails = (id) => async (dispatch) => {
  try {
    dispatch(creator(UPDATE_REQUEST_START, true));
    const res = await HttpRequest.get(`/requests/${id}`);
    dispatch(creator(GET_SINGLE_REQUEST_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_REQUEST_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const updateRequest = (id, command) => async (dispatch) => {
  try {
    dispatch(creator(UPDATE_REQUEST_START, true));
    const res = await HttpRequest.patch(`/update/${id}`, command);
    dispatch(creator(UPDATE_REQUEST_SUCCESS, res.data));
    return toast.info(res.message);
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_REQUEST_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const findYears = () => async (dispatch) => {
  try {
    dispatch(creator(GET_YEARS_START, true));
    const res = await HttpRequest.get(`/years`);
    dispatch(creator(GET_YEARS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      if(e.response.data.status === 404) {
        return dispatch(creator(GET_YEARS_SUCCESS, []));
      }
      dispatch(creator(GET_YEARS_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const findAllRequests = (data) => async (dispatch) => {
  try {
    dispatch(creator(GET_REQUEST_START, true));
    const res = await HttpRequest.get(`/requests?district=${data.district}&year=${data.year}&term=${data.term}&type=${data.type}`);
    if(res.data.requestType === 'others') {
      return dispatch(creator(GET_OTHER_REQUESTS_SUCCESS, res.data.requests));
    }
    dispatch(creator(GET_REQUEST_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
            if(e.response.data.status === 404) {
        return dispatch(creator(GET_REQUEST_SUCCESS, []));
      }
      dispatch(creator(GET_REQUEST_ERROR, e.response.data.error));
    }
  }
}

export const createRequest = (data, type) => async (dispatch) => {
  try {
    dispatch(creator(CREATE_REQUEST_START, true));
    const res = await HttpRequest.post(`/create-command?type=${type}`, data);
    dispatch(creator(CREATE_REQUEST_SUCCESS, res.data));
    return toast.info(res.message);
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(CREATE_REQUEST_ERROR, e.response.data.error));
      return toast.error(e.response.data.error);
    }
  }
}

export const findDistricts = () => async (dispatch) => {
  try {
    dispatch(creator(GET_DISTRICTS_START, true));
    const res = await HttpRequest.get(`/districts-and-fields` );
    const { role } = userInfo();
    if(role === 'field') {
      return dispatch(creator(GET_DISTRICTS_SUCCESS, res.data));
    }
    return dispatch(creator(GET_FIELDS_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      const error = {
        status: e.response.data.status,
        message: e.response.data.error,
      }
      dispatch(creator(GET_DISTRICTS_ERROR, error));
      return toast.error(e.response.data.error);
    }
  }
}

export const findDashboard = () => async (dispatch) => {
  try {
    dispatch(creator(GET_DASHBOARD_START, true));
    const res = await HttpRequest.get('/dashboard' );
    dispatch(creator(GET_DASHBOARD_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      const error = {
        status: e.response.data.status,
        message: e.response.data.error,
      }
      dispatch(creator(GET_DASHBOARD_ERROR, error));
      return toast.error(e.response.data.error);
    }
  }
}

export const createTimetable = (data, isUpdate) => async (dispatch) => {
  try {
    dispatch(creator(TIMETABLE_START, true));
    const res = await HttpRequest.post(`/timetable?isUpdate=${isUpdate}`, data);
    const date1 = new Date(res.data.startdate);
    const date2 = new Date(res.data.enddate);
    const start =  `${date1.getFullYear()}-${date1.getMonth()+1}-${date1.getDate()}`;
    const due =  `${date2.getFullYear()}-${date2.getMonth()+1}-${date2.getDate()}`;
    const info = {
      ...res.data,
      startdate: start,
      enddate: due,
    }
    dispatch(creator(TIMETABLE_SUCCESS, info));
    localStorage.setItem('request_period', JSON.stringify(info));
    return toast.info(res.message);
  } catch (e) {
    if (e.response && e.response.data) {
      const error = {
        status: e.response.data.status,
        message: e.response.data.error,
      }
      dispatch(creator(TIMETABLE_ERROR, error));
      return toast.error(e.response.data.error);
    }
  }
}

export const addBook = (data) => async (dispatch) => {
  try {
    dispatch(creator(ADD_BOOK_START, true));
    const res = await HttpRequest.post('/add-book', data);
    dispatch(creator(ADD_BOOK_SUCCESS, res.data));
    return toast.info(res.message);
  } catch (e) {
    if (e.response && e.response.data) {
      const error = {
        status: e.response.data.status,
        message: e.response.data.error,
      }
      dispatch(creator(ADD_BOOK_ERROR, error));
      return toast.error(e.response.data.error);
    }
  }
}

export const addSinglePastor = (data) => async (dispatch) => {
  try {
    const res = await HttpRequest.post('/add-single-pastor', data);
    return toast.info(res.message);
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
}

export const uploadFile = (data, path) => async (dispatch) => {
  try {
    const res = await HttpRequest.post(path, data);
    return toast.info(res.message);
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
}

export const addSingleChurch = (data) => async (dispatch) => {
  try {
    const res = await HttpRequest.post('/add-single-church', data);
    return toast.info(res.message);
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
}

export const deliverBooks = (id) => async (dispatch) => {
  try {
    const res = await HttpRequest.patch(`/deliver/${id}`);
    return toast.info(res.message);
  } catch (e) {
    if (e.response && e.response.data) {
      return toast.error(e.response.data.error);
    }
  }
}

export const findPastors = () => async (dispatch) => {
  try {
    dispatch(creator(GET_PASTOR_START, true));
    const res = await HttpRequest.get('/find-pastors' );
    dispatch(creator(GET_PASTOR_SUCCESS, res.data));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch(creator(GET_PASTOR_ERROR, e.response.data.error ));
      return toast.error(e.response.data.error);
    }
  }
}

export const checkTimetable = () => async (dispatch) => {
  try {
    dispatch(creator(TIMETABLE_START, true));
    const res = await HttpRequest.get('/timetable');
    const date1 = new Date(res.data.startdate);
    const date2 = new Date(res.data.enddate);
    const start =  `${date1.getFullYear()}-${date1.getMonth()+1}-${date1.getDate()}`;
    const due =  `${date2.getFullYear()}-${date2.getMonth()+1}-${date2.getDate()}`;
    const info = {
      ...res.data,
      startdate: start,
      enddate: due,
    }
    dispatch(creator(TIMETABLE_SUCCESS, info));
    localStorage.setItem('request_period', JSON.stringify(info));
    localStorage.setItem('request_time_tab_info', JSON.stringify({
      year: date1.getFullYear(),
      term: 1,
    }));
  } catch (e) {
    if (e.response && e.response.data) {
      const error = {
        status: e.response.data.status,
        message: e.response.data.error,
      }
      dispatch(creator(TIMETABLE_ERROR, error));
      return toast.error(e.response.data.error);
    }
  }
}
