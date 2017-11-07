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
    books:[],
    showSearchPage: false
  }
  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState({books});
    })
  }


  render() {
    const {books} = this.state;
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <BookList books={books}/>
        )}/>
        <Route path="/search" exact render={() => (
          <SearchPage />
        )} />
      </div>
    )
  }
}

export default BooksApp
