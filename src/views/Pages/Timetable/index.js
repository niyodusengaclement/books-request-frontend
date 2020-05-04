import React, { Component } from 'react';
import {
  Col,
  FormGroup,
  Input,
  Label,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Row,
  Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import '../../../components/RequestForm/RequestForm.css';
import { createTimetable } from '../../../utils/Others';
import { DateCalculator } from '../../../services/requestInfo';
import { toast } from 'react-toastify';

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      term: '',
      startDate: '',
      endDate: '',
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
     });
  }

  handleSubmit(e, isUpdate) {
    e.preventDefault();
    const { startDate, endDate } = this.state;
    const diff1 = DateCalculator(new Date(), startDate);
    const diff2 = DateCalculator(startDate, endDate);
    if(diff1 < 0) {
      return toast.error('Starting Date should not be in past');
    }
    if(diff2 < 0) {
      return toast.error('Due Date should not be before Starting Date');
    }
    this.props.sendTimetable(this.state, isUpdate);
    return this.setState({
      startDate: '',
      endDate: '',
    })
  }

  render() {
    const date = new Date();
    const current_year = date.getFullYear();
    const { startDate, endDate } = this.state;

    return (
      <Row>
      <Col xs="12" sm="6">
      <Card>
          <CardHeader>
            <strong>Create Time Table </strong>  
          </CardHeader>
          <CardBody>

          <Form>
          <FormGroup row >
                <Col xs="3" md="3">
                  <Label > Year </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="year" onChange={(evt) => this.handleChange(evt)}>
                        <option value="0" selected disabled>Please select</option>
                        <option value={current_year}>{current_year}</option>
                        <option value={current_year + 1}>{current_year + 1}</option>
                  </Input>
                </Col>
                
          </FormGroup>

          <FormGroup row >
                <Col xs="3" md="3">
                  <Label > Quarter </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="term" onChange={(evt) => this.handleChange(evt)}>
                        <option value="0" selected disabled>Please select</option>
                        <option value="1"> First Quarter</option>
                        <option value="2"> Second Quarter</option>
                        <option value="3"> Third Quarter</option>
                        <option value="4"> Fourth Quarter</option>
                  </Input>
                </Col>
                
          </FormGroup>
          <FormGroup row >
                <Col xs="3" md="3">
                  <Label > Start Date </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="date" name="startDate" value={startDate} placeholder="start date" onChange={(evt) => this.handleChange(evt)} />
                </Col>
                
          </FormGroup>
          <FormGroup row >
                <Col xs="3" md="3">
                  <Label > End Date </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="date" value={endDate} name="endDate" placeholder="End date" onChange={(evt) => this.handleChange(evt)} />
                </Col>
                
          </FormGroup>
          </Form>
            
        </CardBody>
        
        <CardFooter className="text-right">
        <Row>
          <Col xs="4" md="5">
            <Button color="primary"
            onClick={(e) => this.handleSubmit(e, false)}
            >
              Create a Timetable
            </Button>
          </Col>
          <Col xs="4" md="2"></Col>
          <Col xs="4" md="5" className="text-right">
            <Button color="success" onClick={(e) => this.handleSubmit(e, true)} >Update existing Timetable </Button>
          </Col>
        </Row>
        </CardFooter>
      </Card>
    </Col>
    </Row>      
    );
  }
}
const mapState = ({ timetable }) => ({
  timetable: timetable.timetable,
  isLoading: timetable.isLoading,
  isLoaded: timetable.isLoaded,
  error: timetable.error,
});

export default connect(mapState, {
  sendTimetable: createTimetable
})(Timetable);
