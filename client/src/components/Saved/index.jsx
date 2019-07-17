import React, { Component } from 'react';
import API from '../../utils/API';

class Saved extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    this.getSaved();
  }

  getSaved = () => {
    API.getSavedBooks()
      .then(res => this.setState({ savedBooks: res.data }))
      .catch(err => console.log(err));
  };

 
  delete = bookId => {
    API.deleteBook(bookId)
      .then(this.getSaved)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        
             <div className="container-fluid resultsWrap">
          <div className="row justify-content-center">
            {/* render book section */}
            <div className="col-12">
              {/* If books saved shows them if not jus the title No books */}
              {!this.state.savedBooks.length ? (
                <h2 className="SavedTitle">No Saved Books To Display</h2>
              ) : (
                <React.Fragment>
                  <h2 className="SavedTitle">Previously Saved Books</h2>
                  <div className="row">
                    {this.state.savedBooks.map(book => {
                      return (
                        <div className="col-lg-3  col-md-4 col-sm-6 allCard" key={book._id}>
                          <div className="card">
                            <img src={book.image} alt={book.title} className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">{book.title}</h5>
                              <p className="card-text">Release Info: {book.date}</p>
                              {book.authors.length ? (<p className="card-text">By: {book.authors.join(', ')}</p>) : "No Authors Available"}
                              <p className="card-text block-with-text">
                                <strong>Description</strong>: {book.description}{' '}
                              </p>
                              <div className="row justify-content-center cardButton">

                              <a
                                href={book.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="cardButton btn btn-outline-success btn-small">
                                + Details
                              </a>
                              <button onClick={() => this.delete(book._id)} className="cardButton btn btn-outline-danger btn-small">
                                Delete Book
                              </button>
                              </div>
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

export default Saved;
