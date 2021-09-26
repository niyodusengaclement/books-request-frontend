import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { userInfo } from "../../utils/Account";
import { connect } from "react-redux";
import { findAllChurches, findPastors } from "../../utils/Others";
import ErrorPage from "../Pages/ErrorPage";

class Churches extends Component {
  componentDidMount() {
    const { role, field } = userInfo();
    if (role === "field") {
      return this.props.getChurches(field.toUpperCase());
    }
    if (role === "admin" || role === "union") {
      this.props.getPastors();
      return this.props.getChurches();
    }
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  hasError = () => <ErrorPage error={this.props.error} />;

  autoCapFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  render() {
    const { role } = userInfo();
    const { churches, pastors } = this.props;

    if (this.props.isLoading) return this.loading();

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={role === "field" ? 9 : 6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Churches
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">N/A</th>
                      <th scope="col">Church</th>
                      <th scope="col">Field</th>
                      <th scope="col">District</th>
                      <th scope="col">Zone</th>
                      {role === "admin" || role === "union" ? null : (
                        <th scope="col">Pastor</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {churches.length > 0 ? (
                      churches.map((church, i) => (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{this.autoCapFirstLetter(church.church_name)}</td>
                          <td>{church.field}</td>
                          <td>{this.autoCapFirstLetter(church.district)}</td>
                          <td>{this.autoCapFirstLetter(church.zone)}</td>
                          {role === "admin" || role === "union" ? null : (
                            <td>{church.pastor_name}</td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={
                            role === "admin" || role === "union" ? "5" : "6"
                          }
                        >
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {role === "admin" || role === "union" ? (
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Pastors
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">N/A</th>
                        <th scope="col">ID</th>
                        <th scope="col">Names</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastors.length > 0 ? (
                        pastors.map((pastors, i) => (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{pastors.login_code}</td>
                            <td>{pastors.pastor_name}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No records found</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          ) : null}
        </Row>
      </div>
    );
  }
}

const mapState = ({ allChurches, pastors }) => ({
  churches: allChurches.allChurches,
  isLoading: allChurches.isLoading,
  isLoaded: allChurches.isLoaded,
  error: allChurches.error,
  pastors: pastors.values,
});

export default connect(mapState, {
  getChurches: findAllChurches,
  getPastors: findPastors,
})(Churches);
