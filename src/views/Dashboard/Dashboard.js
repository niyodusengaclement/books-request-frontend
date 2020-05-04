import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { findDashboard } from '../../utils/Others';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getDashboard();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  findDashboardType(book, reader) {
    const { dashboard } = this.props;
    if(dashboard.length > 0) {
      const res =  dashboard.filter(({bookname, bookreader}) => bookname === book && bookreader === reader);
      const totalNumbers = res[0] !== undefined ? res[0].nbr : 0;
      return `Total requests: ${totalNumbers}`
    }
    return 0;
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <div><b>Adult - Bible Study</b></div>
                {this.findDashboardType('bible_study', 'adult')}
              </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <div> <b> Young - Bible Study</b></div>
                {this.findDashboardType('bible_study', 'young')}
              </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <div><b>Adult - Mission Report</b></div>
                {this.findDashboardType('mission_report', 'adult')}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <div><b>Young - Mission Report</b></div>
                {this.findDashboardType('mission_report', 'young')}
              </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <div><b>Request Due Date</b></div>
                <div>Starting Date: {this.props.time.startdate}</div>
                <div>Due Date: {this.props.time.enddate}</div>
              </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      
      </div>
    );
  }
}

const mapState = ({ dashboard, timetable }) => ({
  dashboard: dashboard.dashboard,
  isLoading: dashboard.isLoading,
  isLoaded: dashboard.isLoaded,
  error: dashboard.error,
  time: timetable.timetable,
});
export default connect(mapState, {
  getDashboard: findDashboard,
})(Dashboard);
