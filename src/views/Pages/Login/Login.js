import React, { Component } from 'react';
import { CardGroup, Col, Container, Row } from 'reactstrap';
import LoginComponent from '../../../components/Login/LoginComponent';
import OtpComponent from '../../../components/Login/otp';
import AuthService from '../../../services/AuthToken';
import history from '../../../utils/history';

class Login extends Component {
  componentDidMount() {
    if(AuthService.isLoggedIn()) return history.push('/dashboard');
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                
                <LoginComponent />
                <OtpComponent />
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
