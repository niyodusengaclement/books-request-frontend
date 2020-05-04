import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { userInfo } from '../../../utils/Account';
import ErrorPage from '../ErrorPage';
import { addSinglePastor, findPastors, uploadFile, addSingleChurch } from '../../../utils/Others';

class AddPastorChurch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastor_names: '',
      church_name: '',
      listOrSinglePastor: 'single',
      oneOrMultipleChurches: 'one',
      pastorsList: null,
      churchesList: null,
      field: '',
      zone: '',
      district: '',
      church: '',
      pastor: '',

      errors: {
        pastor_names_err: '',
      }
    };
    this.saveChurch = this.saveChurch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.registerError = this.registerError.bind(this);
    this.savePastor = this.savePastor.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.sendPastorsFileHandler = this.sendPastorsFileHandler.bind(this);
    this.sendChurchesFileHandler = this.sendChurchesFileHandler.bind(this);
  }

  componentDidMount() {
    this.props.getPastors()
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
      errors: {
        pastor_names_err: '',
      }
    });
  }

  handleFileChange(evt) {
    const { name } = evt.target;
    this.setState({
      [name]: evt.target.files[0],
    });
  }

  sendPastorsFileHandler(evt) {
    evt.preventDefault();
    const data = new FormData();
    data.append('list', this.state.pastorsList);
    this.props.sendFile(data, '/upload-pastors');
    document.getElementById('pastorsList').value = '';
    this.setState(prevState => ({
      ...prevState,
      pastorsList: null,
    }));
  }

  sendChurchesFileHandler(evt) {
    evt.preventDefault();
    const data = new FormData();
    data.append('churches', this.state.churchesList);
    this.props.sendFile(data, '/upload-churches');
    document.getElementById('churchesList').value = '';
    this.setState(prevState => ({
      ...prevState,
      churchesList: null,
    }));
  }

  saveChurch(evt) {
    evt.preventDefault();
    const { field, zone, church, district, pastor } = this.state;
    const data = {
      field,
      zone,
      district,
      church,
      pastor,
    };

    this.props.addChurch(data);
    this.setState(prevState => ({
      ...prevState,
      field: '',
      zone: '',
      district: '',
      church: '',
      pastor: '',
    }));
  }
  
  savePastor(e) {
    e.preventDefault();
    const { pastor_names, listOrSinglePastor } = this.state;
    if(listOrSinglePastor === "single" && pastor_names === "") {
      return this.registerError('pastor_names_err', 'Enter the Pastor Names Please')
    }
    if(listOrSinglePastor === "single" && pastor_names !== "") {
      this.props.addPastor(this.state);
      return this.setState({
        pastor_names: ''
      });
    }
  }

  registerError(prop, err) {
    return this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [prop]: err,
      }
    }));
  }
  render() {
    const { pastors } = this.props;
    const { field, zone, district, church, pastor } = this.state;
    const { role } = userInfo();
    const error = {
      status: 403,
      message: 'Access denied, This page accessed by Admin or Union only'
    }
    if (role !== 'admin' && role !== 'union') return <ErrorPage error={error} />

    const {  pastor_names, listOrSinglePastor, oneOrMultipleChurches } = this.state;
    const { pastor_names_err } = this.state.errors;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Add Pastor</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={listOrSinglePastor === 'list' ? this.sendPastorsFileHandler : this.savePastor}>

                <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio1" name="listOrSinglePastor" onChange={this.handleChange} value="single" />
                        <Label className="form-check-label" check htmlFor="inline-radio1">One Pastor</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio2" name="listOrSinglePastor" onChange={this.handleChange} value="list" />
                        <Label className="form-check-label" check htmlFor="inline-radio2">List of Many Pastors</Label>
                </FormGroup>

                {
                  listOrSinglePastor === 'list' ?

                  <FormGroup>
                    <Input type="file"
                      id="pastorsList"
                      name="pastorsList"
                      onChange={this.handleFileChange}
                    />
                  </FormGroup>
                  :
                  <FormGroup>
                    <Input type="text"
                      invalid={pastor_names_err !== '' ? true : false}
                      name="pastor_names"
                      value={pastor_names}
                      onChange={this.handleChange}
                      placeholder= "Enter the Pastor Names please"
                    />
                    <FormFeedback>{pastor_names_err}</FormFeedback>
                  </FormGroup>
                }
                  
                  <div className="form-actions">
                    <Button type="submit" color="primary">Save</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Add Church</strong>
              </CardHeader>
              <CardBody>
              <Form onSubmit={oneOrMultipleChurches === 'multiple' ? this.sendChurchesFileHandler : this.saveChurch}>
                  
                <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio11" name="oneOrMultipleChurches" onChange={this.handleChange} value="one" />
                        <Label className="form-check-label" check htmlFor="inline-radio11">One Church</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio22" name="oneOrMultipleChurches" onChange={this.handleChange} value="multiple" />
                        <Label className="form-check-label" check htmlFor="inline-radio22">List of Many Churches</Label>
                </FormGroup>

                {
                  oneOrMultipleChurches === 'multiple' ?

                  <FormGroup>
                    <Input type="file"
                      id="churchesList"
                      name="churchesList"
                      onChange={this.handleFileChange}
                    />
                  </FormGroup>
                  :
                  <>
                  <FormGroup>
                    <Label>Field</Label>
                    <Input type="select" name="field" value={field} onChange={this.handleChange} >
                      <option value="">Please select</option>
                      <option value="NRF">North Rwanda Field</option>
                      <option value="NWRF">North West Rwanda Field</option>
                      <option value="NERF">North East Rwanda Field</option>
                      <option value="ECRF">East Central Rwanda Field</option>
                      <option value="CRF">Central Rwanda Field</option>
                      <option value="SRF">South Rwanda Field</option>
                      <option value="SERF">South East Rwanda Field</option>
                      <option value="WRF">West Rwanda Field</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label>Zone</Label>
                    <Input type="text" value={zone} name="zone" onChange={this.handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <Label>District</Label>
                    <Input type="text" value={district} name="district" onChange={this.handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Church</Label>
                    <Input type="text" value={church} name="church" onChange={this.handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Pastor</Label>
                    <Input type="select" value={pastor} name="pastor" onChange={this.handleChange} >
                      <option value="">Please select</option>
                      {
                        pastors.length > 0 ? pastors.map(({ pastor_name, login_code}) =>
                        <option key={login_code} value={login_code}>{pastor_name}</option>
                        )
                        :
                        null
                      }
                    </Input>
                  </FormGroup>
                  </>
                }
                      <div className="form-actions">
                        <Button type="submit" color="primary">Save</Button>
                      </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        
        </Row>
      </div>
    );
  }
}

const mapState = ({ pastors }) => ({
  isLoading: pastors.isLoading,
  isLoaded: pastors.isLoaded,
  pastors: pastors.values,
  error: pastors.error,
});
export default connect(mapState, {
  addPastor: addSinglePastor,
  addChurch: addSingleChurch,
  getPastors: findPastors,
  sendFile: uploadFile
})(AddPastorChurch);
