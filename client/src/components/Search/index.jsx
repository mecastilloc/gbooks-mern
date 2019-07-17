import React, {Component} from 'react';
import API from '../../utils/API';
import './index.css';

class Search extends Component {
  state = {
    query: "",
    booksList: []
  };

  search = bookQuery => {
    API.searchForBooks(bookQuery)
      .then(res => {
        console.log(res.data);
        // take res.data.items array and create new array with less information
        const booksList = res.data.items.map(book => {
          return {
            bookId: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            date: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description ? book.volumeInfo.description : "Description Not Available",
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150x200/f2a885/FFFFFF?text=No+Image+Aviable",
            link: book.volumeInfo.infoLink
          };
        });
        // set state to have new book list
        this.setState({ booksList });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      return false;
    }

    this.search(this.state.query);
  };

  saveBook = bookId => {
    // find book in this.state.booksList based on the bookId value
    const bookSelected = this.state.booksList.find(book => book.bookId === bookId);
    console.log(bookSelected);
    API.saveBook(bookSelected)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  

  render() {
    return (
      <React.Fragment>
        {/* make jumbotron */}
        <div className="searchwrap">
        <div className="row">
            {/* form section */}
            <div className="col-12 col-sm-6 col-md-3">
              <h3>Search For A Book</h3>
              <form onSubmit={this.handleFormSubmit}>
                <input
                  name="query"
                  onChange={this.handleInputChange}
                  placeholder="Enter book name here"
                  value={this.state.query}
                  type="input"
                  className="form-control mb-3"
                />
                <button className="btn btn-block btn-outline-success" onClick={this.handleFormSubmit}>
                  Search for book.
                </button>
              </form>
            </div>
            {/* end form section */}
        </div>
        </div>

        {/* create row with two columns */}
        <br/>
        <div className="container-fluid">
        <div className="row">
            {/* begin book result section */}
            <div className="col-12">
              {!this.state.booksList.length ? (
                <h2 className="resultsTitle">No Results Yet</h2>
              ) : (
                <React.Fragment>
                  <h2>Search Results for: {this.state.query}</h2>
                  <div className="row">
                    {this.state.booksList.map(book => {
                      return (
                        <div className="col-12 col-md-4" key={book.bookId}>
                          <div className="card">
                            <img src={book.image} alt={book.title} className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">{book.title}</h5>
                              <p className="card-text">Released: {book.date}</p>
                              {book.authors ? (<p className="card-text">By: {book.authors.join(', ')}</p>) : ''}
                              <p className="card-text">
                                <strong>Description</strong>: {book.description}{' '}
                              </p>
                              <button onClick={() => this.saveBook(book.bookId)} className="btn btn btn-outline-success btn-small">
                                Save Book.
                              </button>
                              <a
                                href={book.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="btn btn-outline-warning btn-small">
                                More Details
                                </a>
                                
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;