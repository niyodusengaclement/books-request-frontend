import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { createAccount, newUserInfo } from '../../../utils/Account';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import history from '../../../utils/history';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const token = !!localStorage.getItem('otp_token');
    if(token === false) {
      toast.error('Provide your OTP to continue');
      return history.push('/login');
    }

    const  user = newUserInfo();
    this.setState({ user });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
      if(this.props.error === 'Username already taken' ){
        this.setState({
          ...prevState,
          errors: {
            ...prevState.errors,
            username: 'Username already taken'
          }
        });
      }
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    }));

  }

  submitForm(e) {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;

    if(password.length < 6) {
      return this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          password: 'Password must have more than 6 characters'
        }
      }));
    }
    if(password !== confirmPassword ) {
      return this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          confirmPassword: 'Password doesn\'t match',
        }
      }));
    }

    this.setState({
      isLoading: true,
    });

    const data = {
      username,
      password,
    }
    
    this.props.register(data);
    
  }
  render() {
    const { user } = this.state;
    const { username, password, confirmPassword } = this.state.errors;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.submitForm} >
                    <h6>Hey {user.name}</h6>
                    <p className="text-muted">Setup your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="username" invalid={username !=='' ? true : false} onChange={this.onChange} placeholder="Username" autoComplete="username" />
                      <FormFeedback><center>{username}</center></FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" invalid={password !=='' ? true : false} onChange={this.onChange} placeholder="Password" autoComplete="password" />
                      <FormFeedback><center>{password}</center></FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="confirmPassword" invalid={confirmPassword !=='' ? true : false} placeholder="Confirm password" onChange={this.onChange} autoComplete="password" />
                      <FormFeedback><center>{confirmPassword}</center></FormFeedback>
                    </InputGroup>
                    
                    <Row>
                      <Col xs="6">
                              <Button color="success" >
                              {this.props.isLoading === true ? 
                                "Loading..."
                             : 
                              "Create Account"
                            }
                              </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0"><Link to="/login"> Back to login </Link></Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapState = ({ auth }) => ({
  user: auth.user,
  error: auth.error,
  isLoading: auth.isLoading,
});

export default connect(mapState, {
  register: createAccount
})(Register);
