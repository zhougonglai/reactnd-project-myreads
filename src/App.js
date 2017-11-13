import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchPage from './pages/SearchPage';
import BookList from './pages/BookList';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shoppingCard: [],
    books:[],
    showSearchPage: false
  }
  componentDidMount(){
    this.getAll();
  }

  getAll(){
    BooksAPI.getAll().then(books => {
      this.setState({books});
    })
  }
  
  // Teacher advice.
  handleBookShelfChange = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(preState => ({
          books: preState.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  render() {
    const {books} = this.state;
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <BookList books={books} onUpdate={this.handleBookShelfChange}/>
        )}/>
        <Route path="/search" exact render={() => (
          <SearchPage books={books} onUpdate={this.handleBookShelfChange}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
