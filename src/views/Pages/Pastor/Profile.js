import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import './style.css';
import { userInfo } from '../../../utils/Account';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.autoCapFirstLetter = this.autoCapFirstLetter.bind(this);
  }

  autoCapFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  render() {
    const userProfile = userInfo();
    return (
      <div className="animated fadeIn">
        <Row>
          
        <Col xs="4" sm="3">

        </Col>
        <Col xs="12" sm="6">
            <Card>
              <CardBody>
          <Row>
          <Col xs="6" sm="6">
            
              <div className="profile-img">
                        <img src={'assets/img/avatars/big.PNG'} alt="profile" />
                        {/* <Input type="file" name="profilePhoto" value={this.state.profilePhoto}  />
                        <Button onClick={this.saveImage}>Save</Button> */}

              </div>
              
          </Col>
          <Col xs="6" sm="6">
              
          <Form>

            <FormGroup>
              <Label>Names</Label>
              <Input type="text" disabled name="names" value={userProfile.name} />
            </FormGroup>

            <FormGroup>
              <Label>Username</Label>
              <Input type="text" disabled name="names" value={userProfile.username} />
            </FormGroup>

            <FormGroup>
              <Label>Role</Label>
              <Input type="text" disabled name="names" value={this.autoCapFirstLetter(userProfile.role)} />
            </FormGroup>
            {
              userProfile.role === 'field' ?
              
            <FormGroup>
              <Label>Field</Label>
              <Input type="text" disabled name="names" value={userProfile.field.toUpperCase()} />
            </FormGroup>
            :
            null
          }

            </Form>

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

export default Profile;
