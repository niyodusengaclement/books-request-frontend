import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  InputGroup,
  Row,
  Container,
  FormGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../../module/actions/mainAction";
import {
  GET_DISTRICTS_AS_GUEST,
  GET_FIELDS_AS_GUEST,
  GET_CHURCHES_AS_GUEST,
} from "../../../module/actions";
import { checkTimetable } from "../../../utils/Others";
import RequestForm from "../../../components/RequestForm";

const GuestInfo = () => {
  const dispatch = useDispatch();
  const res = useSelector(({ guest }) => guest);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [selectedChurch, setSelectedChurch] = useState();
  const [nextPage, setNextPage] = useState(false);

  const church = res?.churches?.data?.length
    ? res?.churches?.data?.find(
        ({ church_id }) => +church_id === +selectedChurch
      )
    : {};
  const churchInfo = {
    churchId: selectedChurch,
    churchName: church?.church_name,
  };

  const payload = {
    name,
    email,
    selectedChurch,
    ...church,
    ...churchInfo,
  }

  useEffect(() => {
    dispatch(checkTimetable());
    dispatch(
      mainAction(
        "get",
        process.env.REACT_APP_BASE_URL,
        "/guest/fields",
        GET_FIELDS_AS_GUEST
      )
    );
  }, [dispatch]);

  const findDistrictsHandler = (field) => {
    dispatch(
      mainAction(
        "get",
        process.env.REACT_APP_BASE_URL,
        `/guest/districts?field=${field}`,
        GET_DISTRICTS_AS_GUEST
      )
    );
  };

  const findChurchesHandler = (pastorCode) => {
    dispatch(
      mainAction(
        "get",
        process.env.REACT_APP_BASE_URL,
        `/guest/churches?pastorCode=${pastorCode}`,
        GET_CHURCHES_AS_GUEST
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div>
      <Container>
        {nextPage ? (
          <RequestForm payload={payload} church={churchInfo} />
        ) : (
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <h1>Church Member</h1>
                    <p className="text-muted">Personal Information</p>
                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e?.target?.value)}
                        placeholder="Name"
                        autoComplete="name"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <Input
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e?.target?.value)}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <Input
                        type="text"
                        name="phone"
                        onChange={(e) => setPhone(e?.target?.value)}
                        placeholder="Phone Number"
                        autoComplete="phone"
                      />
                    </InputGroup>

                    <FormGroup className="mb-3">
                      <Input
                        type="select"
                        name="field"
                        placeholder="select field"
                        onChange={(e) => findDistrictsHandler(e?.target?.value)}
                      >
                        <option value="">Select Field</option>
                        {res?.fields?.data?.length
                          ? res?.fields?.data?.map(({ field }, i) => (
                              <option key={i}>{field}</option>
                            ))
                          : null}
                      </Input>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Input
                        type="select"
                        name="district"
                        placeholder="select district"
                        onChange={(e) => findChurchesHandler(e?.target?.value)}
                      >
                        <option value="">Select District</option>
                        {res?.districts?.data?.length
                          ? res?.districts?.data?.map(
                              ({ district, pastor_code }, i) => (
                                <option value={pastor_code} key={i}>
                                  {district}
                                </option>
                              )
                            )
                          : null}
                      </Input>
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Input
                        type="select"
                        name="church"
                        placeholder="select church"
                        onChange={(e) => setSelectedChurch(e?.target?.value)}
                      >
                        <option value="">Select Church</option>
                        {res?.churches?.data?.length
                          ? res?.churches?.data?.map((church, i) => (
                              <option value={church?.church_id} key={i}>
                                {church?.church_name}
                              </option>
                            ))
                          : null}
                      </Input>
                    </FormGroup>

                    <Row>
                      <Col xs="6">
                        <Button
                          disabled={!selectedChurch || !phone}
                          color="primary"
                          className="px-4"
                          onClick={() => setNextPage(true)}
                        >
                          Continue
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          <Link to="/login" color="link" className="px-0">
                            Login
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};
export default GuestInfo;
