import React, { Component } from 'react';
import qs from 'qs';
import RequestTable from '../../../components/RequestTable';
import { connect } from 'react-redux';
import { findAllRequests } from '../../../utils/Others';
import ErrorPage from '../ErrorPage';
import { userInfo } from '../../../utils/Account';
import { requestTimeInfo } from '../../../services/requestInfo';

class DistrictRequests extends Component {  constructor(props) {
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
      message: 'Access denied, This page accessed by Field only'
    }
    if (role !== 'field') return <ErrorPage error={error} />

    const { districtName } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    let districtInfo = districtName ? localStorage.setItem('request_district_info', JSON.stringify(districtName)) : null;
    districtInfo = JSON.parse(localStorage.getItem('request_district_info'));

    if(!districtInfo) {
      const error = {
        status: 409,
        message: 'No district found, to see a report select district in sidebar'
      }
      return <ErrorPage error={error} />
    }

    const { requests } = this.props;
    const command = requests.length > 0 ? requests.filter(({ district }) => district === districtInfo) : [];

    window.history.replaceState(null, null, '/district-requests');

    return (
      <div className="animated fadeIn">
        
        <RequestTable
          requests={command}
          name={districtInfo}
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
})(DistrictRequests);
