import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
import {
  setRequestTimeInfo,
  requestTimeInfo,
} from "../../services/requestInfo";
import { connect } from "react-redux";
import { findYears, getSingleRequestDetails } from "../../utils/Others";
import UpdateForm from "../RequestForm/UpdateForm";
import "../RequestForm/RequestForm.css";
import "./styles.css";
import ExportButton from "../ExportButton/ExportButton";

class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.refreshTable = this.refreshTable.bind(this);
  }
  componentDidMount() {
    this.props.getYears();
  }
  autoCapFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  changeQuarter(term) {
    setRequestTimeInfo(term, null);
    this.props.onChangeQuarter();
  }
  changeYear(year) {
    setRequestTimeInfo(null, year);
    this.props.onChangeYear();
  }
  refreshTable() {
    this.props.onRefreshTable();
  }
  showAndHideModel(req, name) {
    const data = {
      ...req,
      name,
    };

    this.setState({
      requestUpdate: data,
    });

    const isFormShown = this.state.show;
    this.setState({ show: !isFormShown });
    return req !== undefined ? this.props.getRequestDetails(req.id) : "";
  }

  render() {
    const info = requestTimeInfo();
    const { requests, name, years, hasUpdateColumn } = this.props;
    let theModelSwitch = null;

    if (this.state.show) {
      theModelSwitch = (
        <UpdateForm
          isOpen={this.showAndHideModel.bind(this)}
          request={this.state.requestUpdate}
          onUpdate={this.refreshTable}
        />
      );
    }

    return (
      <div className="container">
        <Row>
          <div id="update-form">{theModelSwitch}</div>
          <Col id="test">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>{" "}
                {name ? this.autoCapFirstLetter(name) : "All"} Requests
              </CardHeader>
              <CardBody>
                <Pagination>
                  {years.length > 0
                    ? years.map(({ year }, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            className={info.year === year ? "isActive" : ""}
                            tag="button"
                            onClick={this.changeYear.bind(this, year)}
                          >
                            {year}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    : null}
                </Pagination>
                <Table responsive size="sm">
                  <Pagination className="the-pagination">
                    <PaginationItem>
                      <PaginationLink
                        className={info.term === 1 ? "isActive" : ""}
                        tag="button"
                        onClick={this.changeQuarter.bind(this, 1)}
                      >
                        First Quarter
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        className={info.term === 2 ? "isActive" : ""}
                        tag="button"
                        onClick={this.changeQuarter.bind(this, 2)}
                      >
                        Second Quarter
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        className={info.term === 3 ? "isActive" : ""}
                        tag="button"
                        onClick={this.changeQuarter.bind(this, 3)}
                      >
                        Third Quarter
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        className={info.term === 4 ? "isActive" : ""}
                        tag="button"
                        onClick={this.changeQuarter.bind(this, 4)}
                      >
                        Fourth Quarter
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </Table>
                <ExportButton name={name} />
                <Table hover bordered striped responsive size="sm" id="myTable">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Language</th>
                      <th>Readers Category</th>
                      <th>Book Type</th>
                      <th>Number of Requests</th>
                      <th>Price (Frw)</th>
                      {hasUpdateColumn === true ? <th>Church Member</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length > 0 ? (
                      requests.map((req, i) => (
                        <tr key={i}>
                          <td>
                            {req.bookname === "bible_study"
                              ? "Bible Study"
                              : "Mission Report"}
                          </td>
                          <td>{this.autoCapFirstLetter(req.language)}</td>
                          <td>{this.autoCapFirstLetter(req.bookreader)}</td>
                          <td>{this.autoCapFirstLetter(req.booktype)}</td>
                          <td>{req.nbr}</td>
                          <td>{req.price}</td>
                          {hasUpdateColumn === true ? (
                            <td>{req.name}</td>
                          ) : null}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={hasUpdateColumn === true ? "7" : "6"}>
                          No records found
                        </td>
                      </tr>
                    )}
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

const mapState = ({ years }) => ({
  years: years.values,
});

export default connect(mapState, {
  getRequestDetails: getSingleRequestDetails,
  getYears: findYears,
})(RequestTable);
