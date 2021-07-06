import React, { Component } from "react";
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
} from "reactstrap";
import ReactCountryFlag from "react-country-flag";
import { connect } from "react-redux";
import { createRequest } from "../../utils/Others";
import "./RequestForm.css";
import { toast } from "react-toastify";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

class AdultForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPage: false,
      command: {
        request: [],
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props && this.props.church !== undefined) {
      this.setState({
        church: this.props.church.churchId,
      });
    }
  }

  handleChange(i, event) {
    const { name, value } = event.target;
    const bookPrice = event?.target?.getAttribute('data-price') || 0;

    let request = [...this.state.command.request];
    request[i] = {
      bookid: name,
      number: value,
      price: bookPrice * value,
    };

    const newReq =
      request.length > 0 ? request.filter((req) => req !== undefined) : [];
    this.setState({
      command: {
        request: newReq,
      },
    });
  }
  handleSubmit(req) {
    const data = JSON.parse(localStorage.getItem("request_period"));
    const { request } = this.state.command;
    const newReq = [...request, ...req];

    if (this.state.command.request.length < 1) {
      return toast.error("You can't send an empty request");
    }

    const body = {
      category: "mission_report",
      term: data.term,
      id_code: this?.props?.payload?.pastor_code,
      year: data.year,
      church: this.state.church,
      command: {
        request: newReq,
      },
    };

    this.setState({
      nextPage: true,
    });

    this.props.sendCommand(body);

    this.setState({
      command: {
        request: [],
      },
    });
    return req.length > 0
      ? req.map(({ bookid }) => (document.getElementById(bookid).value = ""))
      : null;
  }

  render() {
    const { churchName } = this.props.church;
    const { books, payload } = this.props;
    const requests = this.state?.command?.request;
    const totalPrice = requests?.length > 1 ? requests?.reduce((a, b) => +a + +b.price, 0) : requests?.length === 1 ? requests[0]?.price : 0;

    const finder =
      books.length > 0
        ? books.filter((book) => book.bookname === "bible_study" && book.bookreader === "adult")
        : [];
    const req =
      finder.length > 0
        ? finder.map(({ bookid }) => {
            return { bookid: bookid, number: 0, price: 0 };
          })
        : [];

    const config = {
      public_key: process.env.REACT_APP_FLUTTERWAVE_KEY,
      tx_ref: Date.now(),
      amount: totalPrice || 0,
      currency: "RWF",
      payment_options: "card,mobilemoney,account,bank transfer,ussd",
      customer: {
        email: payload?.email || 'muhedarius96@gmail.com',
        phonenumber: payload?.phone,
        name: payload?.name,
      },
      customizations: {
        title: "SDA - Books Management System",
        description: "Thanks for requesting book(s)",
        logo: null,
      },
    };

    const fwConfig = {
      ...config,
      text: "Pay",
      callback: (response) => {
        this.handleSubmit(req)
        closePaymentModal();
      },
      onClose: () => {},
    };

    return (
      <>
        <Col xs="12" sm="4">
          <Card>
            <CardHeader>
              <strong>Adult </strong> Bible study -{" "}
              <strong>{churchName} </strong>
            </CardHeader>
            <CardBody>
              {finder.length > 0
                ? finder.map(({ bookid, booktype, languagecode, price }, i) => (
                    <React.Fragment key={i}>
                      <FormGroup row className="text-right">
                        <Col xs="3" md="3">
                          <Label>
                            {" "}
                            {booktype[0].toUpperCase() + booktype.slice(1)}{" "}
                          </Label>
                        </Col>
                        <Col xs="6" md="6">
                          <Input
                            type="number"
                            id={bookid}
                            className="input-f"
                            name={bookid}
                            data-price={price}
                            required
                            min="0"
                            placeholder="Enter a number"
                            onChange={this.handleChange.bind(this, i)}
                          />
                        </Col>
                        <Col className="flag-container" xs="3" md="3">
                          <ReactCountryFlag
                            countryCode={languagecode}
                            svg
                            style={{
                              width: "2em",
                              height: "2em",
                            }}
                            title={languagecode}
                          />
                          - {languagecode}
                        </Col>
                      </FormGroup>
                    </React.Fragment>
                  ))
                : ""}
            </CardBody>

            <CardFooter className="text-right">
              <FlutterWaveButton {...fwConfig} />
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
})(AdultForm);
