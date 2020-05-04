import React, { Component } from 'react';
import qs from 'qs';
import RequestForm from '../../../components/RequestForm';
import ErrorPage from '../ErrorPage';
import { userInfo } from '../../../utils/Account';

class SendRequest extends Component {
  render() {
    const { churchId, churchName } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const churchInfo = {
      churchId,
      churchName
    }
    let church = churchId ? localStorage.setItem('request_church_info', JSON.stringify(churchInfo)) : null;
    church = JSON.parse(localStorage.getItem('request_church_info'));

    window.history.replaceState(null, null, '/create-request');
    const { role } = userInfo();
    const error = {
      status: 403,
      message: 'Access denied, This page accessed by Pastors only'
    }
    if (role !== 'pastor') return <ErrorPage error={error} />
    return (
      <div className="animated fadeIn">
        <RequestForm church={church} />
      </div>
    );
  }
}
export default SendRequest;
