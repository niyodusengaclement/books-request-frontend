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
} from 'reactstrap';
import ReactCountryFlag from "react-country-flag";
import { connect } from 'react-redux';
import { createRequest } from '../../utils/Others';
import './RequestForm.css';
import { toast } from 'react-toastify';

class MissionReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: {
        request: [],
      },
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props && this.props.church !== undefined) {
      this.setState({
        church: this.props.church.churchId,
      });
    }

  }

  handleChange(i, event) {
    const { name, value } = event.target;
    
    let request = [...this.state.command.request];
    request[i] = {
      bookid: name,
      number: value,
      }

    const newReq = request.length > 0 ? request.filter((req) => req !== undefined) : [];
    this.setState({ 
      command: {
        request: newReq,
      }
     });
  }
  handleSubmit(e, req) {
    const data = JSON.parse(localStorage.getItem('request_period'));
    const { request } = this.state.command;
    const newReq = [
      ...request,
      ...req
    ];

    e.preventDefault();
    if(this.state.command.request.length < 1) {
      return toast.error('You can\'t send an empty request')
    }
    
    const body = {
      category: 'mission_report',
      term: data.term,
      year: data.year,
      church: this.state.church,
      command: {
        request: newReq
      }
    }
    this.props.sendCommand(body);
    this.setState({
      command: {
        request: []
      }
    });
    return req.length > 0 ? req.map(({ bookid }) => document.getElementById(bookid).value = '') : null;
  }

  render() {
    const { churchName } = this.props.church;
    const { books } = this.props;
    const finder = books.length > 0 ? books.filter(book => book.bookname === 'mission_report') : [];
    const req = finder.length > 0 ?
      finder.map(({ bookid }) => {
        return { bookid: bookid, number: 0}
      })
      : [];

    return (
      <>
      <Col xs="12" sm="4">
      <Card>
          <CardHeader>
            <strong>Mission Report </strong>  - <strong>{churchName} </strong> 
          </CardHeader>
          <CardBody>
        {
          finder.length > 0 ? finder.map(({ bookid, languagecode, bookreader }, i) =>
            <React.Fragment key={i}>
              <FormGroup row className="text-right" >
                <Col xs="3" md="3">
                  <Label > {bookreader[0].toUpperCase() + bookreader.slice(1)} </Label>
                </Col>
                <Col xs="6" md="6">
                  <Input
                  type="number"
                  className="input-f"
                  id={bookid}
                  name={bookid}
                  min="0"
                  placeholder="Enter a number"
                  onChange={this.handleChange.bind(this, i)}
                  onKeyDown= {(e) => {
                    if(e.key === 'Enter') {
                      this.handleSubmit(e, req);
                    }
                  }}
                  />
                </Col>
                <Col className="flag-container" xs="3" md="3">
                  <ReactCountryFlag
                    countryCode={languagecode}
                    svg
                    style={{
                        width: '2em',
                        height: '2em',
                    }}
                    title={languagecode}
                  />
                   - {languagecode}
                </Col>
                
              </FormGroup>
            </React.Fragment>
            
          ): ''
        }
        </CardBody>
        
        <CardFooter className="text-right">
          <Button type="submit" onClick={(e) => this.handleSubmit(e, req)} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i>
          Submit
           </Button>
        </CardFooter>
      </Card>
    </Col>
      </>      
    );
  }
}
const mapState = ({ requests }) => ({
  isLoading: requests.isLoading,
  isLoaded: requests.isLoaded,
  error: requests.error,
});

export default connect(mapState, {
  sendCommand: createRequest,
})(MissionReport);
