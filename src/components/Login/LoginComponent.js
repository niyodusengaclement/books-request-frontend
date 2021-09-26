import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormFeedback,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../utils/Account";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: "",
      password: "",
      errors: {
        username: "",
        password: "",
      },
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
      errors: {
        username: "",
        password: "",
      },
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const { username, password } = this.state;
    if (username === "") {
      return this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          username: "Username is required",
        },
      }));
    }

    if (password === "") {
      return this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          password: "Password is required",
        },
      }));
    }

    const data = {
      username,
      password,
    };
    this.props.login(data);
    this.setState((prevState) => ({
      ...prevState,
      password: "",
    }));
  }

  render() {
    const { username, password } = this.state.errors;
    return (
      <Card className="p-4">
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <p className="text-muted">Sign In to your account</p>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                invalid={username !== "" ? true : false}
                name="username"
                onChange={this.onChange}
                placeholder="Username"
                autoComplete="username"
              />
              <FormFeedback>
                <center>{username}</center>
              </FormFeedback>
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                value={this.state.password}
                invalid={password !== "" ? true : false}
                name="password"
                onChange={this.onChange}
                placeholder="Password"
                autoComplete="password"
              />
              <FormFeedback>
                <center>{password}</center>
              </FormFeedback>
            </InputGroup>
            <Row>
              <Col xs="6">
                <Button color="primary" className="px-4">
                  {this.props.isLoading ? "Loading..." : "Login"}
                </Button>
              </Col>
              <Col xs="6" className="text-right">
                <Button color="link" className="px-0">
                  <Link to="/guest" color="link" className="px-0">
                    Guest
                  </Link>
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const mapState = ({ auth }) => ({
  isLoading: auth.isLoading,
  isLoaded: auth.isLoaded,
  error: auth.error,
});

export default connect(mapState, {
  login: userLogin,
})(LoginComponent);
