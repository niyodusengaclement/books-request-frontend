import React, { Component } from 'react';
import qs from 'qs';
import RequestTable from '../../../components/RequestTable';
import { connect } from 'react-redux';
import { findAllRequests } from '../../../utils/Others';
import ErrorPage from '../ErrorPage';
import { userInfo } from '../../../utils/Account';
import { requestTimeInfo } from '../../../services/requestInfo';

class FieldRequests extends Component {  constructor(props) {
  super(props);
  this.refreshTable = this.refreshTable.bind(this);
}
componentDidMount() {
  const data = requestTimeInfo();
  this.props.getAllRequests(data);
}
refreshTable() {
  const data = requestTimeInfo();
  this.props.getAllRequests(data);
}

  render() {
    const { role } = userInfo();
    const error = {
      status: 403,
      message: 'Access denied, This page accessed by Admin and Union only'
    }
    if (role !== 'admin' && role !== 'union') return <ErrorPage error={error} />

    const { fieldName } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    let fieldInfo = fieldName ? localStorage.setItem('request_field_info', JSON.stringify(fieldName)) : null;
    fieldInfo = JSON.parse(localStorage.getItem('request_field_info'));

    if(!fieldInfo) {
      const error = {
        status: 404,
        message: 'No Field found, to see a report select a Field in sidebar menu'
      }
      return <ErrorPage error={error} />
    }

    const { requests } = this.props;
    const command = requests.length > 0 ? requests.filter(({ field }) => field === fieldInfo) : [];

    window.history.replaceState(null, null, '/field-requests');

    return (
      <div className="animated fadeIn">
        
        <RequestTable
          requests={command}
          name={fieldInfo}
          onChangeYear={this.refreshTable}
          onChangeQuarter={this.refreshTable}
          onRefreshTable={this.refreshTable}
        />

      </div>
    );
  }
}

const mapState = ({ requests }) => ({
  requests: requests.requests,
});

export default connect(mapState, {
  getAllRequests: findAllRequests,
})(FieldRequests);
