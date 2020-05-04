import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

class ErrorPage extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    if(!this.props.error) return this.loading();
    const { message, status } = this.props.error;
    return (
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4">{status}</h1>
                <h4 className="pt-3">Oops, we have a problem!</h4>
                <p className="text-muted float-left">{message}</p>
              </span>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default ErrorPage;
