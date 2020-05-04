export const setRequestTimeInfo = (term, year) => {
  const req = JSON.parse(localStorage.getItem('request_time_tab_info'));
  const new_year = year !== null ? year : req.year;
  const new_term = term !== null ? term : req.term;
  const data = {
    year: new_year,
    term: new_term
  }
  localStorage.setItem('request_time_tab_info', JSON.stringify(data));
}

export const requestTimeInfo = () => {
  const date = new Date();
  const time = JSON.parse(localStorage.getItem('request_time_tab_info'))
  const year = time ? time.year : date.getFullYear();
  const term = time ? time.term : 1;
  const data = {
    year,
    term
  }
  return data;
}

export const dueDateCalculator = () => {
  const due = JSON.parse(localStorage.getItem('request_period'));
  const dt1 = new Date();
  const dt2 = new Date(due.enddate);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

export const DateCalculator = (date1, date2) => {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}