import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { deliverBooks } from '../../utils/Others';
import ExportButton from '../ExportButton/ExportButton';
import '../RequestForm/RequestForm.css';
import './styles.css';
import { userInfo } from '../../utils/Account';

class OtherRequestsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  autoCapFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }


  showAndHideModel(req) {
    const isFormShown = this.state.show;
    this.setState({show: !isFormShown});
    return req !== undefined ? this.props.getRequestDetails(req.id) : '';
  }

  deliverHandler(id) {
    this.props.deliverBooks(id);
    this.props.onRefreshTable();
  }

  render() {
    const { role } = userInfo();
    const { requests, name } = this.props;
    return (
      <div className="container">
      <Row>
      <Col id="test">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> { name ? this.autoCapFirstLetter(name) : 'All'} Distinguish Books Requests
          </CardHeader>
          <CardBody>
            <ExportButton />
            <Table hover bordered striped responsive size="sm" id="myTable">
              <thead>
              <tr>
                <th>Book</th>
                <th>Description</th>
                <th>Language</th>
                <th>Field</th>
                <th>District</th>
                <th>Church</th>
                <th>Number of Requests</th>
                <th>Price (1)</th>
                <th>Price (All)</th>
                {
                  role === 'field' ? <th>Action</th> : null
                }
              </tr>
              </thead>
              <tbody>
                {
                  requests.length > 0 ? requests.map((req, i) =>
                  <tr key={i}>
                    <td>{this.autoCapFirstLetter(req.bookname)}</td>
                    <td>{this.autoCapFirstLetter(req.description)}</td>
                    <td>{this.autoCapFirstLetter(req.language)}</td>
                    <td>{req.field}</td>
                    <td>{this.autoCapFirstLetter(req.district)}</td>
                    <td>{this.autoCapFirstLetter(req.church_name)}</td>
                    <td>{req.request}</td>
                    <td>{req.price}</td>
                    <td>{req.totalprice}</td>
                    {
                      role === 'field' ? 
                      <td>
                      {
                        req.delivered ? 'Delivered' : <Button onClick={this.deliverHandler.bind(this, req.id)}>Deliver</Button>
                      }
                    </td>
                    : null
                    }
                    
                  </tr>
                  ) : <tr><td colSpan={role === 'field' ? '10' : '9'}>No records found</td></tr>
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </div>
    );
  }
}

export default connect(null, {
  deliverBooks: deliverBooks
})(OtherRequestsTable);
