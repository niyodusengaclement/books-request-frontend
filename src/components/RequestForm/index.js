import React, { Component } from 'react';
import { Row, Container, Col } from 'reactstrap';
import AdultForm from './AdultForm';
import YoungForm from './YoungForm';
import MissionReport from './MissionReport';
import { findBooks } from '../../utils/Others';
import { connect } from 'react-redux';
import { dueDateCalculator } from '../../services/requestInfo';

class RequestForm extends Component {
  componentDidMount() {
    this.props.returnBooks();
  }
  render() {
    
    const due = JSON.parse(localStorage.getItem('request_period'));
    const dueDate = dueDateCalculator();
    const late = dueDate < 1 ? true : false;

    if(late) return (
      <Row>
      <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <span className="clearfix">
            <h1 className="float-left display-3 mr-4">Closed</h1>
            <p className="text-muted float-left">The due date of the request was {due.enddate}</p>
          </span>
       
        </Col>
      </Row>
    </Container>
    </Row>
    )

    return (
      <Row>

        <AdultForm church={this.props.church} books={this.props.books} />
        <YoungForm church={this.props.church} books={this.props.books} />
        <MissionReport church={this.props.church} books={this.props.books} />

      </Row>
    )
  }
}

const mapState = ({ books }) => ({
  books: books.books,
});

export default connect(mapState, {
  returnBooks: findBooks,
})(RequestForm);
