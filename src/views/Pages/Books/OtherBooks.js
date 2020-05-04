import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { findBooks } from '../../../utils/Others';
import ErrorPage from '../ErrorPage';
import OtherBooksRequest from '../../../components/RequestForm/OtherBooksRequest';
import { userInfo } from '../../../utils/Account';
import './style.css';

class OtherBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      book: null
    }
  }
  componentDidMount() {
      this.props.getBooks('others');
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  hasError = () => <ErrorPage error={this.props.error} />

  autoCapFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  showAndHideModel(book) {
    this.setState({
      book,
    });
    const isFormShown = this.state.show;
    this.setState({show: !isFormShown});
  }

  render() {
    const { books } = this.props;
    let theModelSwitch = null;
    const { role } = userInfo();

    if(this.state.show) {
      theModelSwitch = (
        <OtherBooksRequest
          isOpen={this.showAndHideModel.bind(this)}
          book={this.state.book}
        />
      )
    }

    if (this.props.isLoading) return this.loading();
    if (this.props.isLoading === false && this.props.isLoaded === false) return this.hasError();
    
    return (
      <div className="animated fadeIn container">
        <Row>
      <div id="update-form">
        {theModelSwitch}
      </div>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Other Books 
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Book Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Language</th>
                      <th scope="col">Price</th>
                      {
                        role !== 'pastor' ? null : <th scope="col">Request</th>
                      } 
                      
                    </tr>
                  </thead>
                  <tbody>
                    {
                      books.length > 0 ? books.map((book, i) =>
                        <tr key={i}>
                          <td>{this.autoCapFirstLetter(book.bookname)}</td>
                          <td>{book.description}</td>
                          <td>{this.autoCapFirstLetter(book.language)}</td>
                          <td>{book.price}</td>
                          {
                            role !== 'pastor' ? null :
                            <td><Button color="link" onClick={this.showAndHideModel.bind(this, book)}>Create Request</Button></td>
                          }
                        </tr>
                      ) 
                      : <tr><td colSpan='4'>No records found</td></tr>
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapState = ({ books }) => ({
  isLoading: books.isLoading,
  isLoaded: books.isLoaded,
  books: books.otherBooks,
  error: books.error,
});

export default connect(mapState,{
  getBooks: findBooks,
})(OtherBooks);
