import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Input, Row, Form, FormGroup, Label, FormFeedback, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import './RequestForm.css';
import { createRequest } from '../../utils/Others';

class OtherBooksRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request_number: '',
      church_id: '',
      errors: {
        request_err: '',
        church_err: '',
      },
    }
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }


  closeForm() {
    this.props.isOpen()
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      errors: {
        request_err: '',
        church_err: '',
      },
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { church_id, request_number } = this.state;

    if(request_number === '' && church_id === '') {
      return this.setState({
        errors: {
          request_err: "Enter number of requests please",
          church_err: 'Select the church please',
        },
      });
    }
    if(request_number === '') {
      return this.setState({
        errors: {
          request_err: "Enter number of requests please",
          church_err: '',
        },
      });
    }
    if(church_id === '') {
      return this.setState({
        errors: {
          request_err: "",
          church_err: 'Select the church please',
        },
      });
    }
    const { book } = this.props;
    const data = {
      bookid: book.bookid,
      church_id,
      request: request_number
    }
    this.props.sendRequest(data, 'others')
    this.props.isOpen();
  }

  render() {
    const { book, churches } = this.props;
    const { church_id, request_number } = this.state;
    const { church_err, request_err } = this.state.errors;
    return (
      <div className="create-form-container">
      <Row>
        <Col md="6" lg="7" xl="6" className="push-left">
          <Card className="mx-4">
            <CardHeader>
              Create a Request
              <span onClick={this.closeForm} className="closer">x</span>
            </CardHeader>
            <CardBody className="p-4">
              <Form onSubmit={this.submitForm} >

              <FormGroup row className="text-right" >
              <Col xs="4" md="2">
                  <Label > Book name </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="text"
                    className="input-f"
                    name='bookname'
                    disabled
                    value={book.bookname}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
              <Col xs="4" md="2">
                  <Label > Book Language </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="text"
                    className="input-f"
                    name='language'
                    disabled
                    value={book.language}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
              <Col xs="4" md="2">
                  <Label > Book Price </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="text"
                    className="input-f"
                    name='price'
                    disabled
                    value={book.price}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
              <Col xs="4" md="2">
                  <Label > Church </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input type="select"
                    name="church_id"
                    value={church_id}
                    onChange={this.onChange}
                    invalid={church_err === '' ? false : true}
                  >
                    <option value="">Please select</option>
                  {
                    churches.length > 0 ? churches.map((church) =>
                        <option key={church.church_id} value={church.church_id}>{church.church_name.toUpperCase()}</option>
                    )
                    : null
                  }
                  </Input>
                  <FormFeedback><center> {church_err} </center></FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
              <Col xs="4" md="2">
                  <Label > Request </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="number"
                    className="input-f"
                    name='request_number'
                    min="0"
                    value={request_number}
                    onChange={this.onChange}
                    placeholder="Enter number of books"
                    invalid={request_err === '' ? false : true}
                    onKeyDown= {(e) => {
                      if(e.key === 'Enter') {
                        this.submitForm(e);
                      }
                    }}
                  />
                  <FormFeedback><center> {request_err} </center></FormFeedback>
                </Col>
              </FormGroup>
              </Form>
                
                <Row>
                <Col xs="4" md="2">
                  </Col>
                <Col xs="4" md="5">
                    <Button color="success" onClick={this.submitForm}>
                      Send 
                    </Button>
                  </Col>
                  <Col xs="4" md="5" className="text-right">
                    <Button onClick={this.closeForm} >Cancel </Button>
                  </Col>
                </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
    );
  }
}

const mapState = ({ churches }) => ({
  churches: churches.pastorChurches,
});

export default connect(mapState, {
  sendRequest: createRequest
})(OtherBooksRequest);
