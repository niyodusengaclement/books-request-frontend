import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findAllRequests } from '../../../utils/Others';
import OtherRequestsTable from '../../../components/RequestTable/OtherRequestsTable';

class GetOtherRequests extends Component {
  constructor(props) {
    super(props);
    this.refreshTable = this.refreshTable.bind(this);
  }
  componentDidMount() {
    const data = {
      type: 'others'
    }
    this.props.getPastorRequests(data);
  }
  refreshTable() {
    const data = {
      type: 'others'
    }
    this.props.getPastorRequests(data);
  }

  render() {
    const { requests } = this.props;
    return (
      <div className="animated fadeIn">

        <OtherRequestsTable
          requests={requests}
          onRefreshTable={this.refreshTable}
        />

      </div>
    );
  }
}

const mapState = ({ requests }) => ({
  requests: requests.otherRequests,
});

export default connect(mapState, {
  getPastorRequests: findAllRequests,
})(GetOtherRequests);
