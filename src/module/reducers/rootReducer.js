import { combineReducers } from "redux";
import authReducer from "./authReducer";
import otpReducer from "./otpReducer";
import booksReducer from "./booksReducer";
import languageReducer from "./languageReducer";
import requestsReducer from "./requestsReducer";
import churchesReducer from "./churchesReducer";
import districtsReducer from "./districtsReducer";
import allChurchesReducer from "./allChurchesReducer";
import dashboardReducer from "./dashboardReducer";
import timetableReducer from "./timetableReducer";
import yearsReducer from "./yearsReducer";
import pastorsReducer from "./pastorsReducer";
import guestReducer from "./guestReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  otp: otpReducer,
  books: booksReducer,
  language: languageReducer,
  requests: requestsReducer,
  churches: churchesReducer,
  allChurches: allChurchesReducer,
  districts: districtsReducer,
  dashboard: dashboardReducer,
  timetable: timetableReducer,
  years: yearsReducer,
  pastors: pastorsReducer,
  guest: guestReducer,
});

export default rootReducer;
