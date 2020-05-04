import React, { Component } from 'react';
import { Button, Card, CardBody, Input, InputGroup, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { sendOtp } from '../../utils/Account';

class OtpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
    }

    this.otpChange = this.otpChange.bind(this);
    this.checkOTP = this.checkOTP.bind(this);
  }

  otpChange(evt) {
    const otp = evt.target.value;
    this.setState({ otp });
  }
  checkOTP(evt){
    evt.preventDefault();
    const login_code = this.state.otp;
    if(login_code === '') return false;
    const data = {
      login_code
    }
    
    this.props.send(data);
  }

  render() {
    return (
      <Card className="text-white bg-info py-5">
      <CardBody className="text-center">
        <Form onSubmit={this.checkOTP}>          
          <div>
            <h2>Set up Account</h2>
            <p>If this is your first time, Set up your Account by typing your OTP in the box and hit the Set up Account button</p>
            <InputGroup className="mb-3">
              <Input type="text" placeholder="OTP" autoComplete="off" value={this.state.otp} name="otp" onChange={this.otpChange} />
            </InputGroup>
            <Button color="primary" disabled={this.state.otp === '' ? true : false} className="mt-3" onClick={this.checkOTP} active tabIndex={-1}>Set up Account</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
    );
  }
}

export default connect(null, {
  send: sendOtp
})(OtpComponent);
