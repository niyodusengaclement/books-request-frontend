import React, { Component } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import { connect } from "react-redux";
import { findAllChurches } from "../../utils/Others";
import ErrorPage from "../Pages/ErrorPage";

class Churches extends Component {
  componentDidMount() {
    return this.props.getChurches();
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  hasError = () => <ErrorPage error={this.props.error} />;

  autoCapFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  render() {
    const { churches } = this.props;

    if (this.props.isLoading) return this.loading();

    return (
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={"6"}>No records found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

const mapState = ({ allChurches }) => ({
  churches: allChurches.allChurches,
  isLoading: allChurches.isLoading,
  isLoaded: allChurches.isLoaded,
  error: allChurches.error,
});

export default connect(mapState, {
  getChurches: findAllChurches,
})(Churches);
