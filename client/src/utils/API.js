import axios from 'axios';

export default {

  searchForBooks(bookQuery) {
    return axios.get('https://www.googleapis.com/books/v1/volumes', { params: {
      q: bookQuery    
    }
  })
  },
  saveBook(bookData) {
    return axios.post('/api/books', bookData);
  },
  getSavedBooks() {
    return axios.get('/api/books');
  },
    
  deleteBook(bookId) {
    return axios.delete(`/api/books/${bookId}`);
  },
  
  
};
