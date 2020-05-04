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
import { addBook, findLanguages } from '../../../utils/Others';
import { userInfo } from '../../../utils/Account';
import ErrorPage from '../ErrorPage';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookcategory: '',
      bookname: '',
      booktype: '',
      bookreader: '',
      description: '',
      price: '',
      language: '',
      errors: {
        bookcategory_err: '',
        bookname_err: '',
        booktype_err: '',
        bookreader_err: '',
        description_err: '',
        price_err: '',
        language_err: '',
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.registerError = this.registerError.bind(this);
  }

  componentDidMount() {
    this.props.getLanguages();
  }
  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
      errors: {
        bookcategory_err: '',
        bookname_err: '',
        booktype_err: '',
        bookreader_err: '',
        description_err: '',
        price_err: '',
        language_err: '',
      }
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { bookcategory, bookname, bookreader, booktype, language, price } = this.state;
    if(bookcategory === "" && bookreader === "" && booktype === "" && language ==="" && price === "") {
      return this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          bookcategory_err: "Select book category please",
          booktype_err: 'Specify the book type please',
          bookreader_err: 'Select the reader category please ',
          price_err: 'Mention the price please',
          language_err: 'Select the language please',
        }
      }));
    }
    if(bookcategory === "other" && bookname === "" && language ==="" && price === "") {
      return this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          bookname_err: 'Enter the Book name please ',
          price_err: 'Mention the price please',
          language_err: 'Select the language please',
        }
      }));
    }
    if(bookcategory === "" ) {
      return this.registerError('bookcategory_err', 'Select the Book category please');
    }
    if(bookcategory === "other" && bookname === "" ) {
      return this.registerError('bookname_err', 'Enter the Book name please');
    }
    if((bookcategory === "bible_study" || bookcategory === "mission_report") && bookreader === "" ) {
      return this.registerError('bookreader_err', 'Select the Book reader category please');
    }
    if((bookcategory === "bible_study" || bookcategory === "mission_report") && booktype === "" ) {
      return this.registerError('booktype_err', 'Enter the Book type please');
    }
    if(language === "" ) {
      return this.registerError('language_err', 'Select the Book language please');
    }
    if(price === "" ) {
      return this.registerError('price_err', 'Mention the Book price please');
    }
    this.props.createBook(this.state);
    this.setState({
      bookcategory: '',
      bookname: '',
      booktype: '',
      bookreader: '',
      description: '',
      price: '',
      language: '',
    });
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
    const { languages } = this.props;
    const { role } = userInfo();
    const error = {
      status: 403,
      message: 'Access denied, This page accessed by Admin or Union only'
    }
    if (role !== 'admin' && role !== 'union') return <ErrorPage error={error} />

    const { bookcategory, bookname, bookreader, booktype, description, language, price } = this.state;
    const { bookcategory_err, bookname_err, bookreader_err, booktype_err, description_err, language_err, price_err } = this.state.errors;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Add book</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label>Book Category</Label>
                    <Input type="select" name="bookcategory" invalid={bookcategory_err !== '' ? true : false} value={bookcategory} onChange={this.handleChange} >
                      <option value="">Please select</option>
                      <option value="bible_study">Bible Study</option>
                      <option value="mission_report">Mission Report</option>
                      <option value="other">Other</option>
                    </Input>
                    <FormFeedback>{bookcategory_err}</FormFeedback>
                  </FormGroup>
                  {
                    this.state.bookcategory === 'other' ?
                    <>
                    <FormGroup>
                      <Label>Book Name</Label>
                      <Input type="text" name="bookname" invalid={bookname_err !== '' ? true : false} value={bookname} onChange={this.handleChange} />
                    <FormFeedback>{bookname_err}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label>Description</Label>
                      <Input type="textarea" invalid={description_err !== '' ? true : false} name="description" rows="2"
                              placeholder="Description..."  onChange={this.handleChange} value={description} />
                              <FormFeedback>{description_err}</FormFeedback>
                    </FormGroup>
                    </>
                    :
                    <>
                    <FormGroup>
                      <Label>Reader Category</Label>
                      <Input type="select" invalid={bookreader_err !== '' ? true : false} name="bookreader" value={bookreader} onChange={this.handleChange} >
                        <option value="">Please select</option>
                        <option value="adult">Adult</option>
                        <option value="young">Young</option>
                      </Input>
                    <FormFeedback>{bookreader_err}</FormFeedback>
                    </FormGroup>
                      <FormGroup>
                        <Label>Book Type</Label>
                        <Input type="text" invalid={booktype_err !== '' ? true : false} name="booktype" value={booktype} onChange={this.handleChange} />
                        <FormFeedback>{booktype_err}</FormFeedback>
                    </FormGroup>
                    </>

                  }

                  <FormGroup>
                  <Label>Language</Label>
                  <Input type="select" invalid={language_err !== '' ? true : false} name="language" value={language} onChange={this.handleChange} >
                    <option value="">Please select</option>
                  {
                    languages.length > 0 ? languages.map(( lang ) => 
                        <option key={lang.languageid} value={lang.languageid}>{lang.language.toUpperCase()}</option>
                    )
                    : null
                  }
                  </Input>
                  <FormFeedback>{language_err}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label>Price</Label>
                    <Input type="number" invalid={price_err !== '' ? true : false} name="price" value={price} onChange={this.handleChange} />
                    <FormFeedback>{price_err}</FormFeedback>
                  </FormGroup>
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

const mapState = ({ books, language }) => ({
  isLoading: books.isLoading,
  isLoaded: books.isLoaded,
  newBook: books.newBook,
  error: books.error,
  languages: language.lang,
});
export default connect(mapState, {
  createBook: addBook,
  getLanguages: findLanguages,
})(AddBook);
