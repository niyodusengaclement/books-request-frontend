import React, { Component } from 'react';
import qs from 'qs';
import RequestTable from '../../../components/RequestTable';
import { connect } from 'react-redux';
import { getRequests } from '../../../utils/Others';
import { userInfo } from '../../../utils/Account';
import ErrorPage from '../ErrorPage';
import { requestTimeInfo, dueDateCalculator } from '../../../services/requestInfo';

class GetRequest extends Component {
  constructor(props) {
    super(props);
    this.refreshTable = this.refreshTable.bind(this);
  }
  componentDidMount() {
    const data = requestTimeInfo();
    this.props.getPastorRequests(data);
  }
  refreshTable() {
    const data = requestTimeInfo();
    this.props.getPastorRequests(data);
  }

  render() {
    const { role } = userInfo();
    const error = {
      status: 403,
      message: 'Access denied, This page accessed by Pastors only'
    }
    if (role !== 'pastor') return <ErrorPage error={error} />
    
    const { churchId, churchName } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const churchInfo = {
      churchId,
      churchName
    }
    let church = churchId ? localStorage.setItem('request_church_info', JSON.stringify(churchInfo)) : null;
    church = JSON.parse(localStorage.getItem('request_church_info'));

    if(!church) {
      const error = {
        status: 404,
        message: 'No church found, to see a report select church in sidebar'
      }
      return <ErrorPage error={error} />
    }
    const time = JSON.parse(localStorage.getItem('request_period'));
    const tab = requestTimeInfo();

    const { requests } = this.props;
    const command = requests.length > 0 ? requests.filter(({ churchid }) => churchid === parseInt(church.churchId, 10)) : [];

    const dueDate = dueDateCalculator();
    const isLate = dueDate < 1 || tab.year < time.year || tab.term < time.term ? true : false;

    window.history.replaceState(null, null, '/get-requests');
    return (
      <div className="animated fadeIn">

        <RequestTable
          requests={command}
          name={church.churchName}
          onChangeYear={this.refreshTable}
          onChangeQuarter={this.refreshTable}
          onRefreshTable={this.refreshTable}
          hasUpdateColumn={isLate ? false : true}
        />

      </div>
    );
  }
}

const mapState = ({ requests }) => ({
  requests: requests.requests,
});

export default connect(mapState, {
  getPastorRequests: getRequests,
})(GetRequest);
