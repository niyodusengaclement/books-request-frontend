import React, { Component } from 'react';
import RequestTable from '../../../components/RequestTable';
import { connect } from 'react-redux';
import { findAllRequests } from '../../../utils/Others';
import { requestTimeInfo } from '../../../services/requestInfo';

class AllRequests extends Component {
  constructor(props) {
    super(props);
    this.refreshTable = this.refreshTable.bind(this);
  }
  componentDidMount() {
    const data = requestTimeInfo();
    const info = {
      ...data,
      district: 'all',
    }    
    this.props.getAllRequests(info);
  }
  refreshTable() {
    const data = requestTimeInfo();
    const info = {
      ...data,
      district: 'all',
    }    
    this.props.getAllRequests(info);
  }

  render() {

    const { requests } = this.props;

    return (
      <div className="animated fadeIn">

        <RequestTable
          requests={requests}
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
})(AllRequests);
