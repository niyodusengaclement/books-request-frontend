import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Input, Row, Form, FormGroup, Label, CardHeader, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import './RequestForm.css';
import { toast } from 'react-toastify';
import { updateRequest } from '../../utils/Others';

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      request: {},
    }
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeUpdateForm = this.closeUpdateForm.bind(this);
  }

  closeUpdateForm() {
    this.props.isOpen()
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      error: null,
      request: {
        bookid: name,
        number: value
      }
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { number } = this.state.request;
    const bkId = this.state.request.bookid;

    if(!number || !bkId) {
      toast.error('You can\'t send an empty request');
      return this.setState({
        error: "You can't send an empty request"
      });
    }
    const { request } = this.props.command.command;
    const req = request.filter(({ bookid }) => bookid !== bkId );
    const updatedRequest = {
      command: {
        request: [
          {...this.state.request},
          ...req,
        ]
      }
    }
    this.props.callUpdatedRequest(this.props.command.id, updatedRequest);
    this.props.onUpdate();
    this.props.isOpen();
  }

  render() {
    const { request, command } = this.props;
    return (
      <div className="update-form-container">
      <Row>
        <Col md="6" lg="7" xl="6" className="push-left">
          <Card className="mx-4">
            <CardHeader>
              Update a Request 
              <span onClick={this.closeUpdateForm} className="closer">x</span>
            </CardHeader>
            <CardBody  className="form-content">
              <Form onSubmit={this.submitForm} >
                
              <FormGroup row className="text-right" >
                <Col xs="4" md="2">
                  <Label > Church </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="text"
                    className="input-f"
                    name='church'
                    disabled
                    value={request.name}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
                <Col xs="4" md="2">
                  <Label > Book </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="text"
                    className="input-f"
                    name='book'
                    disabled
                    value={request.bookname === 'bible_study' ? 'Bible Study' : 'Mission Report'}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
              <Col xs="4" md="2">
                  <Label > Language </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="text"
                    className="input-f"
                    name='language'
                    disabled
                    value={request.language}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
              <Col xs="4" md="2">
                  <Label > Reader Category  </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="text"
                    className="input-f"
                    name='bookreader'
                    disabled
                    value={request.bookreader}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
                <Col xs="4" md="2">
                  <Label > Book type </Label>
                </Col>
                <Col xs="8" md="10">
                  <Input
                    type="text"
                    className="input-f"
                    name='booktype'
                    disabled
                    value={request.booktype}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="text-right" >
                <Col xs="4" md="2">
                  <Label> Requests </Label>
                </Col>
                <Col xs="4" md="5">
                  <Input
                    type="text"
                    className="input-f"
                    disabled
                    name='number'
                    invalid
                    value={request.nbr}
                  />
                </Col>
                <Col xs="4" md="5">
                  <Input
                    type="number"
                    className="input-f"
                    name={request.bookid}
                    min="0"
                    invalid={this.state.error === null ? false : true}
                    onChange={this.onChange}
                    placeholder="New requests"
                    onKeyDown= {(e) => {
                      if(e.key === 'Enter') {
                        this.submitForm(e);
                      }
                    }}
                  />
                  <FormFeedback>{this.state.error}</FormFeedback>
                </Col>
              </FormGroup>
            
              </Form>
                
                <Row>
                <Col xs="4" md="2"></Col>
                <Col xs="4" md="5">
                    <Button color="success"
                    disabled={command === null ? true : false}
                    onClick={this.submitForm}
                    >
                      Save
                    </Button>
                  </Col>  
                  <Col xs="4" md="5" className="text-right">
                    <Button onClick={this.closeUpdateForm} >Cancel </Button>
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

const mapState = ({ requests }) => ({
  command: requests.singleRequest,
  updated: requests.updated,
  error: requests.error,
  isLoading: requests.isLoading,
});

export default connect(mapState, {
  callUpdatedRequest: updateRequest,
})(UpdateForm);
