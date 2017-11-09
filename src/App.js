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
     * 新增 购物车 -> popup -> 做结算页... 想到一连串的后续逻辑.还是算了.过好双十一就好
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

  update(book, shelf){
    BooksAPI.update(book, shelf).then(res => {
      this.getAll();
    })
  }

  search(query, maxResults){
    BooksAPI.search(query, maxResults).then(book => {
      
    })
  }

  render() {
    const {books} = this.state;
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <BookList books={books} onUpdate={(book,shelf) => this.update(book, shelf)}/>
        )}/>
        <Route path="/search" exact render={() => (
          <SearchPage search={BooksAPI.search} onUpdate={(book,shelf) => this.update(book, shelf)}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
